"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { MetaDocumentItem, Post, PostCategory } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import PressReleasesContent from "./PressReleasesContent"
import NewsContent from "./NewsContent"

export default function NewsAndPressReleases({
  data,
  dataDocuments,
  categories,
  blogs,
}: {
  data: PaginationHandlerResponse<Post[]>
  dataDocuments: PaginationHandlerResponse<MetaDocumentItem[]>
  categories: PostCategory[],
  blogs: PaginationHandlerResponse<Post[]>
}) {
  const locale = useLocale()
  const router = useRouter()
  const [tab, setTab] = useState("news")
  const t = useTranslations("global")
  const [posts, setPosts] = useState<Post[]>(data?.data)
  const searchParams = useSearchParams()
  const category = searchParams.get("categories[]")
  const [page, setPage] = useState(1)

  // const {
  //   data: clientData,
  //   isLoading,
  //   refetch,
  //   isRefetching,
  // } = useArticleNews({
  //   options: {
  //     enabled: true,
  //     placeholderData: keepPreviousData,
  //   },
  // })

  const handleTabChange = (value: string) => {
    setTab(value)
    const currentQuery = new URLSearchParams(window.location.search)
    currentQuery.set("tab", value)
    currentQuery.set("page", "1")
    router.push(`/${locale}/news?${currentQuery.toString()}`, {
      scroll: false,
    })
  }

  // const loading = useMemo(() => {
  //   return isLoading || isRefetching
  // }, [isLoading, isRefetching])

  useEffect(() => {
    if (!category) {
      setPosts(data?.data)
      return
    }

    // const refetchData = async () => {
    //   const { data } = await refetch()

    //   if (data?.data) {
    //     setPosts(data?.data)
    //   }
    // }

    // refetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, data])

  useEffect(() => {
    if (searchParams.get("tab")) {
      setTab(searchParams.get("tab")!)
    }
  }, [searchParams])

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  return (
    <section>
      <div className="container relative py-8 lg:pb-[80px] lg:pt-12">
        <Tabs
          value={tab}
          defaultValue={tab}
          className="min-h-[25vh]"
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-6 flex w-full flex-row">
            <TabsTrigger value="news">{t("news")}</TabsTrigger>
            <TabsTrigger value="press-releases">
              {t("press_releases")}
            </TabsTrigger>
            <TabsTrigger value="blog">
              Blog
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <NewsContent categories={categories} data={data} />
          </TabsContent>
          <TabsContent value="press-releases">
            <PressReleasesContent data={dataDocuments} />
          </TabsContent>
          <TabsContent value="blog">
            <NewsContent categories={[]} data={blogs} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
