export type Language = "en" | "bm";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "rr-plastic:language";

export function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "bm";
}

export function textFor<T>(language: Language, copy: Record<Language, T>): T {
  return copy[language];
}
