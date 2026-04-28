export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] pt-24 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-7 bg-[#1B2D4F]/8 rounded-xl w-44 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/6">
              <div className="h-48 bg-[#1B2D4F]/8" />
              <div className="p-4 space-y-2.5">
                <div className="h-4 bg-[#1B2D4F]/8 rounded w-3/4" />
                <div className="h-3 bg-[#1B2D4F]/6 rounded w-1/2" />
                <div className="h-5 bg-[#C9A96E]/15 rounded-full w-24 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
