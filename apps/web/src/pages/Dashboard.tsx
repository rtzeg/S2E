import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchJobs, fetchRoadmap, fetchProfile } from "../lib/api";
import { Skeleton } from "../components/Skeleton";

export const Dashboard = () => {
  const roadmapQuery = useQuery({ queryKey: ["roadmap"], queryFn: fetchRoadmap });
  const jobsQuery = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: fetchProfile });

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h1 className="text-xl font-semibold text-slate-900">Добро пожаловать!</h1>
        {profileQuery.isLoading ? (
          <div className="mt-4">
            <Skeleton />
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">
            {profileQuery.data?.name}, твой трек: {profileQuery.data?.track}. Цель —
            {" "}
            {profileQuery.data?.goal}.
          </p>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Roadmap</h2>
            <Link to="/app/roadmap" className="text-sm text-accent">
              Смотреть все
            </Link>
          </div>
          {roadmapQuery.isLoading ? (
            <div className="mt-4">
              <Skeleton />
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {roadmapQuery.data?.slice(0, 3).map((step: any) => (
                <li key={step.id} className="flex items-center justify-between text-sm">
                  <span>{step.title}</span>
                  <span className="badge">{step.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Starter Jobs</h2>
            <Link to="/app/jobs" className="text-sm text-accent">
              Все заказы
            </Link>
          </div>
          {jobsQuery.isLoading ? (
            <div className="mt-4">
              <Skeleton />
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {jobsQuery.data?.slice(0, 3).map((job: any) => (
                <li key={job.id} className="text-sm">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <p className="text-slate-500">{job.budget} · {job.duration}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
