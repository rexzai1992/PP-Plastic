"use client";

import { useLanguage } from "@/components/LanguageProvider";

interface LocalizedTextProps {
  en: string;
  bm: string;
}

export function LocalizedText({ en, bm }: LocalizedTextProps) {
  const { language } = useLanguage();

  return <>{language === "bm" ? bm : en}</>;
}
