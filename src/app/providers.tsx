// d:\Physo\physiocare-plus\src\app\providers.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const darkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(darkScheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", darkScheme);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
