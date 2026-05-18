import { endPoints } from "./endPoints";
import { Category, Product } from "@/types";

function cleanImageUrl(url: string): string {
  if (typeof url !== "string" || !url.startsWith("http")) return "/placeholder-box.png";
  return url.replace(/[\[\]\"]/g, "");
}

export async function getCategories(limit = 5): Promise<Category[]> {
  try {
    const res = await fetch(endPoints.categories.list(limit), {
      next: { revalidate: 3600 }, 
    });
    
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.id,
      name: item.name || "Category",
      image: cleanImageUrl(item.image),
    }));
  } catch (error) {
    console.error("Error in categories fetcher layer:", error);
    return [];
  }
}

export async function getCategoryProducts(categoryId: number): Promise<Product[]> {
  try {
    const res = await fetch(endPoints.categories.products(categoryId), {
      next: { revalidate: 3600 }, 
    });
    
    if (!res.ok) throw new Error("Failed to fetch category products");
    const data = await res.json();
    
    if (!Array.isArray(data)) return [];
    
    return data.map((item: any) => ({
      id: item.id,
      title: item.title || "Untitled Product",
      price: item.price || 0,
      description: item.description || "No description available.",
      images: Array.isArray(item.images) ? item.images.map(cleanImageUrl) : ["/placeholder-box.png"],
      category: {
        id: item.category?.id || 0,
        name: item.category?.name || "Unknown Category",
        image: cleanImageUrl(item.category?.image || ""),
      }
    }));
  } catch (error) {
    console.error("Error in category products fetcher layer:", error);
    return [];
  }
}