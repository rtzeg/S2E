# Skill2Earn API (MVP)

## Auth
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — login + JWT
- `GET /api/auth/me` — профиль пользователя

## Roadmap
- `GET /api/roadmap` — список шагов + статус
- `GET /api/roadmap/<step_id>` — деталь шага

## Homework
- `POST /api/homework/submit` — отправка домашки
- `GET /api/homework/result/<submission_id>` — результат AI

## Coach
- `POST /api/coach/ask` — сценарий переговоров

## Jobs
- `GET /api/jobs` — список jobs
- `POST /api/jobs/<job_id>/take` — взять job
- `GET /api/jobs/<job_id>/pack` — job pack

## Profile
- `GET /api/profile` — профиль + бейджи
- `POST /api/profile/verify-mock` — mock верификация
