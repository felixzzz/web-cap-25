import { assetUrl } from "@/lib/utils"
import { Locale } from "./types"

export function pickText(
  locale: Locale,
  en?: string | null,
  id?: string | null
): string {
  if (locale === "id") {
    return id || en || ""
  }
  return en || id || ""
}

export function pickList(
  locale: Locale,
  en?: string[] | null,
  id?: string[] | null
): string[] {
  if (locale === "id") {
    return id && id.length > 0 ? id : en || []
  }
  return en && en.length > 0 ? en : id || []
}

export function resolveBlockImage(path?: string | null): string {
  if (!path) return "/img/placeholder.jpg"
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/img/") ||
    path.startsWith("/images/")
  ) {
    return path
  }
  return assetUrl(path) || "/img/placeholder.jpg"
}

export function resolveLocaleHref(locale: Locale, href?: string | null): string {
  if (!href) return "#"
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href
  }
  const normalized = href.startsWith("/") ? href : `/${href}`
  if (normalized.startsWith(`/${locale}/`) || normalized === `/${locale}`) {
    return normalized
  }
  return `/${locale}${normalized}`
}
