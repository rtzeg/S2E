import { NavLink } from "react-router-dom";

const links = [
  { to: "/app", label: "Дашборд" },
  { to: "/app/roadmap", label: "Roadmap" },
  { to: "/app/coach", label: "AI Coach" },
  { to: "/app/jobs", label: "Starter Jobs" },
  { to: "/app/profile", label: "Профиль" }
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-fog">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Skill2Earn</p>
            <p className="text-xs text-slate-500">Freelance Launchpad</p>
          </div>
          <nav className="flex gap-4 text-sm text-slate-500">
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
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};
