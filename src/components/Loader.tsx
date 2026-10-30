export function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin" />
      </div>
      {label && <p className="text-sm text-slate-400">{label}</p>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-5 animate-pulse">
      <div className="shimmer-bg h-4 w-2/3 rounded mb-3" />
      <div className="shimmer-bg h-3 w-full rounded mb-2" />
      <div className="shimmer-bg h-3 w-4/5 rounded" />
    </div>
  );
}
