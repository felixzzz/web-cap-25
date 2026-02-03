import Navbar from "@/components/global/Navbar"
import NewsDetailContent from "../_components/NewsDetailContent"
import NewsDetailOther from "../_components/NewsDetailOther"
import { PaginationHandlerResponse } from "@/lib/types"
import { PostNews } from "@/lib/fragment"
import { getActiveBanners, getDetailPost, getPage, getPostList } from "@/lib/api"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { dateFormatter, getLocalizedContent } from "@/lib/utils"
import { SITE_URL } from "@/lib/constant"
import { PageIdSetter } from "@/components/providers/query-provider"

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const allSlugs: { slug: string }[] = []
  let currentPage = 1
  let hasMorePages = true
  const perPage = 10

  while (hasMorePages) {
    try {
      const posts: PaginationHandlerResponse<PostNews[]> = await getPostList(
        `?type=news&limit=${perPage}&page=${currentPage}&sort=published_at&order=DESC&lang=${locale}`
      )
      const pageSlugs = posts.data.map((item) => ({
        slug: item.slug,
        locale,
      }))
      allSlugs.push(...pageSlugs)

      hasMorePages = currentPage < posts.last_page
      currentPage++
    } catch (error) {
      console.error(`Error fetching news posts page ${currentPage}:`, error)
      break
    }
  }

  return allSlugs
}

export const revalidate = 60

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: string
    slug: string
  }
}): Promise<Metadata> {
  const data = await getDetailPost(slug)

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
    openGraph: {
      images: [data?.image],
      publishedTime: data?.published_at,
    },
    other: {
      "article:modified_time":
        data?.updated_at && dateFormatter(data?.updated_at, "yyyy-MM-dd"),
      "article:published_time":
        data?.published_at && dateFormatter(data?.published_at, "yyyy-MM-dd"),
    },
  }
}

export default async function NewsDetailPage({
  params: { slug, locale },
}: Readonly<{ params: { slug: string; locale: string } }>) {
  const data: PostNews = await getDetailPost(slug)
  const banners = await getActiveBanners(slug)

  let newsPageData = null
  try {
    newsPageData = await getPage("news")
  } catch (error) {
    console.error("Failed to fetch news page data:", error)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/news/${slug}`,
    },
    headline: data?.title,
    image: data?.image,
    author: {
      "@type": "Organization",
      name: "Chandra Asri",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "Chandra Asri",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/brand/logo-chandra-asri.png`,
      },
    },
    datePublished: data?.published_at,
    dateModified: data?.updated_at,
  }

  const relatedArticles: PaginationHandlerResponse<PostNews[]> =
    await getPostList(
      `?limit=3&lang=${locale}&page=1&sort=id&order=DESC&categories[]=${data?.category[0]?.id}&type=news`
    )

  if (data?.type === "news" && !data?.meta?.categories) {
    return notFound()
  }

  if (!data) {
    return notFound()
  }

  if (data.type !== "news") {
    return notFound()
  }

  return (
    <>
      <div style={{ marginTop: "calc(64px + var(--sticky-banner-height, 0px))" }}>
        {newsPageData?.id && <PageIdSetter id={newsPageData.id.toString()} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar isBackgroundWhite />
        <NewsDetailContent data={data} path="news" banners={banners} />
        {relatedArticles?.data?.length > 0 && (
          <NewsDetailOther data={relatedArticles.data} />
        )}
      </div>
    </>
  )
}
