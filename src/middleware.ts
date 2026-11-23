import createMiddleware from "next-intl/middleware"
import { localePrefix, defaultLocale, locales, pathnames } from "./config"
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const pathnameLower = pathname.toLowerCase()

  // Protection for Flow Builder Admin: secret token or session cookie required
  if (pathnameLower.includes("/admin/flow-editor")) {
    const secretQuery = request.nextUrl.searchParams.get("secret")
    const secretCookie = request.cookies.get("flow_builder_auth")?.value
    const validSecret = process.env.FLOW_BUILDER_SECRET || "cap25-product-flow-secret-2026"

    const isAuthorized = (secretQuery && secretQuery === validSecret) || (secretCookie && secretCookie === validSecret)

    if (!isAuthorized) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const handleI18nRouting = createMiddleware({
      locales,
      defaultLocale,
      localePrefix,
      localeDetection: false,
    });
    const res = handleI18nRouting(request)

    // Store token in session cookie so admin can refresh freely
    if (secretQuery === validSecret && secretCookie !== validSecret) {
      res.cookies.set("flow_builder_auth", validSecret, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: "lax",
      })
    }

    res.headers.set("X-Content-Type-Options", "nosniff")
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    // Allow embedding in CMS iframe
    res.headers.set("Content-Security-Policy", "frame-ancestors 'self' http://localhost:8000 http://localhost:3000 https://*.chandra-asri.com;")
    return res
  }

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
