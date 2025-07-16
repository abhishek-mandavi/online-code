"use client";


import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector () {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>

      {/* hover state bg decorator */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />

      <span className="text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors">
        {currentTheme?.label}
      </span>

      {/* color indicator */}

      <div
        className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
        style={{ background: currentTheme?.color }}
      />

    </div>
  )
}

export default ThemeSelector