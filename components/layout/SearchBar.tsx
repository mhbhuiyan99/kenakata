"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial value from URL
  const initialQuery = searchParams.get("title") || "";
  const [query, setQuery] = useState(initialQuery);
  
  // Keep track of what is currently applied in the URL to prevent double pushing
  const lastAppliedQueryRef = useRef(initialQuery);

  // Sync state if filters are cleared from elsewhere (like the sidebar reset)
  useEffect(() => {
    const currentUrlQuery = searchParams.get("title") || "";
    setQuery(currentUrlQuery);
    lastAppliedQueryRef.current = currentUrlQuery;
  }, [searchParams]);

  // Debounced URL updates
  useEffect(() => {
    // If the input matches what's already in the URL, do nothing!
    if (query.trim() === lastAppliedQueryRef.current) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmedQuery = query.trim();
      
      if (trimmedQuery) {
        params.set("title", trimmedQuery);
      } else {
        params.delete("title");
      }
      
      params.delete("offset"); // Reset pagination if searching

      // Update our ref tracker before pushing to stop the infinite sync loop
      lastAppliedQueryRef.current = trimmedQuery;
      
      router.push(`/products?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="w-full relative flex items-center">
      <input
        type="text"
        placeholder="Search for Grocery, Stores..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-gray-800 bg-gray-200 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-1 focus:ring-slate-100"
      />
      
      <Search size={16} className="absolute left-3 text-gray-400" />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center border-none bg-transparent outline-none"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}