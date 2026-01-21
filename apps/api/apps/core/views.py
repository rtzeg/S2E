from random import randint

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AIResult, Job, JobPack, RoadmapStep, Submission, TakenJob, UserRoadmapProgress
from .serializers import (
    JobPackSerializer,
    JobSerializer,
    RoadmapStepDetailSerializer,
    RoadmapStepSerializer,
    SubmissionResultSerializer,
)


class RoadmapListView(APIView):
    def get(self, request):
        progress = UserRoadmapProgress.objects.filter(user=request.user)
        progress_map = {item.step_id: item.status for item in progress}
        steps = RoadmapStep.objects.all()
        serializer = RoadmapStepSerializer(steps, many=True, context={"progress_map": progress_map})
        return Response(serializer.data)


class RoadmapDetailView(APIView):
    def get(self, request, step_id: int):
        step = get_object_or_404(RoadmapStep, pk=step_id)
        serializer = RoadmapStepDetailSerializer(step)
        return Response(serializer.data)


class HomeworkSubmitView(APIView):
    def post(self, request):
        step_id = request.data.get("step_id")
        input_type = request.data.get("input_type")
        content = request.data.get("content")
        if not all([step_id, input_type, content]):
            return Response(
                {"detail": "step_id, input_type и content обязательны"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        step = get_object_or_404(RoadmapStep, pk=step_id)
        submission = Submission.objects.create(
            user=request.user, step=step, input_type=input_type, content=content
        )
        score, strengths, issues, suggestions, next_action = generate_ai_result(content)
        AIResult.objects.create(
            submission=submission,
            score=score,
            strengths=strengths,
            issues=issues,
            suggestions=suggestions,
            next_action=next_action,
        )
        UserRoadmapProgress.objects.update_or_create(
            user=request.user, step=step, defaults={"status": "done"}
        )
        return Response({"submission_id": submission.id}, status=status.HTTP_201_CREATED)


class HomeworkResultView(APIView):
    def get(self, request, submission_id: int):
        submission = get_object_or_404(Submission, pk=submission_id, user=request.user)
        serializer = SubmissionResultSerializer(submission)
        return Response(serializer.data)


class CoachAskView(APIView):
    def post(self, request):
        scenario = request.data.get("scenario")
        message = request.data.get("message", "")
        payload = coach_response(scenario, message)
        return Response(payload)


class JobsListView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)


class JobTakeView(APIView):
    def post(self, request, job_id: int):
        job = get_object_or_404(Job, pk=job_id)
        taken, _ = TakenJob.objects.get_or_create(user=request.user, job=job)
        return Response({"status": taken.status, "job_id": job.id})


class JobPackView(APIView):
    def get(self, request, job_id: int):
        job = get_object_or_404(Job, pk=job_id)
        pack = get_object_or_404(JobPack, job=job)
        serializer = JobPackSerializer(pack)
        return Response(serializer.data)


def generate_ai_result(content: str):
    length = len(content.strip())
    score = randint(60, 90)
    strengths = ["Есть структура ответа", "Указаны сроки"]
    issues = []
    suggestions = [
        "Добавь 2-3 уточняющих вопроса",
        "Сформулируй итоговый результат для клиента",
    ]

    if length < 120:
        score = randint(40, 65)
        issues.append("Ответ слишком короткий, не хватает деталей")
        suggestions.append("Уточни контекст задачи и объем работ")
    if "цена" not in content.lower() and "бюджет" not in content.lower():
        issues.append("Не зафиксирован бюджет")
        suggestions.append("Предложи вилку бюджета или спроси ожидания")
    if "срок" not in content.lower():
        issues.append("Не указаны сроки")
        suggestions.append("Добавь сроки и этапы сдачи")

    next_action = "Сформируй финальный оффер и отправь клиенту с вопросами."
    return score, strengths, issues, suggestions, next_action


def coach_response(scenario: str, message: str):
    scripts = {
        "bargain": {
            "assistant_message": (
                "Понимаю, важно уложиться в бюджет. Предлагаю два варианта: базовый "
                "пакет за X и расширенный за Y. Так мы сохраним качество и сроки."
            ),
            "bullets": ["Подтверди объем", "Предложи вилку", "Зафиксируй предоплату"],
        },
        "no_spec": {
            "assistant_message": (
                "Чтобы оценить задачу, уточню цель проекта, примеры референсов и "
                "приоритетные блоки. После этого пришлю ТЗ и сроки."
            ),
            "bullets": ["Цель", "Референсы", "Контент", "Сроки"],
        },
        "endless_revisions": {
            "assistant_message": (
                "Давай зафиксируем 2 круга правок и дедлайн на обратную связь. "
                "Дополнительные правки оформим отдельным этапом."
            ),
            "bullets": ["Лимит правок", "Дедлайн", "Кто утверждает"],
        },
        "deadline": {
            "assistant_message": (
                "Готов взять задачу, но для соблюдения сроков нужно получить материалы "
                "до завтрашнего дня и согласовать один контакт для быстрых решений."
            ),
            "bullets": ["Материалы", "Контакт", "Буфер по срокам"],
        },
    }
    response = scripts.get(scenario) or scripts["no_spec"]
    if message:
        response = {
            **response,
            "assistant_message": f"{response['assistant_message']}\n\nВаш контекст: {message}",
        }
    return response
