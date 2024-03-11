"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      <Within
        toggled={theme === "dark"}
        toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        duration={750}
        placeholder={theme}
        className="text-3xl"
      />
    </div>
  );
}
