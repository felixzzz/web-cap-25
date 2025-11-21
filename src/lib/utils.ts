import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL, IMAGE_URL, SITE_URL } from "./constant"
import { parseISO, format } from "date-fns"
import { enUS } from "date-fns/locale"
import { ReadonlyURLSearchParams } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function assetUrl(path: string | null) {
  if (!path || (path?.includes("http") && !path?.includes(SITE_URL)))
    return path
  // if (path.includes("documents")) return `${API_URL}/${path}`
  if (path?.includes(SITE_URL)) return path?.split(SITE_URL)[1]
  return `${IMAGE_URL}/${path}`
}

export const isContentActive = (
  locale: string,
  status_en: string | null,
  status_id: string | null
) => {
  return (
    (locale === "en" && status_en === "active") ||
    (locale === "id" && status_id === "active")
  )
}

export const getLocalizedContent = <T = unknown>(
  locale: string,
  enContent: T,
  idContent: T
) => {
  return locale === "en" ? enContent! : idContent!
}

export function dateFormater(date: string, formatDate: string = "dd-MM-yyyy") {
  if (date) {
    return format(parseISO(date), formatDate)
  }

  return "-"
}

export async function adjustSearchParams(
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  key: string,
  value: string | string[],
  isScrolling: boolean = false
): Promise<boolean> {
  const newParams = new URLSearchParams(searchParams.toString())

  if (Array.isArray(value)) {
    newParams.delete(key)

    value.forEach((val) => {
      newParams.append(key, val)
    })
  } else {
    if (value === "") {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
  }

  router.push(`?${newParams.toString()}`, {
    scroll: isScrolling ? true : false,
  })

  return true
}

export const scrollToElement = (id: string, offset = 0) => {
  const element = document.getElementById(id)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

export function isFullUrl(url: string): boolean {
  const urlPattern = /^(https?:\/\/)/i
  return urlPattern.test(url)
}

export function dateFormatter(
  date: string = new Date().toString(),
  dateFormat: string = "d/M/yyyy"
) {
  return format(new Date(date), dateFormat, { locale: enUS })
}

export const capitalizeText = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export const strToBoolean = (str: string) => {
  if (str?.toString()?.toLowerCase() === "true") return true
  return false
}

export const urlEncodedString = (params: Record<string, any>) => {
  const filteredObj = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  )

  return new URLSearchParams(filteredObj).toString()
}

export const getFileUrlExtension = (file: string): "pdf" | "zip" | "rar" => {
  const extension = file?.split(".").pop() || "pdf"

  if (["pdf", "zip", "rar"].includes(extension)) {
    return extension as "pdf" | "zip" | "rar"
  }

  return "pdf"
}

export function objectToQueryParams(obj: { [key: string]: any }): string {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&")
}
