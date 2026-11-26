import { Metadata } from "next"
import Navbar from "@/components/global/Navbar"
import JsonLdRenderer from "@/components/global/JsonLdRenderer"
import { PageIdSetter } from "@/components/providers/query-provider"
import { BlockRenderer } from "@/components/blocks-v2/BlockRenderer"
import { getComponentPageData } from "@/components/blocks-v2/fallbackData"
import { Locale } from "@/components/blocks-v2/types"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const { cmsPage, fallback } = await getComponentPageData("our-business-v2")

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

export default async function OurBusinessV2Page({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const { cmsPage, blocks } = await getComponentPageData("our-business-v2")

  return (
    <>
      {cmsPage?.id && <PageIdSetter id={cmsPage.id.toString()} />}
      {cmsPage?.meta && (
        <JsonLdRenderer
          meta={cmsPage.meta}
          locale={locale}
          pageType="business-solution-overview"
        />
      )}
      <Navbar />
      <main>
        <BlockRenderer blocks={blocks} locale={locale} />
      </main>
    </>
  )
}
