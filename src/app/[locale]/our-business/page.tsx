import Navbar from "@/components/global/Navbar"
import { OurBusinessOverview } from "./_components/OurBusinessOverview"
import { HttpGeneralResponse, OurBusinessProps } from "@/lib/types"
import { getPage } from "@/lib/api"
import { BannerBlock } from "@/components/block/BannerBlock"
import { getLocalizedContent } from "@/lib/utils"
import { Metadata } from "next"

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
    title: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_title_en,
      data?.meta?.seo_meta?.meta_title_id
    ),
    description: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
  }
}

export default async function BusinessSolutionsPage() {
  const data: HttpGeneralResponse<OurBusinessProps> =
    await getPage("business-solution")

  return (
    <>
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
