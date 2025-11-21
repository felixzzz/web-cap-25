import Navbar from "@/components/global/Navbar"
import ContentBlock from "@/components/block/ContentBlock"
import { getPage } from "@/lib/api"
import { HttpGeneralResponse } from "@/lib/types"
import { Metadata } from "next"
import { MetaContentBlock } from "@/lib/fragment"
import { getLocalizedContent } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("privacy-policy")
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

export default async function PrivacyPolicyPage() {
  const data: HttpGeneralResponse<{ privacy_content: MetaContentBlock }> =
    await getPage("privacy-policy")
  return (
    <>
      <Navbar isBackgroundWhite />
      <ContentBlock {...data?.meta?.privacy_content} />
    </>
  )
}
