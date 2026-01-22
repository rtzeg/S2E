import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile, updateProfile, verifyProfile } from "../lib/api";
import { Skeleton } from "../components/Skeleton";
import { useToast } from "../lib/toast";

export const Profile = () => {
  const { data, isLoading, refetch } = useQuery({ queryKey: ["profile"], queryFn: fetchProfile });
  const { push } = useToast();
  const mutation = useMutation({
    mutationFn: verifyProfile,
    onSuccess: () => {
      push("Верификация обновлена");
      refetch();
    }
  });
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      push("Профиль обновлен");
      refetch();
    }
  });
  const [formState, setFormState] = useState({
    track: "",
    level: "",
    goal: ""
  });

  useEffect(() => {
    if (data) {
      setFormState({
        track: data.track ?? "",
        level: data.level ?? "",
        goal: data.goal ?? ""
      });
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">Профиль</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Имя</p>
            <p className="text-lg font-semibold">{data?.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Трек</p>
            <p className="text-lg font-semibold">{data?.track}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Уровень доверия</p>
            <p className="text-lg font-semibold">{data?.identity_level}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Сертификация</p>
            <p className="text-lg font-semibold">{data?.cert_level}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {data?.badges?.length ? (
            data.badges.map((badge: string) => (
              <span key={badge} className="badge">
                {badge}
              </span>
            ))
          ) : (
            <span className="badge">Пока нет бейджей</span>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          <button className="button-secondary" onClick={() => mutation.mutate("verified")}>
            Mock Verified
          </button>
          <button className="button-primary" onClick={() => mutation.mutate("eid_mock")}>
            Mock eID
          </button>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Настройки профиля</h2>
        <p className="mt-2 text-sm text-slate-600">
          Выберите трек, текущий уровень и цель — это влияет на рекомендации roadmap.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Трек</span>
            <select
              className="w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-2 text-sm text-slate-900 shadow-sm"
              value={formState.track}
              onChange={(event) => setFormState({ ...formState, track: event.target.value })}
            >
              <option value="web">Web</option>
              <option value="telegram">Telegram</option>
              <option value="design">Design</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Уровень</span>
            <select
              className="w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-2 text-sm text-slate-900 shadow-sm"
              value={formState.level}
              onChange={(event) => setFormState({ ...formState, level: event.target.value })}
            >
              <option value="zero">Zero</option>
              <option value="basic">Basic</option>
              <option value="confident">Confident</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Цель</span>
            <select
              className="w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-2 text-sm text-slate-900 shadow-sm"
              value={formState.goal}
              onChange={(event) => setFormState({ ...formState, goal: event.target.value })}
            >
              <option value="first_job">First job</option>
              <option value="raise_rate">Raise rate</option>
              <option value="portfolio">Portfolio</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="button-primary"
            onClick={() => updateMutation.mutate(formState)}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Сохраняем..." : "Сохранить настройки"}
          </button>
          <button
            className="button-secondary"
            onClick={() =>
              setFormState({
                track: data?.track ?? "",
                level: data?.level ?? "",
                goal: data?.goal ?? ""
              })
            }
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
