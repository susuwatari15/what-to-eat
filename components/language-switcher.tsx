"use client"

import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/translations"

interface LanguageSwitcherProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onLanguageChange("en")}
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        className="text-xs font-medium"
      >
        English
      </Button>
      <Button
        onClick={() => onLanguageChange("vi")}
        variant={language === "vi" ? "default" : "outline"}
        size="sm"
        className="text-xs font-medium"
      >
        Tiếng Việt
      </Button>
    </div>
  )
}
