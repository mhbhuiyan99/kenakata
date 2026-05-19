import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <CategoriesGrid/>
      <FeaturedProducts/>
    </main>
  )
}