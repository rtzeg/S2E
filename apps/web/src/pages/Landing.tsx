import { Link } from "react-router-dom";

import { SvgGallery } from "../components/SvgGallery";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fog via-white to-accent-soft/40">
      <header className="border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Skill2Earn</p>
            <p className="text-xs text-slate-500">Freelance Launchpad</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/onboarding" className="button-secondary">
              Войти / Регистрация
            </Link>
            <Link to="/app" className="button-primary">
              Демо
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="pointer-events-none absolute -left-24 top-6 hidden h-56 w-56 rounded-full bg-accent/15 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -right-16 bottom-12 hidden h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl lg:block" />
        <section className="space-y-6">
          <p className="badge">Skill2Earn • MVP</p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Доводим новичка до первого заработка на фрилансе
          </h1>
          <p className="text-lg text-slate-600">
            Интерактивный roadmap, тренажеры, AI-проверка и переговорный коуч, чтобы быстрее
            получить первый оплачиваемый проект.
          </p>
          <div className="flex gap-3">
            <Link to="/onboarding" className="button-primary">
              Запустить маршрут
            </Link>
            <Link to="/app/roadmap" className="button-secondary">
              Посмотреть roadmap
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-4">
              <p className="text-sm text-slate-500">7-14 дней</p>
              <p className="text-lg font-semibold">до первого заказа</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-slate-500">AI Coach</p>
              <p className="text-lg font-semibold">переговорные сценарии</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-slate-500">Starter Jobs</p>
              <p className="text-lg font-semibold">первые безопасные задачи</p>
            </div>
          </div>
        </section>

        <aside className="card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Сценарий дня</h2>
          <p className="text-sm text-slate-600">
            Клиент просит "подешевле". Как сохранить ценность и зафиксировать объем работ?
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="badge">Торг</span>
            <span className="badge">Фиксация ТЗ</span>
            <span className="badge">Сроки</span>
          </div>
          <Link to="/app/coach" className="button-secondary">
            Открыть AI Coach
          </Link>
        </aside>
      </main>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.6)] backdrop-blur">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <p className="badge">Визуальный стиль</p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Иллюстрации, которые задают ритм
              </h2>
              <p className="text-sm text-slate-600">
                Разложили SVG как на витрине с лидером и поддерживающими карточками, чтобы
                блок выглядел живо и при этом оставался читабельным.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1">
                  Мягкий фон
                </span>
                <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1">
                  Контрастные иллюстрации
                </span>
                <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1">
                  Акцентные CTA
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-white to-accent-soft/60 p-6 shadow-[0_28px_70px_-50px_rgba(92,45,158,0.55)]">
              <h3 className="text-lg font-semibold text-slate-900">Связка с roadmap</h3>
              <p className="mt-2 text-sm text-slate-600">
                Иллюстрации подсвечивают этапы пути и создают ощущение прогресса в каждом
                блоке.
              </p>
              <Link to="/app/roadmap" className="button-primary mt-4 w-full">
                Смотреть все разделы
              </Link>
            </div>
          </div>
          <SvgGallery />
        </div>
      </section>
    </div>
  );
};
