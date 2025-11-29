import Navbar from "@/components/global/Navbar"
import AwardsJumbotron from "./_components/AwardsJumbotron"
import AwardsAndRecognition from "./_components/AwardsAndRecognition"
import { getPage } from "@/lib/api"
import { AwardsProps, HttpGeneralResponse } from "@/lib/types"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("awards-and-recognition")
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

export default async function AwardsAndRecognitionPage() {
  const data: HttpGeneralResponse<AwardsProps> = await getPage(
    "awards-and-recognition"
  )
  return (
    <>
      <Navbar />
      {data?.meta?.banner && <AwardsJumbotron {...data?.meta.banner} />}
      {data?.meta?.awards && data?.meta?.certification && (
        <AwardsAndRecognition
          awards={{ ...data?.meta.awards }}
          certification={{ ...data?.meta.certification }}
        />
      )}
    </>
  )
}
