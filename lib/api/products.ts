import { endPoints } from "./endPoints";
import { Product } from "@/types";

function cleanImageUrl(url: string): string {
    if(typeof url !== "string" || !url.startsWith("http")) {
        return "/placeholder-image.png";
    }
    return url.replace(/[\[\]\"]/g, "");
}

/* >>> Checking loading.tsx

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
*/
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
        const res = await fetch(endPoints.products.featured(limit, 0), {
            next: {revalidate: 3600},
        }); 

        if(!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json(); 

        if(!Array.isArray(data)) return [];
        //await delay(3000);
        return data.map((item: any) => ({
            id: item.id,
            title: item.title || "Untitled Product",
            price: item.price,
            description: item.description || "",
            images: Array.isArray(item.images) 
                    ? item.images.map(cleanImageUrl) 
                    : ["/placeholder-box.png"],
            category: {
                id: item.category?.id || 0,
                name: item.category?.name || "Uncategorized",
                image: cleanImageUrl(item.category?.image),
            }
        }))
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
}

export async function getProductDetail(id: string): Promise<any> {
  try {
    const res = await fetch(endPoints.products.detail(Number(id)));
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


interface FilterParams {
  title?: string;
  price_min?: string;
  price_max?: string;
  categoryId?: string;
  offset?: string;
}

export async function getProducts(filters?: FilterParams, limit = 20): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    
    if (filters?.title) query.append("title", filters.title);
    if (filters?.price_min) query.append("price_min", filters.price_min);
    if (filters?.price_max) query.append("price_max", filters.price_max);
    if (filters?.categoryId) query.append("categoryId", filters.categoryId);
    const currentOffset = filters?.offset ? Number(filters.offset) : 0;

    const baseUrl = endPoints.products.featured(limit, currentOffset);
    const separator = baseUrl.includes("?") ? "&" : "?";
    const url = `${baseUrl}${separator}${query.toString()}`;
    
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch filtered products");
    
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title || "Untitled Product",
      price: item.price || 0,
      description: item.description || "",
      images: Array.isArray(item.images) 
              ? item.images.map(cleanImageUrl) 
              : ["/placeholder-box.png"],
      category: {
        id: item.category?.id || 0,
        name: item.category?.name || "Uncategorized",
        image: cleanImageUrl(item.category?.image),
      }
    }));
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return [];
  }
}