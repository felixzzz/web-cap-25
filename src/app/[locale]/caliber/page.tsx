import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage, getPostList } from "@/lib/api"
import {
  EventPageProps,
  DynamicProps,
  HttpGeneralResponse,
  PaginationHandlerResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import RelatedArticles from "../our-business/_components/RelatedArticles"
import { Post } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import ContentTab from "../our-business/_components/ContentTab"
import ResponsibilityTitle from "../sustainability/product-responsibility/_components/ResponsibilityTitle"
import ResponsibilityList from "../sustainability/product-responsibility/_components/ResponsibilityList"
import PracticeContent from "../sustainability/_components/PracticeContent"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: { business_line: string; locale: "en" | "id" }
}) {
  const data: HttpGeneralResponse<EventPageProps> =
    await getPage("event")
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

export default async function Event({
  params,
}: {
  params: { business_line: string; locale: "en" | "id" }
}) {
  const data: HttpGeneralResponse<EventPageProps> =
    await getPage("event")

  if (!data) {
    return notFound()
  }

  return (
    <>
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      <PracticeContent
        top_content={data?.meta?.content_left_image}
        bottom_content={data?.meta?.content_point}
      />
      {data?.meta?.content_left_right && (
        <ContentLeftRightBlock {...data?.meta.content_left_right} />
      )}
      {data?.meta?.icon_list_horizontal && (
        <IconListhorizontalBlock {...data?.meta.icon_list_horizontal} />
      )}
      {data?.meta?.content_left_right_2 && (
        <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
      )}
      {data?.meta?.contant_tab && <ContentTab {...data?.meta.contant_tab} />}
      {data?.meta?.small_banner && (
        <SmallBannerBlock {...data?.meta.small_banner} />
      )}
      {/* {news?.data.length > 0 && data?.meta?.news && (
        <RelatedArticles posts={news?.data} {...data?.meta.news} />
        )} */}
        {data?.meta.news && (
          <RelatedArticles posts={[]} {...data.meta.news} />
        )}
    </>
  )
}
