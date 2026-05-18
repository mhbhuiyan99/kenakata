import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api/categories";

export default async function CategoriesGrid() {
  const categories = await getCategories(5);

  return (
    <section className="max-w-7xl mx-auto pt-10 pb-4 px-4 sm:px-6 lg:px-16">
      
      <div className="text-left mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Categories
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Search your daily essentials across our departments
        </p>
      </div>

      {/* The Horizontal Swipe/Grid container below remains unchanged */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 pb-4 md:pb-0 scrollbar-none snap-x items-stretch">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="min-w-[170px] sm:min-w-[200px] md:min-w-0 shrink-0 snap-start group block"
          >
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-200 flex flex-col justify-between h-[120px] relative overflow-hidden">
              <div className="z-10 max-w-[65%] text-left">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight tracking-tight line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-1">In store delivery</p>
              </div>
              <div className="absolute right-2 bottom-2 w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-105">
                <Image src={category.image} alt={category.name} fill unoptimized className="object-contain object-bottom" sizes="64px" />
              </div>
            </div>
          </Link>
        ))}

        {/* See all card */}
        <Link href="/categories" className="min-w-[100px] sm:min-w-[120px] md:min-w-0 shrink-0 snap-start">
          <div className="bg-[#b4f46c] hover:bg-[#a2e25a] text-teal-950 rounded-xl p-4 h-[120px] flex flex-col items-center justify-center text-center transition-colors duration-200 cursor-pointer shadow-sm group">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm transition-transform duration-200 group-hover:translate-x-1">
              <span className="text-xs font-bold">→</span>
            </div>
            <span className="text-xs font-bold tracking-tight">See all</span>
          </div>
        </Link>
      </div>

    </section>
  );
}