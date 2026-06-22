import { SITE_URL } from "./constant"
import { Metadata } from "next"

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
