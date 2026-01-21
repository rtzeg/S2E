# Skill2Earn MVP

Skill2Earn — платформа, которая доводит новичка до первого заработка на фрилансе: интерактивный roadmap, тренажеры, AI-проверка домашних заданий, переговорный AI-коуч и витрина starter jobs.

## Структура репозитория
```
apps/web   # React + Vite + TypeScript + Tailwind
apps/api   # Django + DRF + SimpleJWT
apps/bot   # Telegram bot (aiogram 3.x)
docs/      # схемы API и демо-сценарий
```

## Запуск без Docker

### API
```bash
cd apps/api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
mkdir -p data
python manage.py migrate
python manage.py seed_data
python manage.py runserver 0.0.0.0:8000
```

### Web
```bash
cd apps/web
npm install
npm run dev
```
Создайте `.env` со значением:
```
VITE_API_URL=http://localhost:8000
```

### Telegram bot
```bash
cd apps/bot
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
TELEGRAM_BOT_TOKEN=your_token API_URL=http://localhost:8000/api WEB_URL=http://localhost:5173 python main.py
```

## Запуск в Docker
```bash
docker compose up --build
```

## Полезные ссылки
- API schema: http://localhost:8000/api/docs/
- Web app: http://localhost:5173/

## Seed данные
Команда `python manage.py seed_data` создаёт:
- 7 шагов roadmap
- 10 starter jobs + Job Pack для каждой задачи

## Бот
Бот автоматически создаёт пользователя по Telegram ID через `/api/bot/auth` и возвращает JWT. Deep link на результат домашки:
```
http://localhost:5173/app/homework/result?submissionId=<id>&source=telegram
```
