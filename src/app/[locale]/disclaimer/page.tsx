import Navbar from "@/components/global/Navbar"
import DisclaimerContent from "./_components/DisclaimerContent"
import { getPage } from "@/lib/api"
import { DisclaimerProps, HttpGeneralResponse } from "@/lib/types"
import CopyrightContent from "./_components/CopyrightContent"
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
  const data = await getPage("disclaimer")
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

export default async function DisclaimerPage() {
  const data: HttpGeneralResponse<DisclaimerProps> = await getPage("disclaimer")
  return (
    <>
      <Navbar isBackgroundWhite />
      <section className="container pb-10 pt-[96px] lg:px-[109px] lg:pb-[80px] lg:pt-[128px]">
        <DisclaimerContent {...data?.meta.disclaimer_content} />
        <CopyrightContent {...data?.meta.copyright_content} />
      </section>
    </>
  )
}
