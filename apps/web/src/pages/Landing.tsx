import { Link } from "react-router-dom";
import { SvgGallery } from "../components/SvgGallery";

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

export const Landing = () => {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-fog via-white to-accent-soft/40">
      {/* мягкая подсветка фона */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_0%,rgba(109,40,217,0.10),transparent_65%),radial-gradient(700px_420px_at_90%_20%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(900px_500px_at_50%_100%,rgba(16,185,129,0.10),transparent_60%)]"
      />

      {/* декоративные SVG по краям */}
      <DecorSvg
        src={deco.heroBlob}
        className="-top-44 -right-44 hidden w-[740px] rotate-6 md:block opacity-15"
      />
      <DecorSvg
        src={deco.heroRings}
        className="-left-44 top-24 hidden w-[560px] -rotate-6 md:block opacity-15"
      />
      <DecorSvg
        src={deco.wave}
        className="-bottom-44 -left-16 hidden w-[760px] md:block opacity-10"
      />

      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Лого вместо текста */}
          <Link to="/" className="flex items-center gap-3">
            <span className="sr-only">Skill2Earn</span>
            <img src={logo} alt="Skill2Earn" className="h-9 w-auto object-contain" />
            <span className="hidden text-xs text-slate-500 md:block">Freelance Launchpad</span>
          </Link>

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
        {/* лёгкие пятна для глубины */}
        <div className="pointer-events-none absolute -left-24 top-6 hidden h-56 w-56 rounded-full bg-accent/15 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -right-16 bottom-12 hidden h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl lg:block" />

        <section className="relative space-y-6">
          <p className="badge inline-flex">Skill2Earn • MVP</p>

          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
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

      <section className="relative mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.6)] backdrop-blur">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="badge inline-flex">Визуальный стиль</p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Иллюстрации и настроение проекта
              </h2>
              <p className="max-w-2xl text-sm text-slate-600">
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
