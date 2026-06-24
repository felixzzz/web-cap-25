import { Metadata } from "next"
import { getAlternates, getSeoTitle } from "@/lib/seo"
import { getPage, getPostCategories, getPostList } from "@/lib/api"
import EsgInAction from "./_components/EsgInAction"
import { Post, PostCategory } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import { notFound } from "next/navigation"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"
import JsonLdRenderer from "@/components/global/JsonLdRenderer"

export const revalidate = 120


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  let data = null
  try {
    data = await getPage("sustainability-in-action")
  } catch (e) {
    console.error("Failed to fetch sustainability-in-action page metadata", e)
  }

  return {
    openGraph: {
      title: getLocalizedContent(
        locale,
        data?.meta?.seo_meta?.meta_title_en,
        data?.meta?.seo_meta?.meta_title_id
      ),
      description: getLocalizedDescription(
        locale,
        data?.meta?.seo_meta?.meta_desc_en,
        data?.meta?.seo_meta?.meta_desc_id
      ),
    },
    alternates: getAlternates(locale, "/sustainability/sustainability-in-action"),
    title: getSeoTitle(locale, data),
    description: getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
  }
}

export default async function RootPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const categories: PostCategory[] = await getPostCategories(
    `?type=articles-sustainability&sort=id&order=ASC&lang=${locale}`
  )
  const initialPosts: PaginationHandlerResponse<Post[]> = await getPostList(
    `?type=articles-sustainability&sort=published_at&order=DESC&lang=${locale}`
  )

  let data = null
  try {
    data = await getPage("sustainability-in-action")
  } catch (e) {
    console.error("Failed to fetch sustainability-in-action page data", e)
  }

  return (
    <>
      <JsonLdRenderer
        meta={data?.meta}
        locale={locale as "en" | "id"}
        pageType="home"
      />
      <EsgInAction categories={categories} posts={initialPosts} />
    </>
  )
}
