import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/app", label: "Дашборд" },
  { to: "/app/roadmap", label: "Roadmap" },
  { to: "/app/coach", label: "AI Coach" },
  { to: "/app/jobs", label: "Starter Jobs" },
  { to: "/app/profile", label: "Профиль" }
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-fog">
      <header className="relative border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Skill2Earn</p>
            <p className="text-xs text-slate-500">Freelance Launchpad</p>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-slate-500 mb-1"></span>
            <span className="block w-5 h-0.5 bg-slate-500 mb-1"></span>
            <span className="block w-5 h-0.5 bg-slate-500"></span>
          </button>
          <nav className="hidden md:flex gap-4 text-sm text-slate-500">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "text-slate-900 font-semibold" : "hover:text-slate-700"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <nav className={`flex flex-col absolute top-full right-0 w-48 bg-white border border-slate-200 rounded-md shadow-lg p-2 z-10 text-sm text-slate-500 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "block py-2 px-3 text-slate-900 font-semibold rounded hover:bg-slate-100" : "block py-2 px-3 hover:text-slate-700 hover:bg-slate-100 rounded"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};
