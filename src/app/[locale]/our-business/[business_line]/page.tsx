import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage, getPostList } from "@/lib/api"
import {
  BusinessSolutionsProp,
  DynamicProps,
  HttpGeneralResponse,
  PaginationHandlerResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import RelatedArticles from "../_components/RelatedArticles"
import { Post } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import ContentTab from "../_components/ContentTab"
import { PageIdSetter } from "@/components/providers/query-provider"

export async function generateStaticParams() {
  const business: DynamicProps[] = await getPage("dynamic")

  return business.map((business) => {
    return { business_line: business.slug }
  })
}

export const revalidate = 60

export async function generateMetadata({
  params: { business_line, locale },
}: {
  params: { business_line: string; locale: "en" | "id" }
}) {
  const data: HttpGeneralResponse<BusinessSolutionsProp> =
    await getPage(business_line)
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

export default async function BusinessLineProducts({
  params,
}: {
  params: { business_line: string; locale: "en" | "id" }
}) {
  const { business_line } = params
  const data: HttpGeneralResponse<BusinessSolutionsProp> =
    await getPage(business_line)
  const news: PaginationHandlerResponse<Post[]> = await getPostList(
    `?limit=3&lang=${params.locale}&page=1&sort=id&order=DESC&type=news&post_type=${business_line}`
  )

  if (!data) {
    return notFound()
  }

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.content_left_right && (
        <ContentLeftRightBlock {...data?.meta.content_left_right} />
      )}
      {data?.meta?.icon_list_horizontal && (
        <IconListhorizontalBlock {...data?.meta.icon_list_horizontal} />
      )}
      {data?.meta?.content_left_right_2 && (
        <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
      )}
      {isContentActive(
        params.locale,
        data?.meta?.contant_tab?.status_en,
        data?.meta?.contant_tab?.status_id
      ) && <ContentTab {...data?.meta.contant_tab} />}
      {data?.meta?.small_banner && (
        <SmallBannerBlock {...data?.meta.small_banner} />
      )}
      {/* {news?.data.length > 0 && data?.meta?.news && (
        <RelatedArticles posts={news?.data} {...data?.meta.news} />
      )} */}
    </>
  )
}
