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
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  
  const products = await getProducts(filters, 20);

  return (
    <main className="min-h-screen bg-gray-200 pb-16">
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
        
        {/* Catalog Title Header Group */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Full Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing {products.length} premium lifestyle essentials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column Container: Filter Sidebar sits here */}
          <div className="lg:col-span-1 w-full">
            <FilterSidebar />
          </div>

          {/* Right Column Container: Your exact product catalog display area */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
                <span className="text-4xl">🔍</span>
                <p className="text-slate-500 font-bold text-lg mt-3">No matching items found</p>
                <p className="text-slate-400 text-xs mt-1">Try relaxing your range limits.</p>
                <Link href="/products" className="mt-4 inline-block text-xs font-bold text-teal-800 underline">
                  Reset Catalog View
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
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
            )}
          </div>

        </div>

      </section>
    </main>
  );
}