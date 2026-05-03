"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    // Enable the transition class for smooth switching
    document.documentElement.classList.add("theme-transition");

    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Belt-and-suspenders: set background directly to defeat any CSS specificity issues
    const bg = next === "dark" ? "#000000" : "#f8fafc";
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;

    setTheme(next);
    localStorage.setItem("theme", next);

    // Remove the transition class after animation completes to avoid
    // interfering with other transitions (e.g. hover effects)
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 450); // Matches 400ms transition + 50ms buffer
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
