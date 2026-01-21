import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile, verifyProfile } from "../lib/api";
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
    </div>
  );
};
