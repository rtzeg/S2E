import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchRoadmapStep } from "../lib/api";
import { Skeleton } from "../components/Skeleton";

export const RoadmapStep = () => {
  const { stepId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["roadmap", stepId],
    queryFn: () => fetchRoadmapStep(stepId || "")
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) {
    return <p className="text-sm text-slate-500">Шаг не найден.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold text-slate-900">{data.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{data.description}</p>
        <p className="mt-4 text-sm text-slate-500">Оценка времени: {data.est_time_minutes} мин</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.skill_tags.map((tag: string) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link to={`/app/homework/${data.id}`} className="button-primary">
        Сдать домашку по шагу
      </Link>
    </div>
  );
};
