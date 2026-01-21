import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchJobs, takeJob } from "../lib/api";
import { Skeleton } from "../components/Skeleton";
import { useToast } from "../lib/toast";

export const Jobs = () => {
  const { data, isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const { push } = useToast();
  const mutation = useMutation({
    mutationFn: takeJob,
    onSuccess: () => push("Задача добавлена")
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Starter Jobs</h1>
        <p className="text-sm text-slate-500">Первые задачи с понятным бюджетом.</p>
      </div>
      <div className="grid gap-4">
        {isLoading && <Skeleton />}
        {data?.map((job: any) => (
          <div key={job.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                <p className="text-sm text-slate-500">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.stack.map((item: string) => (
                    <span key={item} className="badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>{job.budget}</p>
                <p>{job.duration}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="button-primary"
                onClick={() => mutation.mutate(job.id)}
              >
                Взять задачу
              </button>
              <Link to={`/app/jobs/${job.id}`} className="button-secondary">
                Job Pack
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
