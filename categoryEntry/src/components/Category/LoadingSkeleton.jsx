export default function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse space-y-1">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-4 rounded-xl"
          style={{ opacity: 1 - i * 0.12 }}
        >
          <div className="w-8 h-4 bg-slate-200 dark:bg-white/10 rounded" />
          <div className="w-24 h-4 bg-slate-200 dark:bg-white/10 rounded" />
          <div className="flex-1 h-4 bg-slate-200 dark:bg-white/10 rounded" />
          <div className="w-32 h-4 bg-slate-200 dark:bg-white/10 rounded hidden md:block" />
          <div className="w-16 h-6 bg-slate-200 dark:bg-white/10 rounded-full" />
          <div className="w-24 h-4 bg-slate-200 dark:bg-white/10 rounded hidden lg:block" />
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-slate-200 dark:bg-white/10 rounded-lg" />
            <div className="w-8 h-8 bg-slate-200 dark:bg-white/10 rounded-lg" />
            <div className="w-8 h-8 bg-slate-200 dark:bg-white/10 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
