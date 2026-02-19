import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import { SustainabilityResponsible } from "./_components/SustainabilityResponsible"
import { SustainabilityRecognition } from "./_components/SustainabilityRecognition"
import { HttpGeneralResponse, SustainabilityProps } from "@/lib/types"
import { getPage } from "@/lib/api"
import { IntroContentImageBlock } from "@/components/block/IntroContentImage"
import { getLocalizedContent } from "@/lib/utils"
import { Metadata } from "next"

import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("sustainability")
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

export default async function SustainabilityPage() {
  const data: HttpGeneralResponse<SustainabilityProps> =
    await getPage("sustainability")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && (
        <IntroContentImageBlock {...data?.meta.intro} reverse />
      )}
      {data?.meta?.framework && (
        <SustainabilityResponsible {...data?.meta.framework} />
      )}
      {data?.meta?.evaluation && (
        <SustainabilityRecognition {...data?.meta.evaluation} />
      )}
    </>
  )
}
