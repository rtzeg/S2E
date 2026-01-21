# Skill2Earn MVP

Skill2Earn — платформа, которая доводит новичка до первого заработка на фрилансе: интерактивный roadmap, тренажеры, AI-проверка домашних заданий, переговорный AI-коуч и витрина starter jobs.

## Структура репозитория
```
apps/web   # React + Vite + TypeScript + Tailwind
apps/api   # Django + DRF + SimpleJWT
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

## Запуск в Docker
```bash
docker compose up --build
```
В Docker фронтенд обращается к API по адресу `http://api:8000` (имя сервиса), поэтому в `docker-compose.yml` переменная `VITE_API_URL` задана именно так.
Если фронт не стартует с ошибками о `rollup`/`node_modules`, убедитесь что контейнер использует собственные зависимости: в `docker-compose.yml` уже добавлен volume `/app/node_modules` для сервиса web.
При повторяющихся ошибках пересоберите образ без кеша: `docker compose build --no-cache web`.

## Полезные ссылки
- API schema: http://localhost:8000/api/docs/
- Web app: http://localhost:5173/

## Seed данные
Команда `python manage.py seed_data` создаёт:
- 7 шагов roadmap
- 10 starter jobs + Job Pack для каждой задачи
