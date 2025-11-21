import { Pathnames, LocalePrefix } from "next-intl/routing"

export type Locale = (typeof locales)[number]

export const defaultLocale = "en" as const
export const locales = ["id", "en"] as const

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/about/who-we-are": "/about/who-we-are",
  "/about/awards-and-recognition": "/about/awards-and-recognition",
  "/about/management-and-structure": "/about/management-and-structure",
  "/contact-us": "/contact-us",
  "/cookies-consent": "/cookies-consent",
  "/disclaimer": "/disclaimer",
  "/governance": "/governance",
  "/investor": "/investor",
  "/investor/publication": "/investor/publication",
  "/investor/reports": "/investor/reports",
  "/investor/stocks-and-bonds": "/investor/stocks-and-bonds",
  "/news": "/news",
  "/our-business/chemical-solutions": "/our-business/chemical-solutions",
  "/our-business": "/our-business",
  "/privacy-policy": "/privacy-policy",
  "/sustainability": "/sustainability",
  "/sustainability/social": "/sustainability/social",
  "/sustainability/reports-and-publications":
    "/sustainability/reports-and-publications",
  "/sustainability/governance": "/sustainability/governance",
  "/sustainability/sustainability-in-action": "/sustainability/sustainability-in-action",
  "/sustainability/environment": "/sustainability/environment",
  "/terms-condition": "/terms-condition",
  "/caliber": "/caliber",
}

export const localePrefix: LocalePrefix<typeof locales> = "always"
