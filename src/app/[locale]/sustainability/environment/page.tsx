import { BannerBlock } from "@/components/block/BannerBlock"
import { IntroBlock } from "@/components/block/IntroBlock"
import { MockMetaCover, MockMetaIntro } from "@/components/block/mock"
import Navbar from "@/components/global/Navbar"
import { EnvironmentBenefit } from "./_components/EnvironmentBenefit"
import { EnvironmentPerformance } from "./_components/EnvironmentPerfornamce"
import { EnvironmentClimate } from "./_components/EnvironmentClimate"
import { EnvironmentIndonesiaAsri } from "./_components/EnvironmentIndonesiaAsri"
import { EnvironmentDecarbonation } from "./_components/EnvironmentDecarbonation"
import { EnvironmentCircular } from "./_components/EnvironmentCircular"
import { EnvironmentPageProps, HttpGeneralResponse } from "@/lib/types"
import { getPage } from "@/lib/api"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("environment-1")
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

export default async function SustainabilityEnvironmentPage() {
  const data: HttpGeneralResponse<EnvironmentPageProps> =
    await getPage("environment-1")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && <EnvironmentBenefit {...data?.meta.intro} />}
      {data?.meta?.in_numbers && (
        <EnvironmentPerformance {...data?.meta.in_numbers} />
      )}
      {data?.meta?.image_text && (
        <EnvironmentClimate {...data?.meta.image_text} />
      )}
      {data?.meta?.small_banner && (
        <EnvironmentIndonesiaAsri {...data?.meta.small_banner} />
      )}
      {data?.meta?.point && <EnvironmentDecarbonation {...data?.meta.point} />}
      {data?.meta?.point_image && (
        <EnvironmentCircular {...data?.meta.point_image} />
      )}
    </>
  )
}
