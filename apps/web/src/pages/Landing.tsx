import { Link } from "react-router-dom";

import { SvgGallery } from "../components/SvgGallery";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-fog">
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

      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
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
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_32px_80px_-60px_rgba(15,23,42,0.6)] backdrop-blur">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="badge">Визуальный стиль</p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Иллюстрации и настроение проекта
              </h2>
              <p className="text-sm text-slate-600">
                Мы собираем SVG-истории в аккуратную галерею и подстраиваем акценты интерфейса
                под их палитру.
              </p>
            </div>
            <Link to="/app/roadmap" className="button-primary">
              Смотреть все разделы
            </Link>
          </div>
          <SvgGallery />
        </div>
      </section>
    </div>
  );
};
