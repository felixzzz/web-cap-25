import {
  Card,
  CardContent,
  CardImage,
  CardSkeleton,
} from "@/components/global/card/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Post, PostCategory } from "@/lib/fragment"
import {
  adjustSearchParams,
  assetUrl,
  cn,
  dateFormater,
  getLocalizedContent,
} from "@/lib/utils"
import { CircleX, Search } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useSearchParams, useRouter } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"
import { useArticleSustainability } from "@/lib/hooks"
import { PaginationHandlerResponse } from "@/lib/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import { keepPreviousData } from "@tanstack/react-query"

type Prop = {
  data: PaginationHandlerResponse<Post[]>
  categories: PostCategory[]
}

export default function EsgContent({ data, categories }: Prop) {
  const searchParams = useSearchParams()
  const t = useTranslations("global")
  const category = searchParams.get("categories[]")
  const filteredInitialData = useMemo(() => {
    if (category) {
      return data.data.filter((item) => `${item.category[0]?.id}` === category)
    }
    return data.data.filter(
      (item) => item.category[0]?.id === categories[0]?.id
    )
  }, [data.data, categories, category])

  const [posts, setPosts] = useState<Post[]>(filteredInitialData)
  const [search, setSearch] = useState<string | undefined>()
  const locale = useLocale()
  const router = useRouter()
  const debounceSearch = useDebounce(search, 500)
  const [page, setPage] = useState(1)

  const {
    data: dataSustainability,
    refetch,
    isLoading,
    isRefetching,
  } = useArticleSustainability({
    options: {
      enabled: true,
      placeholderData: keepPreviousData,
    },
  })

  const handleClickFilter = (category: string) => {
    adjustSearchParams(searchParams, router, "categories[]", category)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  const loading = useMemo(() => {
    return isLoading || isRefetching
  }, [isLoading, isRefetching])

  useEffect(() => {
    if (typeof debounceSearch == "undefined") return

    adjustSearchParams(searchParams, router, "search", debounceSearch)
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  return (
    <Suspense>
      <section className="relative py-10 lg:py-12">
        <div className="container">
          <div className="relative mb-6">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search color="#337ABC" size={20} />
            </div>
            <Input
              placeholder="Search"
              className="pl-10"
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-4">
            {categories.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  handleClickFilter(`${item.id}`)
                }}
              >
                <Button
                  variant={`outline-blue`}
                  className={cn(
                    ``,
                    !category &&
                      categories[0].id === item.id &&
                      `bg-light-blue text-white`,
                    category &&
                      category === `${item.id}` &&
                      `bg-light-blue text-white`
                  )}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {loading && (
              <>
                {[...Array(3)].map((item, i) => (
                  <CardSkeleton key={i} />
                ))}
              </>
            )}

            {dataSustainability?.data?.length === 0 && (
              <div className="col-span-3">
                <BlankSpaceContent className="text-center" />
              </div>
            )}

            {!loading &&
              dataSustainability?.data?.map((item, i) => (
                <div key={i}>
                  <Card
                    href={`/${locale}/sustainability/sustainability-in-action/${item.slug}`}
                  >
                    <CardImage
                      className="rounded-2xl"
                      img={assetUrl(item.image)!}
                    />
                    <CardContent
                      label={dateFormater(item.published_at)}
                      title={getLocalizedContent(
                        locale,
                        item.title_en,
                        item.title
                      )}
                    >
                      <Button
                        variant={"link"}
                        className="min-w-0 px-0 group-hover:underline"
                      >
                        {t("read_more")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>

          {dataSustainability && dataSustainability?.last_page > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isDisabled={page === 1}
                    onClick={() => page > 1 && handlePageChange(page - 1)}
                  />
                </PaginationItem>
                {[...Array(dataSustainability?.last_page)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={page === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    isDisabled={page === dataSustainability?.last_page}
                    onClick={() =>
                      page < dataSustainability?.last_page &&
                      handlePageChange(page + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </Suspense>
  )
}
