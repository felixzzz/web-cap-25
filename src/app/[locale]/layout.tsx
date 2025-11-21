import type { Metadata } from "next"
import { sharedMetadata } from "@/data/sharedMetadata"
// import { ThemeProvider } from "@/components/providers/theme-provider"
import { CursorProvider } from "@/components/providers/cursor-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, unstable_setRequestLocale } from "next-intl/server"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { plusJakartaSans } from "../fonts/fonts"
import { Footer } from "@/components/global/Footer"
import { locales } from "@/config"
import DownloadStorages from "@/components/global/DownloadStorages"
import { QueryClientProviderWrapper } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"
import { GoogleTagManager } from "@next/third-parties/google"
import { SITE_URL } from "@/lib/constant"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  ...sharedMetadata,
  // override here
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chandra Asri",
    alternateName: "Chandra Asri",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/img/brand/logo-chandra-asri.png`,
    sameAs: [
      "https://www.facebook.com/ChandraAsriGroup/",
      "https://www.instagram.com/chandraasri.id",
      "https://www.linkedin.com/company/pt-chandra-asri",
      "https://www.youtube.com/channel/UCoqBsqI8crt0OLCuD7f1UyQ",
      "https://x.com/ChandraasriID",
      "https://www.tiktok.com/@chandraasri.id",
    ],
  }

  const jsonLdWebsite = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Chandra Asri",
    url: `${SITE_URL}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId={process.env.GTM_ID || ""} />
      <body
        className={`${plusJakartaSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
          </ThemeProvider> */}
          <QueryClientProviderWrapper>
            <CursorProvider>
              {children}
              <Toaster />
            </CursorProvider>
            <Footer />
            <DownloadStorages />
          </QueryClientProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
