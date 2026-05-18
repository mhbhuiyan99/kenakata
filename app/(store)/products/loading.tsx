export default function ProductsLoading() {
  // Create an array of 8 empty slots to map out placeholder skeleton blocks
  const skeletonCards = Array.from({ length: 8 });

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
        
        {/* Title Placeholder Skeleton */}
        <div className="text-left mb-8 space-y-2 animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded-lg" />
          <div className="h-4 w-64 bg-slate-200 rounded-md" />
        </div>

        {/* Responsive Grid Mirroring Your Product Cards Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[320px] animate-pulse"
            >
              <div>
                {/* Image Box Placeholder */}
                <div className="w-full aspect-square bg-slate-200 rounded-xl mb-3" />
                
                {/* Text Lines Placeholders */}
                <div className="space-y-2 px-1">
                  <div className="h-4 w-3/4 bg-slate-200 rounded-md" />
                  <div className="h-3 w-full bg-slate-200 rounded-md" />
                </div>
              </div>

              {/* Bottom Strip Action Placeholder */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-50 px-1">
                <div className="h-5 w-14 bg-slate-200 rounded-md" />
                <div className="w-8 h-8 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}