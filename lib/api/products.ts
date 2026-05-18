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