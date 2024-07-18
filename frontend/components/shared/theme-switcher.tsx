"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToogle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-4" onClick={handleToogle}>
      <Button isIconOnly variant="light">
        <Expand
          toggled={theme === "dark"}
          toggle={handleToogle}
          duration={750}
          placeholder={theme}
          className="text-3xl text-slate-800 dark:text-white"
        />
      </Button>
      <p className="text-medium">Cambiar tema</p>
    </div>
  );
}
