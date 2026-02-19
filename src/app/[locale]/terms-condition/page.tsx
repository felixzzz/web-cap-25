import Navbar from "@/components/global/Navbar"
import ContentBlock from "@/components/block/ContentBlock"
import { getPage } from "@/lib/api"
import { HttpGeneralResponse } from "@/lib/types"
import { Metadata } from "next"
import { MetaContentBlock } from "@/lib/fragment"
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
  const data = await getPage("terms-condition")
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

export default async function TermsAndConditionPage() {
  const data: HttpGeneralResponse<{ terms_content: MetaContentBlock }> =
    await getPage("terms-condition")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar isBackgroundWhite />
      <ContentBlock {...data?.meta?.terms_content} />
    </>
  )
}
