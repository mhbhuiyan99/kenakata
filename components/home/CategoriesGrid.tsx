import Link from "next/link";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  image: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories?limit=5`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

export default async function CategoriesGrid() {
  const categories = await getCategories();

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
      <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 pb-4 md:pb-0 scrollbar-none snap-x items-stretch">
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="min-w-[170px] sm:min-w-[200px] md:min-w-full shrink-0 md:shrink snap-start group"
          >
            {/* Main Card Box Frame */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 transition-all duration-200 flex flex-col justify-between h-[120px] relative overflow-hidden">
              
              {/* Text Area Label Stack */}
              <div className="z-10 max-w-[65%] text-left">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight tracking-tight line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  In store delivery
                </p>
              </div>

              {/* 3. FIXED: Moved the Image block INSIDE the white relative container card */}
              <div className="absolute right-2 bottom-2 w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-w: 768px) 56px, 64px"
                />
              </div>

            </div>
          </Link>
        ))}

        {/* See All Action Card Element Anchor */}
        <Link href="/categories" className="min-w-[100px] sm:min-w-[120px] md:min-w-full shrink-0 md:shrink snap-start">
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


/*
   
              {/* Bottom-Right Corner Graphic Placement 
              <div className="absolute right-2 bottom-2 w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain object-bottom right-0"
                  sizes="(max-w: 768px) 56px, 64px"
                />
              </div>

            </div>
          </Link>
        ))}

        {/* The green "See all" action card anchor on the far right *
        <Link 
          href="/categories" 
          className="min-w-[100px] sm:min-w-[120px] md:min-w-0 flex-shrink-0 snap-start"
        >
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
*/
