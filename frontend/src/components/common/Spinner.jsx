export default function Spinner({ fullPage = false, size = "md" }) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };

  const spinner = (
    <div
      className={`${sizes[size]} border-2 border-white/20 border-t-primary rounded-full animate-spin`}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-400 font-body text-sm animate-pulse">Loading…</p>
        </div>
      </div>
    );
  }

  return spinner;
}
