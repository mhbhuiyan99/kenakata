import { getCategories } from "@/lib/api/categories";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesIndexPage() {
  const categories = await getCategories(50);

  return (
    <main className="min-h-screen  pb-16">
      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">All Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Browse all available departments</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all duration-200"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-slate-50">
                <Image src={category.image} alt={category.name} fill unoptimized className="object-contain" sizes="64px" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-sm">{category.name}</h3>
                <p className="text-xs text-slate-400">Explore products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
