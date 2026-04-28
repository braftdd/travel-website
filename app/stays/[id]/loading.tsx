export default function StayLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-[420px] bg-[#1B2D4F]/8 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2 mb-3">
              <div className="h-5 bg-[#C9A96E]/20 rounded-full w-20" />
              <div className="h-5 bg-[#C9A96E]/20 rounded-full w-16" />
            </div>
            <div className="h-9 bg-[#1B2D4F]/8 rounded-xl w-2/3" />
            <div className="h-4 bg-[#1B2D4F]/6 rounded w-1/3" />
            <div className="mt-8 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 bg-[#1B2D4F]/6 rounded" />
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 bg-[#1B2D4F]/6 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="h-72 bg-[#1B2D4F]/8 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
