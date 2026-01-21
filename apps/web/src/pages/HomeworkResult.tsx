import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchHomeworkResult } from "../lib/api";
import { Skeleton } from "../components/Skeleton";

export const HomeworkResult = () => {
  const [params] = useSearchParams();
  const submissionId = params.get("submissionId") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["homework", submissionId],
    queryFn: () => fetchHomeworkResult(submissionId),
    enabled: Boolean(submissionId)
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) {
    return <p className="text-sm text-slate-500">Результат не найден.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-xl font-semibold text-slate-900">AI-проверка</h1>
        <p className="mt-2 text-sm text-slate-500">Оценка: {data.ai_result?.score}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Сильные стороны</h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-500">
              {data.ai_result?.strengths?.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Риски</h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-500">
              {data.ai_result?.issues?.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Рекомендации</h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-500">
              {data.ai_result?.suggestions?.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Следующий шаг: {data.ai_result?.next_action}
        </div>
      </div>
    </div>
  );
};
