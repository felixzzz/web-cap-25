export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://cap.test"

// For client-side, we must use the externally accessible URL (NEXT_PUBLIC_API_URL).
// For server-side (SSR), we can use the internal Docker service name (API_URL).
export const API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://canasite.cap.test"
    : process.env.API_URL || "http://chandra-asri-cms:8000"

export const IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL ?? process.env.IMAGE_URL ?? "http://localhost:8000/storage"
