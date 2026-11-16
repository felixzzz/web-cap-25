import createMiddleware from "next-intl/middleware"
import { localePrefix, defaultLocale, locales, pathnames } from "./config"
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // 1. Redirect duplicated or misplaced language segment in /our-business/ (SEO 301)
  // Examples:
  // - /id/our-business/id/energy -> /id/our-business/energy
  // - /en/our-business/id/solusi-infrastruktur -> /en/our-business/solusi-infrastruktur
  // - /our-business/id/energy -> /id/our-business/energy
  const duplicatedLangRegex = /^\/(id|en)\/our-business(?:\/(?:id|en))+(\/.*)?$/i
  const dupMatch = pathname.match(duplicatedLangRegex)
  if (dupMatch) {
    const lang = dupMatch[1].toLowerCase()
    const rest = dupMatch[2] ? (dupMatch[2] === "/" ? "" : dupMatch[2]) : ""
    const url = request.nextUrl.clone()
    url.pathname = `/${lang}/our-business${rest}`.toLowerCase()
    return NextResponse.redirect(url, {
      status: 301,
    })
  }

  const noPrefixLangRegex = /^\/our-business\/(id|en)(\/.*)?$/i
  const noPrefixMatch = pathname.match(noPrefixLangRegex)
  if (noPrefixMatch) {
    const lang = noPrefixMatch[1].toLowerCase()
    const rest = noPrefixMatch[2] ? (noPrefixMatch[2] === "/" ? "" : noPrefixMatch[2]) : ""
    const url = request.nextUrl.clone()
    url.pathname = `/${lang}/our-business${rest}`.toLowerCase()
    return NextResponse.redirect(url, {
      status: 301,
    })
  }

  // 2. Normalize uppercase to lowercase
  if (/[A-Z]/.test(pathname)) {
    const url = new URL(request.nextUrl.pathname.toLowerCase(), request.url)
    if (search) {
      url.search = search
    }
    return NextResponse.redirect(url, {
      status: 301,
    })
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  // Security headers defense-in-depth
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.delete("x-powered-by")
  response.headers.delete("X-Powered-By")

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|icons|img|robots|sitemap|llms).*)",
  ],
};


