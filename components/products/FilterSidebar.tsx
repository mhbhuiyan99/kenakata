"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategories } from "@/lib/api/categories"; // 🚀 Imported from your exact categories file!
import { Category } from "@/types";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [minPrice, setMinPrice] = useState(searchParams.get("price_min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price_max") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories(10);
        setCategories(data);
      } catch (err) {
        console.error("Failed loading sidebar categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    setMinPrice(searchParams.get("price_min") || "");
    setMaxPrice(searchParams.get("price_max") || "");
    setCategoryId(searchParams.get("categoryId") || "");
    setSortOrder(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleCategoryToggle = (id: string) => {
    // If the category is clicked again, unselect it to show all products
    setCategoryId(categoryId === id ? "" : id);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) params.set("price_min", minPrice);
    else params.delete("price_min");

    if (maxPrice) params.set("price_max", maxPrice);
    else params.delete("price_max");

    if (categoryId) params.set("categoryId", categoryId);
    else params.delete("categoryId");

    if (sortOrder) params.set("sort", sortOrder);
    else params.delete("sort");

    router.push(`/products?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    setSortOrder("");
    router.push("/products");
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 text-left h-fit sticky top-6">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Filters</h3>
        <p className="text-xs text-slate-400 mt-0.5">Refine your product search</p>
      </div>

      <div className="w-full h-px bg-slate-100" />

      {/* Sort Filter Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Sort By
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2.5 px-3 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 cursor-pointer"
        >
          <option value="">Default Listing</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Input Range Fields */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Price Range ($)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2 px-3 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200"
          />
          <span className="text-slate-300 font-medium">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2 px-3 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200"
          />
        </div>
      </div>

      {/* Dynamic Category Selection List */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Categories
        </label>
        
        {loadingCategories ? (
          <div className="space-y-2 pt-1 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {categories.map((cat) => {
              const stringId = String(cat.id);
              const isChecked = categoryId === stringId;
              return (
                <label key={cat.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(stringId)}
                    className="w-4 h-4 text-teal-900 accent-teal-900 cursor-pointer rounded"
                  />
                  <span className={isChecked ? "font-bold text-teal-900" : ""}>
                    {cat.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions Segment */}
      <div className="pt-2 space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-teal-900 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md hover:bg-[#b4f46c] hover:text-teal-950 transition-all text-sm cursor-pointer"
        >
          Apply Filters
        </button>

        {searchParams.toString() && (
          <button
            onClick={handleClearFilters}
            className="w-full text-xs text-slate-400 hover:text-slate-600 font-medium underline text-center block cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}