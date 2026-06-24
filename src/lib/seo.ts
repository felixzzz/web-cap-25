import { SITE_URL } from "./constant"
import { Metadata } from "next"
import { stripHtml } from "./utils"

export function getAlternates(locale: string, path: string): Metadata["alternates"] {
  // Ensure path starts with a slash if not empty and does not end with a slash unless it's just '/'
  let cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : ""
  if (cleanPath.endsWith("/") && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1)
  }
  if (cleanPath === "/") {
    cleanPath = ""
  }

  return {
    canonical: `${SITE_URL}/${locale}${cleanPath}`,
    languages: {
      id: `${SITE_URL}/id${cleanPath}`,
      en: `${SITE_URL}/en${cleanPath}`,
      "x-default": `${SITE_URL}/en${cleanPath}`,
    },
  }
}

export function getSeoTitle(
  locale: string,
  data?: any,
  fallbackTitle?: string
): Metadata["title"] {
  const seoMeta = data?.meta?.seo_meta;
  const metaTitle = locale === "id"
    ? seoMeta?.meta_title_id
    : seoMeta?.meta_title_en;

  if (metaTitle && metaTitle.trim() !== "") {
    return {
      absolute: stripHtml(metaTitle),
    };
  }

  if (fallbackTitle) {
    return stripHtml(fallbackTitle);
  }

  const resolvedFallback = locale === "id"
    ? (data?.meta?.banner?.title_id || data?.title || data?.name)
    : (data?.meta?.banner?.title_en || data?.title || data?.name);

  return resolvedFallback ? stripHtml(resolvedFallback) : undefined;
}

