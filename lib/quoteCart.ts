const RECENTLY_VIEWED_STORAGE_KEY = "plastic-supply-pro:recently-viewed";
const MAX_RECENT_PRODUCTS = 4;
export const RECENT_PRODUCTS_UPDATED_EVENT = "plastic-supply-pro:recent-updated";

export function saveRecentlyViewedProduct(slug: string) {
  if (typeof window === "undefined") {
    return;
  }

  const nextItems = [
    slug,
    ...getRecentlyViewedProductSlugs().filter((item) => item !== slug),
  ].slice(0, MAX_RECENT_PRODUCTS);

  window.localStorage.setItem(
    RECENTLY_VIEWED_STORAGE_KEY,
    JSON.stringify(nextItems),
  );
  window.dispatchEvent(new Event(RECENT_PRODUCTS_UPDATED_EVENT));
}

export function getRecentlyViewedProductSlugs() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  const raw = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
  if (!raw) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [] as string[];
  }
}
