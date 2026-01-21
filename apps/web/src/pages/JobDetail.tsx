import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchJobPack } from "../lib/api";
import { Skeleton } from "../components/Skeleton";

export const JobDetail = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobPack(Number(jobId)),
    enabled: Boolean(jobId)
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) {
    return <p className="text-sm text-slate-500">Job pack не найден.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">{data.job.title}</h1>
        <p className="text-sm text-slate-500">{data.job.description}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Вопросы клиенту</h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-500">
              {data.questions_to_client.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Scope</h3>
            <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              {data.scope_template}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Договор</h3>
            <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              {data.contract_template}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Инвойс</h3>
            <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              {data.invoice_template}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
