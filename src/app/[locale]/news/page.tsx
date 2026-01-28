import Navbar from "@/components/global/Navbar"
import NewsHeader from "./_components/NewsHeader"
import NewsAndPressReleases from "./_components/NewsAndPressReleases"
import { HttpGeneralResponse, PaginationHandlerResponse } from "@/lib/types"
import { MetaDocumentItem, Post, PostCategory } from "@/lib/fragment"
import {
  getDocuments,
  getPage,
  getPostCategories,
  getPostList,
} from "@/lib/api"
import { Suspense } from "react"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 120

export default async function NewsPage({
  searchParams,
}: {
  searchParams: {
    page: string
    tab: string
    search: string
    "categories[]": string
  }
}) {
  const categories: PostCategory[] = await getPostCategories(
    `?type=news&limit=10&sort=id&order=ASC`
  )
  const news: PaginationHandlerResponse<Post[]> = await getPostList(
    `?limit=12&lang=id&page=1&sort=published_at&order=DESC&type=news&page=${searchParams.page || 1}&${searchParams["categories[]"] ? `categories%5B%5D=${searchParams["categories[]"] || ""}` : ""}`
  )
  const dataDocuments: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments(
      `?per_page=10&document_page=news&order=DESC&sort=published_at&page=${searchParams.page || 1}&search=${searchParams.search || ""}`
    )
  const blogs: PaginationHandlerResponse<Post[]> = await getPostList(
    `?limit=12&lang=id&page=1&sort=published_at&order=DESC&type=blog&page=${searchParams.page || 1}&${searchParams["categories[]"] ? `categories%5B%5D=${searchParams["categories[]"] || ""}` : ""}`
  )
  const data: HttpGeneralResponse<unknown> = await getPage("news")

  const featuredPost = [news?.data?.[0], blogs?.data?.[0]]

  return (
    <>
      <div className="mt-16">
        <Navbar isBackgroundWhite />
        {data?.id && <PageIdSetter id={data.id.toString()} />}
        {featuredPost && (
          <NewsHeader tab={searchParams.tab} featuredPost={featuredPost} />
        )}
        <Suspense>
          <NewsAndPressReleases
            data={news}
            categories={categories}
            dataDocuments={dataDocuments}
            blogs={blogs}
          />
        </Suspense>
      </div>
    </>
  )
}
