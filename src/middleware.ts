import createMiddleware from "next-intl/middleware"
import { localePrefix, defaultLocale, locales, pathnames } from "./config"
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
    localeDetection: false,
  });
  const response = handleI18nRouting(request);
  const { pathname, search } = request.nextUrl

  if (/[A-Z]/.test(pathname)) {
    const url = new URL(request.nextUrl.pathname.toLowerCase(), request.url)
    if (search) {
      url.search = search
    }
    return NextResponse.redirect(url, {
      status: 301,
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|icons|img|robots|sitemap).*)",
  ],
};

