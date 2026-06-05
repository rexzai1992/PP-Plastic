const RECENTLY_VIEWED_STORAGE_KEY = "plastic-supply-pro:recently-viewed";
const MAX_RECENT_PRODUCTS = 4;
export const RECENT_PRODUCTS_UPDATED_EVENT = "plastic-supply-pro:recent-updated";

const EMPTY_RECENTLY_VIEWED_SLUGS: string[] = [];
let cachedRecentSlugsRaw: string | null = null;
let cachedRecentSlugs: string[] = EMPTY_RECENTLY_VIEWED_SLUGS;

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
    return EMPTY_RECENTLY_VIEWED_SLUGS;
  }

  const raw = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
  if (!raw) {
    cachedRecentSlugsRaw = raw;
    cachedRecentSlugs = EMPTY_RECENTLY_VIEWED_SLUGS;
    return cachedRecentSlugs;
  }

  if (raw === cachedRecentSlugsRaw) {
    return cachedRecentSlugs;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    cachedRecentSlugs = Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : EMPTY_RECENTLY_VIEWED_SLUGS;
  } catch {
    cachedRecentSlugs = EMPTY_RECENTLY_VIEWED_SLUGS;
  }

  cachedRecentSlugsRaw = raw;
  return cachedRecentSlugs;
}
