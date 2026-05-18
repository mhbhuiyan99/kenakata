import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="min-h-screen bg-gray-200 px-4">

      <section className="relative w-full h-[70vh] rounded-2xl bg-teal-900 text-white px-6 lg:px-16 overflow-hidden flex items-center"> 
        {/* Main Content Wrapper */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full relative z-10">
          
          {/* Left Side */}
          <div className="md:col-span-7 space-y-4 md:space-y-6 text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              We bring the store <br className="hidden sm:inline" />
              to your door
            </h1>
            
            <p className="text-teal-100/90 text-sm sm:text-base lg:text-lg max-w-xl font-medium leading-relaxed line-clamp-3 md:line-clamp-none">
              Get premium sports gear, trending apparel, and essential lifestyle accessories 
              delivered right to your doorstep. Access the absolute best products for your daily routine.
            </p>
            
            <div className="pt-1">
              <Link href="/products">
                <button className="bg-[#b4f46c] text-teal-950 text-sm sm:text-base font-bold px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full shadow-lg cursor-pointer hover:scale-95">
                  Shop now
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Standalone Bag Image */}
          <div className="md:col-span-5 w-full flex justify-center md:justify-end order-1 md:order-2">
            {/* - `h-[30vh] md:h-[45vh]`: Constrains the image asset scale contextually 
                so it never expands past the background banner boundaries.
            */}
            <div className="relative w-full max-w-[320px] sm:max-w-95 md:max-w-110 h-[30vh] md:h-[45vh]">
              <Image
                src="/hero-bag.png" // <-- Swap this with your green bag transparent file path
                alt="Kenakata Premium Shopping Bag"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-w: 768px) 100vw, 40vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Categories area below */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        {/* Day 2 features mapping goes here */}
      </section>
    </main>
  );
}