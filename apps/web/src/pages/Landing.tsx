import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
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
    </div>
  );
};
