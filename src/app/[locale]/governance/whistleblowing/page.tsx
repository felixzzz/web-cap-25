import Navbar from "@/components/global/Navbar"
import WhistleblowingForm from "./_components/WhistleblowingForm"
import { getDetailPost, getPage } from "@/lib/api"
import { HttpGeneralResponse, WhistleblowingProps } from "@/lib/types"
import { MetaTopics } from "@/lib/fragment"
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
  const data = await getPage("whistleblowing")
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

export default async function WhistleblowingPage() {
  const data: HttpGeneralResponse<WhistleblowingProps> =
    await getPage("whistleblowing")
  const dataTopics: MetaTopics[] = await getDetailPost(
    "categories?sort=id&order=ASC&type=whistleblowing"
  )

  return (
    <>
      <div className="mt-16">
        <Navbar isBackgroundWhite />
        {data?.meta?.banner && (
          <WhistleblowingForm {...data?.meta.banner} topics={dataTopics} />
        )}
      </div>
    </>
  )
}
