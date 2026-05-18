import { getCategoryProducts } from "@/lib/api/categories";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  
  const products = await getCategoryProducts(Number(id));

  const categoryName = products[0]?.category?.name || "Category Collections";

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
        
        {/* Breadcrumb Info Strip */}
        <div className="text-left text-xs text-slate-400 font-medium mb-4">
          <Link href="/" className="hover:text-teal-700">Home</Link> /{" "}
          <span className="text-slate-600 font-semibold">{categoryName}</span>
        </div>

        {/* Category Heading */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {categoryName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover our curated {categoryName.toLowerCase()} selections
          </p>
        </div>

        {/* Product Grid display */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                  <span className="text-base font-black text-slate-900">${product.price}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center group-hover:bg-[#b4f46c] group-hover:text-teal-950 transition-colors duration-200">
                    +
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center text-slate-500 max-w-md mx-auto mt-12">
            <p className="font-medium">No products found in this category.</p>
            <Link href="/" className="text-sm text-teal-700 font-bold mt-2 inline-block hover:underline">
              ← Return to Home
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}