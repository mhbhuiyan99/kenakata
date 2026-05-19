"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider 
      attribute="class" 
      defaultTheme="light" // Defaulting safely to light mode first
      enableSystem={false}  // Disabling system-check to prevent mismatched values on load
    >
      {children}
    </NextThemeProvider>
  );
}