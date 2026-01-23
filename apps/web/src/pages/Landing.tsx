import { Link } from "react-router-dom";
import { SvgGallery } from "../components/SvgGallery";
import { useAuth } from "../lib/auth-context";

type DecorSvgProps = {
  src: string;
  className: string;
};

const DecorSvg = ({ src, className }: DecorSvgProps) => {
  return (
    <img
      aria-hidden
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
      className={[
        "pointer-events-none select-none",
        "absolute opacity-20",
        "mix-blend-multiply",
        className,
      ].join(" ")}
    />
  );
};

// import { SvgGallery } from "../components/SvgGallery";

export const Landing = () => {
  const { isAuthenticated, logout } = useAuth();

  // BASE_URL важен, если деплой не в корень домена
  const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
  const svg = (name: string) => asset(`svgs/${name}`);

  const logo = asset("logo.png");

  const deco = {
    heroBlob: svg("startup.svg"),
    heroRings: svg("asking-question.svg"),
    wave: svg("people-rushing.svg"),

    cardRocket: svg("done.svg"),
    cardChat: svg("chat.svg"),
    cardBag: svg("strategy.svg"),

    asideIcon: svg("becoming-rich.svg"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fog via-white to-accent-soft/40">
      <header className="border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 xs:px-6 py-4">
          {/* Лого вместо текста */}
          <Link to="/" className="flex items-center gap-3">
            <span className="sr-only">Skill2Earn</span>
            <img src={logo} alt="Skill2Earn" className="h-9 w-auto object-contain" />
            <span className="hidden text-xs text-slate-500 md:block">Freelance Launchpad</span>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={logout} className="button-secondary">
                Выйти
              </button>
            ) : (
              <>
                <Link to="/login" className="button-secondary">
                  Войти
                </Link>
                <Link to="/onboarding" className="button-secondary">
                  Регистрация
                </Link>
              </>
            )}
            <Link to="/app" className="button-primary">
              Демо
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-6 xs:gap-10 px-4 xs:px-6 py-8 xs:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="pointer-events-none absolute -left-24 top-6 hidden h-56 w-56 rounded-full bg-accent/15 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -right-16 bottom-12 hidden h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl lg:block" />
        <section className="space-y-6">
          <p className="badge">Skill2Earn • MVP</p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Доводим новичка до первого заработка на фрилансе
          </h1>

          <p className="max-w-2xl text-lg text-slate-600">
            Интерактивный roadmap, тренажеры, AI-проверка и переговорный коуч, чтобы быстрее
            получить первый оплачиваемый проект.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/onboarding" className="button-primary">
              Запустить маршрут
            </Link>
            <Link to="/app/roadmap" className="button-secondary">
              Посмотреть roadmap
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="card relative overflow-hidden p-4">
              <DecorSvg src={deco.cardRocket} className="-right-10 -top-10 w-32 opacity-15" />
              <p className="text-sm text-slate-500">7–14 дней</p>
              <p className="text-lg font-semibold text-slate-900">до первого заказа</p>
              <p className="mt-1 text-sm text-slate-600">
                Понятный маршрут без “угадай что делать”.
              </p>
            </div>

            <div className="card relative overflow-hidden p-4">
              <DecorSvg src={deco.cardChat} className="-right-10 -top-10 w-32 opacity-15" />
              <p className="text-sm text-slate-500">AI Coach</p>
              <p className="text-lg font-semibold text-slate-900">переговорные сценарии</p>
              <p className="mt-1 text-sm text-slate-600">
                Готовые ответы, чтобы не теряться.
              </p>
            </div>

            <div className="card relative overflow-hidden p-4">
              <DecorSvg src={deco.cardBag} className="-right-10 -top-10 w-32 opacity-15" />
              <p className="text-sm text-slate-500">Starter Jobs</p>
              <p className="text-lg font-semibold text-slate-900">первые безопасные задачи</p>
              <p className="mt-1 text-sm text-slate-600">
                Пакеты: вопросы, scope, договор, инвойс.
              </p>
            </div>
          </div>
        </section>

        <aside className="card relative overflow-hidden space-y-4 p-6">
          <DecorSvg src={deco.asideIcon} className="-right-10 -top-10 w-40 opacity-15" />

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Сценарий дня</h2>
            <p className="text-sm text-slate-600">
              Клиент просит “подешевле”. Как сохранить ценность и зафиксировать объем работ?
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="badge">Торг</span>
            <span className="badge">Фиксация ТЗ</span>
            <span className="badge">Сроки</span>
          </div>

          <Link to="/app/coach" className="button-secondary w-fit">
            Открыть AI Coach
          </Link>

          <div className="mt-2 rounded-2xl bg-white/60 p-4 text-sm text-slate-600">
            Подсказка: <span className="font-semibold">сначала</span> фиксируй scope,{" "}
            <span className="font-semibold">потом</span> обсуждай цену.
          </div>
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
