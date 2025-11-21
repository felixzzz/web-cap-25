"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  iconChecklist,
  iconClose,
  iconDownload,
  iconEye,
  iconPdf,
  iconPlus,
} from "@/data/images"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"
import {
  adjustSearchParams,
  assetUrl,
  cn,
  dateFormater,
  getLocalizedContent,
} from "@/lib/utils"
import { useGeneralSearch } from "@/lib/hooks"
import { keepPreviousData } from "@tanstack/react-query"
import SearchHeader from "./SearchHeader"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import { useGeneralStore } from "@/store/general"
import { DownloadItemSkeleton } from "@/components/global/DownloadItem"
import { MetaSearchItem } from "@/lib/fragment"

const listFilter = [
  {
    label: "Page",
    value: "pages",
  },
  {
    label: "Report",
    value: "reports",
  },
  {
    label: "Publication",
    value: "publication",
  },
  {
    label: "Article",
    value: "article",
  },
  {
    label: "Press Release",
    value: "press",
  },
]

export default function SearchContent() {
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string>("")
  const [media, setMedia] = useState<string[]>([
    "pages",
    "reports",
    "publication",
    "article",
    "press",
  ])
  const [page, setPage] = useState(1)

  const { data, refetch, isLoading, isFetching } = useGeneralSearch({
    options: {
      enabled: true,
      placeholderData: keepPreviousData,
    },
    page: page,
    search: searchParams.get("q"),
    media: media,
    locale
  })
  const { storageDownload, setStorageDownload } = useGeneralStore()

  const isFileAlreadyAdded = (downloadItem: any) => {
    return storageDownload.some((item: any) => item.id === downloadItem.id)
  }

  const handleAddFile = (downloadItem: MetaSearchItem) => {
    if (isFileAlreadyAdded(downloadItem)) {
      setStorageDownload(
        storageDownload?.filter((item: any) => item.id !== downloadItem.id)
      )
    } else {
      setStorageDownload([
        ...storageDownload,
        {
          id: downloadItem.id!,
          document_name_en: downloadItem.title_en!,
          document_name_id: downloadItem.title_id!,
          document_file_en: downloadItem.document_file_en!,
          document_file_id: downloadItem.document_file_id!,
        },
      ])
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearch = () => {
    router.push(`/${locale}/search?q=${search}`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    adjustSearchParams(searchParams, router, "page", newPage.toString())
  }

  const handleClickFilter = (category: string) => {
    const updatedMedia: any = media.includes(category)
      ? media.filter((item) => item !== category)
      : [...media, category]

    setMedia(updatedMedia)
    adjustSearchParams(searchParams, router, "type[]", updatedMedia)
  }

  const handleClearFilter = () => {
    setMedia([])
    adjustSearchParams(searchParams, router, "type[]", "")
  }

  const handleClickItem = (item: MetaSearchItem) => {
    if (item.type !== null && ["article", "pages"].includes(item.type)) {
      if (item.type === "article") {
        router.push(`/${locale}/news/${item.slug}`)
        return
      }
      if (item.type === "pages") {
        router.push(`/${locale}/${item.site_url}`)
        return
      }
      router.push(`/${locale}/${item.slug}`)
      return
    }
  }

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  useEffect(() => {
    if (searchParams.get("q")) {
      setSearch(searchParams.get("q")!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("q")])

  useEffect(() => {
    if (searchParams.getAll("type[]")) {
      const mediaFromParams = searchParams
        .getAll("type[]")
        .filter((type) => type !== "")

      // Update the media state with the extracted values
      setMedia(mediaFromParams)
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const excludedSlugs = ["social-media"]

  return (
    <>
      <SearchHeader
        search={search}
        handleChange={handleChange}
        handleSearch={handleSearch}
        totalResult={data?.total!}
      />
      <section className="container min-h-[600px] py-8 lg:pb-[114px] lg:pt-[64px]">
        <div className="flex flex-col lg:flex-row">
          <div className="mb-6 w-full lg:mb-0 lg:w-3/12">
            <div className="rounded-3xl border bg-surface p-6 lg:mr-16">
              <div className="mb-4 text-md font-bold">Filter by media</div>
              <div className="flex flex-col">
                {listFilter.map((item) => (
                  <div key={item.value} className="flex gap-2 py-3">
                    <Checkbox
                      checked={media?.includes(item.value)}
                      onCheckedChange={(checked) =>
                        handleClickFilter(item.value)
                      }
                      id={item.value}
                    />
                    <label
                      htmlFor={item.value}
                      className="ml-1 cursor-pointer text-md font-medium leading-none text-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              <div
                onClick={handleClearFilter}
                className="mt-4 flex cursor-pointer text-sm font-bold text-primary"
              >
                Clear filter
              </div>
            </div>
          </div>
          <div className="w-full lg:w-9/12">
            <div className="mb-6">
              <div className="no-scrollbar -mr-4 flex flex-nowrap gap-2 overflow-scroll pr-4 lg:flex-wrap lg:gap-4">
                {listFilter
                  .filter((item) => media.includes(item.value)) // Filter by matching media values
                  .map((item) => (
                    <Button
                      key={item.value}
                      className="group flex-shrink-0 px-3"
                      variant="outline-blue"
                      onClick={() => handleClickFilter(item.value)}
                    >
                      <div className="flex flex-row gap-2">
                        <div className="my-auto">{item.label}</div>{" "}
                        {/* Display corresponding label */}
                        <Image
                          width={16}
                          height={16}
                          className="my-auto group-hover:brightness-0 group-hover:invert"
                          src={iconClose}
                          alt=""
                        />
                      </div>
                    </Button>
                  ))}
              </div>
            </div>
            {(isLoading || isFetching) && (
              <>
                <DownloadItemSkeleton />
                <DownloadItemSkeleton />
                <DownloadItemSkeleton />
                <DownloadItemSkeleton />
                <DownloadItemSkeleton />
              </>
            )}
            {!isLoading && !isFetching && data?.data?.length === 0 ? (
              <>
                <BlankSpaceContent className="text-left" />
                {/* <div className="mt-12 flex flex-col">
                  <div className="text-lg font-bold">Top Search</div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="outline-blue">Corporate</Button>
                    <Button variant="outline-blue">Business Expansion</Button>
                    <Button variant="outline-blue">Industry Insights</Button>
                    <Button variant="outline-blue">Career</Button>
                    <Button variant="outline-blue">Events</Button>
                    <Button variant="outline-blue">Company Awards</Button>
                  </div>
                </div> */}
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  {!isLoading &&
                    !isFetching &&
                    data?.data
                      .filter((item) => !excludedSlugs.includes(item.slug!))
                      .map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex flex-col justify-between border-b py-4 lg:flex-row lg:py-6",
                            ["article", "pages"].includes(item.type!) &&
                              "cursor-pointer"
                          )}
                          onClick={() => handleClickItem(item)}
                        >
                          <div className="my-auto w-full text-sm font-bold lg:text-md">
                            <div className="flex flex-row text-sm font-semibold uppercase tracking-[1.4px] text-gray">
                              <div>{item.type}</div>
                              {item.type === "article" && item.published_at && (
                                <div className="ml-auto text-sm font-normal tracking-normal text-[#828282]">
                                  {dateFormater(item.published_at)}
                                </div>
                              )}
                            </div>
                            <div className="mt-1 lg:max-w-[450px]">
                              {getLocalizedContent(
                                locale,
                                item.title_en,
                                item.title_id
                              )}
                            </div>
                            {item.meta[0]?.value && (
                              <div
                                className="mt-2 line-clamp-2 overflow-ellipsis text-sm font-normal"
                                dangerouslySetInnerHTML={{
                                  __html: item.meta[0]?.value,
                                }}
                              />
                            )}
                          </div>
                          {getLocalizedContent(
                            locale,
                            item.document_file_en,
                            item.document_file_id
                          ) && (
                            <div className="flex lg:flex-row">
                              <Link
                                href={
                                  assetUrl(
                                    getLocalizedContent(
                                      locale,
                                      item.document_file_en,
                                      item.document_file_id
                                    )
                                  ) || ""
                                }
                                className="block text-sm font-bold text-primary lg:hidden"
                              >
                                View
                              </Link>
                              <Link
                                href={
                                  assetUrl(
                                    getLocalizedContent(
                                      locale,
                                      item.document_file_en,
                                      item.document_file_id
                                    )
                                  ) || ""
                                }
                                className="ml-3 block text-sm font-bold text-primary lg:hidden"
                              >
                                Download
                              </Link>
                              <div className="hidden lg:flex">
                                <Button
                                  className="group flex-shrink-0 cursor-pointer px-3"
                                  variant="outline-primary"
                                  asChild
                                >
                                  <Link
                                    className="ml-auto flex"
                                    href={
                                      assetUrl(
                                        getLocalizedContent(
                                          locale,
                                          item.document_file_en,
                                          item.document_file_id
                                        )
                                      ) || ""
                                    }
                                    target="_blank"
                                  >
                                    <Image
                                      className="my-auto mr-2 group-hover:brightness-0 group-hover:invert"
                                      src={iconEye}
                                      alt=""
                                    />
                                    View
                                  </Link>
                                </Button>
                                <Button
                                  className="group ml-3 min-w-[138px] cursor-pointer px-3"
                                  variant={
                                    isFileAlreadyAdded(item)
                                      ? "primary"
                                      : "outline-primary"
                                  }
                                  asChild
                                  onClick={() => handleAddFile(item)}
                                >
                                  <div>
                                    <Image
                                      className="my-auto mr-2 group-hover:brightness-0 group-hover:invert"
                                      src={
                                        isFileAlreadyAdded(item)
                                          ? iconChecklist
                                          : iconPlus
                                      }
                                      alt=""
                                    />
                                    Download
                                  </div>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                </div>
                {data && data?.last_page > 1 && (
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          isDisabled={page === 1}
                          onClick={() => page > 1 && handlePageChange(page - 1)}
                        />
                      </PaginationItem>
                      {[...Array(data?.last_page)].map((_, index) => (
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
                          isDisabled={page === data?.last_page}
                          onClick={() =>
                            page < data?.last_page! &&
                            handlePageChange(page + 1)
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
