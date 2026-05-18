// lib/api/categories.ts
import { endPoints } from "./endPoints";
import { Category } from "@/types";

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