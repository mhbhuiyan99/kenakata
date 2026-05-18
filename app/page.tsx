import CategoriesGrid from "@/components/home/CategoriesGrid";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-200">
      <Hero/>
      <CategoriesGrid/>
      <Products/>
    </main>
  )
}