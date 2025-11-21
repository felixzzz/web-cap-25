import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import { SocialCategory } from "../_components/SocialCategory"
import { SocialData } from "../_components/SocialData"
import { SocialHuman } from "../_components/SocialHuman"
import { SocialPractices } from "../_components/SocialPractices"
import { SocialProductResponsibility } from "../_components/SocialProductResponsibility"
import { HttpGeneralResponse, SocialPageProps } from "@/lib/types"
import { getPage } from "@/lib/api"
import SocialHumanRight from "../_components/SocialHumanRight"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"
import SocialProgram from "../_components/SocialProgram"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("social")
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

export default async function RootPage() {
  const data: HttpGeneralResponse<SocialPageProps> = await getPage("social")

  return (
    <>
      <Navbar />

      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && <SocialCategory {...data?.meta.intro} />}
      {data?.meta?.partnership_progrem && (
        <SocialProgram {...data?.meta?.partnership_progrem} />
      )}
      {data?.meta?.in_numbers && <SocialData {...data?.meta.in_numbers} />}
      {data?.meta?.image_text && <SocialHuman {...data?.meta.image_text} />}
      {data?.meta?.human_right && (
        <SocialHumanRight {...data?.meta.human_right} />
      )}
      {data?.meta?.point && <SocialPractices {...data?.meta.point} />}
      {data?.meta?.point_image && (
        <SocialProductResponsibility {...data?.meta.point_image} />
      )}
    </>
  )
}
