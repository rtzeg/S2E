from django.core.management.base import BaseCommand

from apps.core.models import (
    AIResult,
    Job,
    JobPack,
    RoadmapStep,
    Submission,
    TakenJob,
    UserRoadmapProgress,
)


class Command(BaseCommand):
    help = "Seed roadmap steps and starter jobs"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Clear existing seed data before inserting fresh rows",
        )

    def handle(self, *args, **options):
        if RoadmapStep.objects.exists() or Job.objects.exists():
            if not options["force"]:
                self.stdout.write(self.style.WARNING("Seed data already exists"))
                self.stdout.write(self.style.WARNING("Run with --force to reseed"))
                return
            AIResult.objects.all().delete()
            Submission.objects.all().delete()
            TakenJob.objects.all().delete()
            UserRoadmapProgress.objects.all().delete()
            JobPack.objects.all().delete()
            Job.objects.all().delete()
            RoadmapStep.objects.all().delete()

        steps = [
            {
                "title": "Старт и позиционирование",
                "description": (
                    "Урок: выбери нишу и четкий оффер.\n"
                    "Практика: опиши 3 результата, которые ты даешь.\n"
                    "Чек-лист: кому помогаю → чем → за какой срок."
                ),
                "est_time_minutes": 45,
                "skill_tags": ["positioning", "offer"],
                "order": 1,
            },
            {
                "title": "Портфолио и кейсы",
                "description": (
                    "Урок: структура сильного кейса.\n"
                    "Практика: оформи 1 кейс (задача → процесс → результат).\n"
                    "Материалы: шаблон кейса + список метрик."
                ),
                "est_time_minutes": 90,
                "skill_tags": ["portfolio", "storytelling"],
                "order": 2,
            },
            {
                "title": "Поиск первых заказов",
                "description": (
                    "Урок: где искать и как писать первым.\n"
                    "Практика: сделай 5 откликов по шаблону.\n"
                    "Шаблон: короткий питч + вопрос клиенту."
                ),
                "est_time_minutes": 60,
                "skill_tags": ["outreach", "sales"],
                "order": 3,
            },
            {
                "title": "Созвон и бриф",
                "description": (
                    "Урок: вопросы для брифа.\n"
                    "Практика: собери бриф из 10 вопросов.\n"
                    "Результат: документ с целями, аудиторией, критериями."
                ),
                "est_time_minutes": 75,
                "skill_tags": ["discovery", "communication"],
                "order": 4,
            },
            {
                "title": "Оценка и оффер",
                "description": (
                    "Урок: как считать сроки и цену.\n"
                    "Практика: составь 2 пакета (basic/pro).\n"
                    "Результат: оффер с этапами и дедлайном."
                ),
                "est_time_minutes": 60,
                "skill_tags": ["pricing", "planning"],
                "order": 5,
            },
            {
                "title": "Выполнение и сдача",
                "description": (
                    "Урок: структура выполнения и промежуточные отчеты.\n"
                    "Практика: составь план из 3 этапов.\n"
                    "Результат: отчет + финальный файл."
                ),
                "est_time_minutes": 120,
                "skill_tags": ["delivery", "communication"],
                "order": 6,
            },
            {
                "title": "После проекта",
                "description": (
                    "Урок: как попросить отзыв и апсейл.\n"
                    "Практика: подготовь сообщение с отзывом.\n"
                    "Результат: отзыв + кейс в портфолио."
                ),
                "est_time_minutes": 45,
                "skill_tags": ["retention", "growth"],
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
            {
                "title": "Прототип мобильного экрана",
                "budget": "6 000 ₽",
                "duration": "3 дня",
                "stack": ["Figma"],
                "difficulty": "easy",
                "description": "Прототип одного экрана и UI-гайд.",
            },
            {
                "title": "Лендинг для вебинара",
                "budget": "7 500 ₽",
                "duration": "4 дня",
                "stack": ["Tilda", "Design"],
                "difficulty": "easy",
                "description": "Страница с формой регистрации и блоками спикера.",
            },
            {
                "title": "Настройка Notion-CRM",
                "budget": "8 000 ₽",
                "duration": "3 дня",
                "stack": ["Notion"],
                "difficulty": "medium",
                "description": "Простая CRM с этапами и шаблонами задач.",
            },
            {
                "title": "Логотип и мини-гайд",
                "budget": "9 500 ₽",
                "duration": "5 дней",
                "stack": ["Figma", "Illustrator"],
                "difficulty": "medium",
                "description": "Логотип + 3 варианта использования.",
            },
        ]

        created_jobs = Job.objects.bulk_create([Job(**job) for job in jobs])

        for job in created_jobs:
            JobPack.objects.create(
                job=job,
                questions_to_client=[
                    "Какой результат хотите получить?",
                    "Кто принимает финальное решение?",
                    "Какие материалы уже есть?",
                    "Есть ли примеры, которые нравятся?",
                ],
                scope_template=(
                    "Объем работ: ...\n"
                    "Этапы: ...\n"
                    "Сроки: ...\n"
                    "Что входит/не входит: ..."
                ),
                contract_template="Договор оказания услуг (шаблон v1)",
                invoice_template="Инвойс (шаблон v1)",
            )

        self.stdout.write(self.style.SUCCESS("Seed data created"))
