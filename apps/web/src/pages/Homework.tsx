import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { submitHomework } from "../lib/api";
import { useToast } from "../lib/toast";

export const Homework = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { push } = useToast();
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: submitHomework,
    onSuccess: (data) => {
      push("Домашка отправлена");
      navigate(`/app/homework/result?submissionId=${data.submission_id}`);
    },
    onError: () => push("Ошибка отправки")
  });

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-xl font-semibold text-slate-900">Домашнее задание</h1>
        <p className="text-sm text-slate-500">
          Опиши решение, вопросы клиенту и этапы выполнения.
        </p>
        <textarea
          className="mt-4 w-full rounded-xl border border-slate-200 p-3"
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Например: цель проекта, сроки, бюджет, вопросы..."
        />
        <button
          className="button-primary mt-4"
          onClick={() =>
            mutation.mutate({
              step_id: Number(stepId),
              input_type: "text",
              content
            })
          }
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Отправка..." : "Отправить на AI-проверку"}
        </button>
      </div>
    </div>
  );
};
