import { getPostCategories, getPostList } from "@/lib/api"
import EsgInAction from "./_components/EsgInAction"
import { Post, PostCategory } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import { notFound } from "next/navigation"

export const revalidate = 120

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

  return (
    <>
      <EsgInAction categories={categories} posts={initialPosts} />
    </>
  )
}
