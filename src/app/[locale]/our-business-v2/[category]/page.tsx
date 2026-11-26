import { Metadata } from "next"
import { notFound } from "next/navigation"
import Navbar from "@/components/global/Navbar"
import JsonLdRenderer from "@/components/global/JsonLdRenderer"
import { PageIdSetter } from "@/components/providers/query-provider"
import { BlockRenderer } from "@/components/blocks-v2/BlockRenderer"
import {
  getComponentPageData,
  OurBusinessV2Slug,
} from "@/components/blocks-v2/fallbackData"
import { Locale } from "@/components/blocks-v2/types"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"

export const revalidate = 60

const CATEGORY_SLUG_MAP: Record<string, OurBusinessV2Slug> = {
  "energy-and-chemicals": "our-business-v2-energy-and-chemicals",
  infrastructure: "our-business-v2-infrastructure",
  "mobility-solutions": "our-business-v2-mobility-solutions",
  "shared-service": "our-business-v2-shared-service",
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_SLUG_MAP).map((category) => ({ category }))
}

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: Locale; category: string }
}): Promise<Metadata> {
  const pageSlug = CATEGORY_SLUG_MAP[category]
  if (!pageSlug) {
    return { robots: { index: false, follow: false } }
  }

  const { cmsPage, fallback } = await getComponentPageData(pageSlug)

  const title =
    getLocalizedContent(
      locale,
      cmsPage?.meta?.seo_meta?.meta_title_en,
      cmsPage?.meta?.seo_meta?.meta_title_id
    ) || (locale === "id" ? fallback.title_id : fallback.title_en)

  const description =
    getLocalizedDescription(
      locale,
      cmsPage?.meta?.seo_meta?.meta_desc_en,
      cmsPage?.meta?.seo_meta?.meta_desc_id
    ) || (locale === "id" ? fallback.description_id : fallback.description_en)

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
    },
  }
}

export default async function OurBusinessV2CategoryPage({
  params: { locale, category },
}: {
  params: { locale: Locale; category: string }
}) {
  const pageSlug = CATEGORY_SLUG_MAP[category]
  if (!pageSlug) {
    return notFound()
  }

  const { cmsPage, blocks } = await getComponentPageData(pageSlug)

  return (
    <>
      {cmsPage?.id && <PageIdSetter id={cmsPage.id.toString()} />}
      {cmsPage?.meta && (
        <JsonLdRenderer
          meta={cmsPage.meta}
          locale={locale}
          pageType="business-line"
        />
      )}
      <Navbar />
      <main>
        <BlockRenderer blocks={blocks} locale={locale} />
      </main>
    </>
  )
}
