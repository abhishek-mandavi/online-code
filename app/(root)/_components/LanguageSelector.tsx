"use client";

import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const mounted = useMounted();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { language, setLanguage } = useCodeEditorStore();
  const currentLanguage = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;
    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
          rounded-lg border border-gray-800/50 hover:border-gray-700 transition-all duration-200
          ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={currentLanguage.logoPath}
            alt={`${currentLanguage.label} logo`}
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>

        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentLanguage.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-transform group-hover:text-gray-300 
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
              rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Language</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto">
              {Object.values(LANGUAGE_CONFIG).map((lang, i) => {
                const isLocked = !hasAccess && lang.id !== "javascript";
                const isSelected = language === lang.id;

                return (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-2"
                  >
                    <button
                      onClick={() => handleSelect(lang.id)}
                      disabled={isLocked}
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                        transition-all duration-200 group
                        ${isSelected ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                        ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className={`relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                        ${isSelected ? "bg-blue-500/10" : "bg-gray-800/50"}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image
                          src={lang.logoPath}
                          alt={`${lang.label} logo`}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>

                      <span className="flex-1 text-left group-hover:text-white transition-colors">
                        {lang.label}
                      </span>

                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : isSelected ? (
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      ) : null}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
