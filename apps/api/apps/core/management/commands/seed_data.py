from django.core.management.base import BaseCommand

from apps.core.models import Job, JobPack, RoadmapStep


class Command(BaseCommand):
    help = "Seed roadmap steps and starter jobs"

    def handle(self, *args, **options):
        if RoadmapStep.objects.exists() or Job.objects.exists():
            self.stdout.write(self.style.WARNING("Seed data already exists"))
            return

        steps = [
            {
                "title": "Бриф и цели клиента",
                "description": "Собери цели бизнеса и критерии успеха.",
                "est_time_minutes": 60,
                "skill_tags": ["discovery", "communication"],
                "order": 1,
            },
            {
                "title": "Структура лендинга",
                "description": "Собери структуру и блоки на основе брифа.",
                "est_time_minutes": 90,
                "skill_tags": ["ux", "content"],
                "order": 2,
            },
            {
                "title": "Оффер и сроки",
                "description": "Сформулируй оффер, сроки и этапы работы.",
                "est_time_minutes": 45,
                "skill_tags": ["sales", "planning"],
                "order": 3,
            },
            {
                "title": "Дизайн-концепт",
                "description": "Подготовь визуальные референсы и стиль.",
                "est_time_minutes": 120,
                "skill_tags": ["design"],
                "order": 4,
            },
            {
                "title": "Сборка макета",
                "description": "Собери первую версию макета и чек-лист.",
                "est_time_minutes": 180,
                "skill_tags": ["html", "css"],
                "order": 5,
            },
            {
                "title": "Коммуникация",
                "description": "Отработай сценарии переговоров и фиксацию ТЗ.",
                "est_time_minutes": 60,
                "skill_tags": ["negotiation"],
                "order": 6,
            },
            {
                "title": "Первый заказ",
                "description": "Возьми starter job и доведи до сдачи.",
                "est_time_minutes": 240,
                "skill_tags": ["delivery"],
                "order": 7,
            },
        ]
        RoadmapStep.objects.bulk_create([RoadmapStep(**item) for item in steps])

        jobs = [
            {
                "title": "Лендинг для кофейни",
                "budget": "5 000 ₽",
                "duration": "3 дня",
                "stack": ["HTML", "CSS"],
                "difficulty": "easy",
                "description": "Нужен лендинг с меню, отзывами и CTA на заказ.",
            },
            {
                "title": "Телеграм-бот напоминаний",
                "budget": "7 000 ₽",
                "duration": "5 дней",
                "stack": ["Python", "Telegram"],
                "difficulty": "easy",
                "description": "Бот с простыми командами и ежедневными уведомлениями.",
            },
            {
                "title": "Дизайн баннеров",
                "budget": "4 000 ₽",
                "duration": "2 дня",
                "stack": ["Figma"],
                "difficulty": "easy",
                "description": "Серия из 5 баннеров для Instagram.",
            },
            {
                "title": "Сайт-визитка для юриста",
                "budget": "6 500 ₽",
                "duration": "4 дня",
                "stack": ["HTML", "CSS", "JS"],
                "difficulty": "easy",
                "description": "Одностраничник с услугами и формой заявки.",
            },
            {
                "title": "Лендинг курса",
                "budget": "9 000 ₽",
                "duration": "5 дней",
                "stack": ["Tilda"],
                "difficulty": "medium",
                "description": "Страница запуска онлайн-курса.",
            },
            {
                "title": "Бот для записи клиентов",
                "budget": "12 000 ₽",
                "duration": "7 дней",
                "stack": ["Python", "Telegram"],
                "difficulty": "medium",
                "description": "Бот для бронирования времени и напоминаний.",
            },
            {
                "title": "Редизайн лендинга",
                "budget": "8 000 ₽",
                "duration": "4 дня",
                "stack": ["Figma", "HTML"],
                "difficulty": "medium",
                "description": "Обновить визуал и конверсию на лендинге.",
            },
            {
                "title": "UI kit для стартапа",
                "budget": "10 000 ₽",
                "duration": "6 дней",
                "stack": ["Figma"],
                "difficulty": "medium",
                "description": "Набор компонентов для веб-приложения.",
            },
            {
                "title": "Одностраничный сайт мероприятия",
                "budget": "5 500 ₽",
                "duration": "3 дня",
                "stack": ["HTML", "CSS"],
                "difficulty": "easy",
                "description": "Промо-страница с формой регистрации.",
            },
            {
                "title": "Серия email-шаблонов",
                "budget": "4 500 ₽",
                "duration": "2 дня",
                "stack": ["HTML", "Email"],
                "difficulty": "easy",
                "description": "3 email-шаблона для рассылки.",
            },
        ]

        created_jobs = Job.objects.bulk_create([Job(**job) for job in jobs])

        for job in created_jobs:
            JobPack.objects.create(
                job=job,
                questions_to_client=[
                    "Цель задачи",
                    "Кто принимает решение",
                    "Какие материалы уже есть",
                ],
                scope_template="Объем работ: ...\nЭтапы: ...\nСроки: ...",
                contract_template="Договор оказания услуг (шаблон)",
                invoice_template="Инвойс (шаблон)",
            )

        self.stdout.write(self.style.SUCCESS("Seed data created"))
