// components/home/FeaturedProducts.tsx
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/api/products";

export default async function FeaturedProducts() {
  // Fetching the top 8 products strictly from our product API layer
  const products = await getFeaturedProducts(8);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-16">
      
      {/* Section Header Grid */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h2 className="text-mono text-2xl md:text-3xl font-extrabold tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Explore our top-selling lifestyle collections
          </p>
        </div>
        <Link 
          href="/products" 
          className="text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Grid mapping loop running across clean Product Card elements */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
            >
              <div>
                {/* Image Layout Card Frame */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    unoptimized // Keeps external image strings parsing fast
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-600">
                    {product.category.name}
                  </span>
                </div>

                {/* Info Text Stack */}
                <div className="space-y-1 text-left px-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 group-hover:text-teal-700 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer Actions Strip */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-50 px-1">
                <span className="text-base font-black text-slate-900">
                  ${product.price}
                </span>
                {/* Interactive visual button placeholder indicators */}
                <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center group-hover:bg-[#b4f46c] group-hover:text-teal-950 transition-colors duration-200">
                  +
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 italic py-4 text-left">
          No featured products available at the moment.
        </p>
      )}

    </section>
  );
}