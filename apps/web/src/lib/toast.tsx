import { createContext, useContext, useState } from "react";

type Toast = { id: number; message: string };

const ToastContext = createContext<{
  toasts: Toast[];
  push: (message: string) => void;
}>({ toasts: [], push: () => {} });

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (message: string) => {
    const toast = { id: Date.now(), message };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== toast.id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toasts, push }}>
      {children}
      <div className="fixed bottom-6 right-6 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
