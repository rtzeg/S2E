import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api";
import { useToast } from "../lib/toast";
import { useAuth } from "../lib/auth-context";

export const Login = () => {
  const navigate = useNavigate();
  const { push } = useToast();
  const { login: authLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      authLogin();
      push("Добро пожаловать!");
      navigate("/app");
    } catch (error) {
      push("Не удалось войти");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fog">
      <div className="mx-auto max-w-xl px-6 py-16">
        <div className="card p-8">
          <h1 className="text-2xl font-semibold text-slate-900">Войти в Skill2Earn</h1>
          <p className="mt-2 text-sm text-slate-500">
            Введите ваш email и пароль для входа.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2"
              type="password"
              placeholder="Пароль"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            <button className="button-primary w-full" type="submit" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};