import { getProductDetail } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton"; 

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductDetail(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* Breadcrumbs Navigation */}
        <div className="text-left text-xs text-slate-400 font-medium mb-6">
          <Link href="/" className="hover:text-teal-700">Home</Link> /{" "}
          <Link href="/products" className="hover:text-teal-700">Products</Link> /{" "}
          <span className="text-slate-600 font-semibold">{product.title}</span>
        </div>

        {/* Main Grid Card frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
          
          {/* Left Side: Product Gallery Display Frame */}
          <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder-box.png"}
              alt={product.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-w: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Side: Product Details Info Block */}
          <div className="flex flex-col justify-between text-left py-2">
            <div className="space-y-4">
              <span className="inline-block bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                {product.category?.name || "Premium Collection"}
              </span>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              
              <p className="text-2xl font-black text-slate-900">
                ${product.price}
              </p>
              
              <div className="w-12 h-0.5 bg-slate-100" />
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Description</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <AddToCartButton product={product} />
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}