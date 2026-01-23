import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { askCoach } from "../lib/api";

const scenarios = [
  { id: "bargain", label: "Торг" },
  { id: "no_spec", label: "Нет ТЗ" },
  { id: "endless_revisions", label: "Бесконечные правки" },
  { id: "deadline", label: "Сроки" }
];

export const Coach = () => {
  const [scenario, setScenario] = useState("no_spec");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: askCoach
  });

  const handleAsk = () => {
    mutation.mutate({ scenario, message });
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-xl font-semibold">AI Negotiation Coach</h1>
        <p className="text-sm text-slate-500">
          Выбери сценарий и получи готовый черновик ответа клиенту.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenarios.map((item) => (
            <button
              key={item.id}
              className={
                scenario === item.id
                  ? "button-primary"
                  : "button-secondary"
              }
              onClick={() => setScenario(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <textarea
          className="mt-4 w-full rounded-xl border border-slate-200 p-3"
          rows={4}
          placeholder="Добавь контекст от клиента"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="button-primary mt-4" onClick={handleAsk}>
          Получить подсказку
        </button>
      </div>

      {mutation.data && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Ответ AI</h2>
          <p className="mt-2 text-sm text-slate-600">{mutation.data.assistant_message}</p>
          <ul className="mt-4 list-disc pl-5 text-sm text-slate-500">
            {mutation.data.bullets?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
