import { getProducts } from "@/lib/api/products"; 
import Image from "next/image";
import Link from "next/link";
import FilterSidebar from "@/components/products/FilterSidebar"; 

interface PageProps {
  searchParams: Promise<{
    title?: string;
    price_min?: string;
    price_max?: string;
    categoryId?: string;
    offset?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  
  const ITEMS_PER_PAGE = 9; 
  const currentOffset = Number(filters.offset) || 0;
  
  const allMatchingProducts = await getProducts(filters, 200); 
  const totalProductsCount = allMatchingProducts.length;

  const totalPages = Math.max(Math.ceil(totalProductsCount / ITEMS_PER_PAGE), 1);
  const currentPage = Math.min(Math.floor(currentOffset / ITEMS_PER_PAGE) + 1, totalPages);

  const displayedProducts = allMatchingProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPaginationUrl = (newOffset: number) => {
    const query = new URLSearchParams();
    if (filters.title) query.append("title", filters.title);
    if (filters.price_min) query.append("price_min", filters.price_min);
    if (filters.price_max) query.append("price_max", filters.price_max);
    if (filters.categoryId) query.append("categoryId", filters.categoryId);
    query.append("offset", newOffset.toString());
    return `/products?${query.toString()}`;
  };

  return (
    <main className="min-h-screen pb-16">
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
        
        {/* Catalog Title Header Group */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Our Full Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {/* Displays the precise page fraction layout requested */}
            Showing page <span className="font-bold text-teal-800">{currentPage} / {totalPages}</span> ({totalProductsCount} items total)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column Container */}
          <div className="lg:col-span-1 w-full">
            <FilterSidebar />
          </div>

          {/* Right Column Container */}
          <div className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
                <span className="text-4xl">🔍</span>
                <p className="text-slate-500 font-bold text-lg mt-3">No matching items found</p>
                <p className="text-slate-400 text-xs mt-1">Try relaxing your range limits.</p>
                <Link href="/products" className="mt-4 inline-block text-xs font-bold text-teal-800 underline">
                  Reset Catalog View
                </Link>
              </div>
            ) : (
              <div className="space-y-10">
                
                {/* Product Grid Matrix */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {displayedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full block"
                    >
                      <div>
                        <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-w: 768px) 50vw, 25vw"
                          />
                          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-600">
                            {product.category.name}
                          </span>
                        </div>

                        <div className="space-y-1 text-left px-1">
                          <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 group-hover:text-teal-700 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-50 px-1">
                        <span className="text-base font-black text-slate-900">
                          ${product.price}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center group-hover:bg-[#b4f46c] group-hover:text-teal-950 transition-colors duration-200">
                          +
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Server-Side Pagination Controls Row */}
                <div className="flex items-center justify-center gap-4 border-t border-slate-300 pt-6">
                  {/* Previous Action Button */}
                  {currentPage > 1 ? (
                    <Link
                      href={getPaginationUrl((currentPage - 2) * ITEMS_PER_PAGE)}
                      className="bg-white text-slate-800 font-bold px-5 py-2 rounded-xl text-sm border border-slate-300/60 shadow-sm hover:bg-slate-50 transition-all"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 font-bold px-5 py-2 rounded-xl text-sm border border-slate-200 cursor-not-allowed opacity-60">
                      ← Previous
                    </span>
                  )}

                  {/* Page Indicator Format Fraction: Current / Total */}
                  <span className="text-sm font-bold text-slate-700 bg-[#b4f46c] px-4 py-2 rounded-xl border border-slate-300/60 shadow-sm">
                    {currentPage} / {totalPages}
                  </span>

                  {/* Next Action Button */}
                  {currentPage < totalPages ? (
                    <Link
                      href={getPaginationUrl(currentPage * ITEMS_PER_PAGE)}
                      className="bg-white text-slate-800 font-bold px-5 py-2 rounded-xl text-sm border border-slate-300/60 shadow-sm hover:bg-slate-50 transition-all"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 font-bold px-5 py-2 rounded-xl text-sm border border-slate-200 cursor-not-allowed opacity-60">
                      Next →
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </section>
    </main>
  );
}