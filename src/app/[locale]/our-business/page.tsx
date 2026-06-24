import { getAlternates, getSeoTitle } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import { OurBusinessOverview } from "./_components/OurBusinessOverview"
import { HttpGeneralResponse, OurBusinessProps } from "@/lib/types"
import { getPage } from "@/lib/api"
import { BannerBlock } from "@/components/block/BannerBlock"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"
import { Metadata } from "next"
import JsonLdRenderer from "@/components/global/JsonLdRenderer"

import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("business-solution")
  return {
    openGraph: {
      title: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_title_en,
      data?.meta?.seo_meta?.meta_title_id
    ),
      description: getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
    },
    alternates: getAlternates(locale, "/our-business"),
    title: getSeoTitle(locale, data),
    description: getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
  }
}

export default async function BusinessSolutionsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const data: HttpGeneralResponse<OurBusinessProps> =
    await getPage("business-solution")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <JsonLdRenderer
        meta={data?.meta}
        locale={locale as "en" | "id"}
        pageType="business-solution-overview"
      />
      <Navbar />

      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && data?.meta?.business_line && (
        <OurBusinessOverview
          intro={data?.meta?.intro}
          businessLine={data?.meta?.business_line}
        />
      )}
    </>
  )
}
