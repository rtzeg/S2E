export const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-2/3 rounded bg-slate-200"></div>
      <div className="h-4 w-full rounded bg-slate-200"></div>
      <div className="h-4 w-5/6 rounded bg-slate-200"></div>
    </div>
  );
};
