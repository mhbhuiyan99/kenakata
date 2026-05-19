"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true only after the component runs on the client browser
  useEffect(() => {
    setMounted(true);
  }, []);

  //  Render a safe plain placeholder button on the server side.
  // This guarantees the server and client match 100% on initial render!
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-white border border-slate-200" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 cursor-pointer focus:outline-none transition-colors shadow-sm flex items-center justify-center w-9 h-9"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-yellow-500" strokeWidth={2.5} />
      ) : (
        <Moon size={18} className="text-slate-700" strokeWidth={2.5} />
      )}
    </button>
  );
}