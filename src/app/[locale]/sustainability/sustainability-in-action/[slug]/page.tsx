import Navbar from "@/components/global/Navbar"
import DetailEsg from "../_components/DetailEsg"
import EsgDetailOther from "../_components/DetailEsgOthers"
import { PaginationHandlerResponse } from "@/lib/types"
import { Post } from "@/lib/fragment"
import { getDetailPost, getPostList } from "@/lib/api"
import { dateFormatter, getLocalizedContent } from "@/lib/utils"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const allSlugs: { slug: string }[] = []
  let currentPage = 1
  let hasMorePages = true
  const perPage = 100

  while (hasMorePages) {
    try {
      const posts: PaginationHandlerResponse<Post[]> = await getPostList(
        `?type=articles-sustainability&limit=${perPage}&page=${currentPage}&sort=id&order=DESC&lang=${locale}`
      )
      const pageSlugs = posts.data.map((item) => ({
        slug: item.slug ?? '',
        locale
      }))

      allSlugs.push(...pageSlugs)
      hasMorePages = currentPage < posts.last_page
      currentPage++
    } catch (error) {
      console.error(`Error fetching sustainability articles page ${currentPage}:`, error)
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

export default async function SlugDetailPage({
  params: { slug, locale },
}: Readonly<{ params: { slug: string; locale: string } }>) {
  const data: Post = await getDetailPost(slug)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data?.title,
    image: data?.image,
    datePublished: data?.published_at,
    dateModified: data?.updated_at,
  }

  const relatedArticles: PaginationHandlerResponse<Post[]> = await getPostList(
    `?limit=3&lang=${locale}&page=1&sort=id&order=DESC&categories[]=${data?.meta?.categories?.[0]}&type=articles-sustainability`
  )

  if (!data) return notFound()

  return (
    <>
      <div className="mt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar isBackgroundWhite />
        <DetailEsg data={data} />
        {relatedArticles?.data?.length > 0 && (
          <EsgDetailOther data={relatedArticles.data} />
        )}
      </div>
    </>
  )
}
