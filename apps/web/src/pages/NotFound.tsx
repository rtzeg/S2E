import { Link } from "react-router-dom";

export const NotFound = () => {
  const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
  const svg = (name: string) => asset(`svgs/${name}`);

  const deco = {
    question: svg("asking-question.svg"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fog via-white to-accent-soft/40 flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <div className="relative">
          <img
            src={deco.question}
            alt=""
            className="mx-auto w-32 h-32 opacity-20"
          />
          <h1 className="text-8xl font-bold text-slate-900 mt-4">404</h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Страница не найдена</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Похоже, вы заблудились. Давайте вернемся на главную страницу и продолжим путь к первому заработку на фрилансе.
          </p>
        </div>
        <Link to="/" className="button-primary inline-block">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};