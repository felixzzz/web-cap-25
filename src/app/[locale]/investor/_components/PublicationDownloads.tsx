"use client"

import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { iconEye, iconPdf, iconPlus, iconSearch } from "@/data/images"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, Suspense, useEffect, useMemo, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationHandlerResponse } from "@/lib/types"
import { CategoryDocument, MetaDocumentItem } from "@/lib/fragment"
import { adjustSearchParams, getLocalizedContent } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"
import { keepPreviousData } from "@tanstack/react-query"
import { useQueryInvestorPublications } from "@/lib/hooks"
import DownloadItem, {
  DownloadItemSkeleton,
} from "@/components/global/DownloadItem"
import useDebounce from "@/hooks/useDebounce"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import React from "react"
import DownloadItemPublication from "@/components/global/DownloadItemPublication"

export default function PublicationDownloads({
  data,
  dataCategories,
}: {
  data: PaginationHandlerResponse<MetaDocumentItem[]>
  dataCategories: CategoryDocument[]
}) {
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tabHistory, setTabHistory] = useState<string>(dataCategories?.[0]?.id)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [year, setYear] = useState<string>("all")
  const debounceSearch = useDebounce(search, 500)

  // const {
  //   data: dataDocuments,
  //   isLoading,
  //   isFetching,
  // } = useQueryInvestorPublications({
  //   options: {
  //     initialData: data,
  //     enabled: true,
  //     placeholderData: keepPreviousData,
  //   },
  //   page: page,
  //   category_id: tabHistory,
  // })

  const getAvailableYear = useMemo(() => {
    const years = data?.data.map((item) => item?.release_year!)
    return Array.from(new Set(years))
  }, [data])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleOnValueChange = (value: string) => {
    setYear(value)
    adjustSearchParams(searchParams, router, "year", value)
  }

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  const handleChangeCategory = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("category_id", value)
    newParams.set("page", "1")
    newParams.delete("search")
    newParams.delete("year")

    setYear('all')
    
    router.push(`?${newParams.toString()}`, {
      scroll: false
    })
  }

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  useEffect(() => {
    if (searchParams.get("category_id")) {
      setTabHistory(searchParams.get("category_id")?.toString()!)
    }
  }, [tabHistory, searchParams])

  useEffect(() => {
    if (typeof debounceSearch === "undefined") return
    adjustSearchParams(searchParams, router, "page", "1")
    adjustSearchParams(searchParams, router, "search", debounceSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  // const filteredDocuments = useMemo(() => {
  //   return data?.data?.filter((item) => {
  //     if (year === "all" && debounceSearch === "") {
  //       return item
  //     }

  //     return (
  //       item?.release_year! === parseInt(year) ||
  //       getLocalizedContent(
  //         locale,
  //         item.document_name_en,
  //         item.document_name_id
  //       )
  //         ?.toLowerCase()
  //         ?.includes(debounceSearch.toLowerCase())
  //     )
  //   })
  // }, [data?.data, year, debounceSearch, locale])

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="container">
          <Anim>
            <div className="mb-6 flex flex-row justify-between gap-2">
              <div className="relative w-full max-w-[302px]">
                <Image
                  src={iconSearch}
                  className="absolute left-3 top-[50%] translate-y-[-50%]"
                  width={16}
                  height={16}
                  alt=""
                />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10"
                  onChange={handleChange}
                />
              </div>
              <Select onValueChange={handleOnValueChange} value={year}>
                <SelectTrigger className="w-[132px]">
                  <SelectValue placeholder="All Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Year</SelectItem>
                    {getAvailableYear?.map((item, i) => (
                      <SelectItem value={`${item}`} key={i}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Anim>
        </div>
        <div className="no-scrollbar container sticky top-[64px] z-20 flex flex-nowrap gap-3 overflow-x-auto bg-white py-4 lg:flex lg:flex-wrap">
          <Anim>
            {dataCategories?.map((item) => (
              <Button
                key={item.id}
                className="w-full text-sm lg:w-auto lg:text-md"
                onClick={() => handleChangeCategory(item.id)}
                variant={tabHistory == item.id ? "blue" : "outline-blue"}
              >
                {getLocalizedContent(locale, item.name_en, item.name_id)}
              </Button>
            ))}
          </Anim>
        </div>
        <div className="container min-h-[320px]">
          <Anim>
            {dataCategories?.map(
              (item) =>
                item.id == tabHistory && (
                  <React.Fragment key={item.id}>
                    <div className="mt-6">
                      <div className="text-xl font-bold tracking-[0.9px]">
                        {getLocalizedContent(
                          locale,
                          item.name_en,
                          item.name_id
                        )}
                      </div>
                      <div className="mt-0 lg:mt-6">
                        {/* {(isLoading || isFetching) && (
                          <>
                            <DownloadItemSkeleton />
                          </>
                        )} */}
                        {/* {!isLoading &&
                        !isFetching &&
                        filteredDocuments?.length === 0 ? (
                          <BlankSpaceContent />
                        ) : (
                          !isLoading &&
                          !isFetching &&
                          filteredDocuments?.map((item) => (
                            <DownloadItem key={item.id} {...item} />
                          ))
                        )} */}
                        {data.data?.length === 0 ? (
                          <BlankSpaceContent />
                        ) : (
                          data.data?.map((item) => (
                            <DownloadItemPublication key={item.id} {...item} />
                          ))
                        )}
                      </div>
                    </div>
                    {(data?.last_page || 0) > 1 && (
                      <Pagination className="mt-12">
                        <PaginationContent>
                          {data.links.map((item, index) => {
                            return (
                              <PaginationItem key={`${item.label}-${index}`}>
                                {item.label
                                  .toLowerCase()
                                  .includes("previous") && (
                                  <PaginationPrevious
                                    isDisabled={data.current_page === 1}
                                    onClick={() =>
                                      data.current_page > 1 &&
                                      handlePageChange(data.current_page - 1)
                                    }
                                  />
                                )}
                                {item.label === "..." && index === 3 && (
                                  <PaginationLink>...</PaginationLink>
                                )}
                                {!isNaN(parseInt(item.label)) && (
                                  <PaginationLink
                                    isActive={item.active}
                                    onClick={() =>
                                      handlePageChange(parseInt(item.label))
                                    }
                                  >
                                    {item.label}
                                  </PaginationLink>
                                )}
                                {item.label === "..." && index === 11 && (
                                  <PaginationLink>...</PaginationLink>
                                )}
                                {item.label.toLowerCase().includes("next") && (
                                  <PaginationNext
                                    isDisabled={
                                      data.current_page === data.last_page
                                    }
                                    onClick={() =>
                                      data.current_page < data.last_page &&
                                      handlePageChange(data.current_page + 1)
                                    }
                                  />
                                )}
                              </PaginationItem>
                            )
                          })}
                        </PaginationContent>
                      </Pagination>
                    )}
                  </React.Fragment>
                )
            )}
          </Anim>
        </div>
      </section>
    </>
  )
}
