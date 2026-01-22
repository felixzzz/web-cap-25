import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage, getPostList } from "@/lib/api"
import { Post } from "@/lib/fragment"
import {
  BusinessSolutionsProp,
  DynamicProps,
  HttpGeneralResponse,
  PaginationHandlerResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import RelatedArticles from "../../_components/RelatedArticles"
import { getLocalizedContent } from "@/lib/utils"

export async function generateStaticParams() {
  try {
    const business: DynamicProps[] = await getPage("dynamic")
    return business.flatMap((business) => {
      return business.children.map((unit) => ({
        business_line: business.slug,
        business_unit: unit.slug,
      }))
    })
  } catch (error) {
    console.warn("Could not generate static params for our-business:", error)
    return []
  }
}

export const revalidate = 60

export async function generateMetadata({
  params: { business_unit, locale },
}: {
  params: { business_unit: string; locale: "en" | "id" }
}) {
  const data: HttpGeneralResponse<BusinessSolutionsProp> =
    await getPage(business_unit)
  if (!data) {
    return notFound()
  }
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

export default async function BusinessUnitProducts({
  params,
}: {
  params: { business_line: string; business_unit: string; locale: "en" | "id" }
}) {
  const { business_unit, locale } = params
  const data: HttpGeneralResponse<BusinessSolutionsProp> =
    await getPage(business_unit)
  const news: PaginationHandlerResponse<Post[]> = await getPostList(
    `?limit=3&lang=${locale}&page=1&sort=id&order=DESC&type=news&post_type=${business_unit}`
  )

  if (!data) {
    return notFound()
  }

  return (
    <>
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
      {data?.meta?.small_banner && (
        <SmallBannerBlock {...data?.meta.small_banner} />
      )}
      {news?.data?.length > 0 && data?.meta?.news && (
        <RelatedArticles posts={news?.data} {...data?.meta.news} />
      )}
    </>
  )
}
