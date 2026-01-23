import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRoadmap } from "../lib/api";
import { Skeleton } from "../components/Skeleton";

export const Roadmap = () => {
  const { data, isLoading } = useQuery({ queryKey: ["roadmap"], queryFn: fetchRoadmap });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Roadmap</h1>
        <p className="text-sm text-slate-500">7 шагов до первого заказа</p>
      </div>
      <div className="grid gap-4">
        {isLoading && <Skeleton />}
        {data?.map((step: any) => (
          <div key={step.id} className="card flex items-center justify-between p-5">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.description}</p>
              <div className="mt-2 flex gap-2">
                {step.skill_tags.map((tag: string) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <span className="badge">{step.status}</span>
              <Link to={`/app/roadmap/${step.id}`} className="mt-3 block text-sm text-accent">
                Детали
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
