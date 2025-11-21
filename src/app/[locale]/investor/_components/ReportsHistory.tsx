"use client"

import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { Suspense, useEffect, useMemo, useState } from "react"
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
import { useLocale } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryInvestorReports } from "@/lib/hooks"
import { keepPreviousData } from "@tanstack/react-query"
import { adjustSearchParams, getLocalizedContent } from "@/lib/utils"
import DownloadItem, {
  DownloadItemSkeleton,
} from "@/components/global/DownloadItem"

export default function ReportsHistory({
  dataCategories,
}: {
  dataCategories: CategoryDocument[]
}) {
  const locale = useLocale()
  const router = useRouter()
  const [tabHistory, setTabHistory] = useState<string>(
    dataCategories?.[0]?.id.toString()
  )
  const searchParams = useSearchParams()
  const [page, setPage] = useState<number>(1)

  const {
    data: dataDocuments,
    isLoading,
    isFetching,
  } = useQueryInvestorReports({
    options: {
      enabled: true,
      placeholderData: keepPreviousData,
    },
    page: page,
    category_id: tabHistory,
  })

  const getAvailableYear = useMemo(() => {
    const years = dataDocuments?.data?.map((item: MetaDocumentItem) =>
      new Date(item.published_at!).getFullYear()
    )
    return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))
  }, [dataDocuments])

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  const handleChangeCategory = (value: string) => {
    setTabHistory(value)
    adjustSearchParams(searchParams, router, "category_id", value)
  }

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  useEffect(() => {
    if (searchParams.get("category_id")) {
      setTabHistory(searchParams.get("category_id")!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="no-scrollbar container sticky top-[64px] z-20 flex flex-nowrap gap-3 overflow-x-auto bg-white py-4 lg:flex lg:flex-wrap">
          <Anim>
            {dataCategories?.map((item) => (
              <Button
                key={item.id}
                className="w-full text-sm lg:w-auto lg:text-md"
                onClick={() => handleChangeCategory(item.id.toString())}
                variant={
                  tabHistory === item.id.toString() ? "blue" : "outline-blue"
                }
              >
                {getLocalizedContent(locale, item.name_en, item.name_id)}
              </Button>
            ))}
          </Anim>
        </div>
        <div className="container">
          <Anim>
            <>
              {tabHistory === dataCategories?.[0]?.id.toString() && (
                <>
                  <div className="mt-6">
                    <div className="mt-0 lg:mt-6">
                      {(isLoading || isFetching) && (
                        <>
                          <DownloadItemSkeleton />
                        </>
                      )}
                      {!isLoading &&
                        !isFetching &&
                        dataDocuments?.data.map((item) => (
                          <DownloadItem
                            isHaveDescription
                            key={item.id}
                            {...item}
                          />
                        ))}
                    </div>

                    {dataDocuments && dataDocuments?.last_page > 1 && (
                      <Pagination className="mt-12">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              isDisabled={page === 1}
                              onClick={() =>
                                page > 1 && handlePageChange(page - 1)
                              }
                            />
                          </PaginationItem>
                          {[...Array(dataDocuments?.last_page)].map(
                            (_, index) => (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  isActive={page === index + 1}
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem>
                            <PaginationNext
                              isDisabled={page === dataDocuments.last_page}
                              onClick={() =>
                                page < dataDocuments.last_page &&
                                handlePageChange(page + 1)
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </div>
                </>
              )}
              {tabHistory === dataCategories[1]?.id.toString() && (
                <>
                  {getAvailableYear.map((year) => (
                    <div key={year} className="mt-6">
                      <div className="text-xl font-bold uppercase tracking-[0.9px]">
                        {year}
                      </div>
                      <div className="mt-0 lg:mt-6">
                        {(isLoading || isFetching) && (
                          <>
                            <DownloadItemSkeleton />
                          </>
                        )}
                        {!isLoading &&
                          !isFetching &&
                          dataDocuments?.data
                            .filter(
                              (documentData) =>
                                new Date(
                                  documentData.published_at!
                                ).getFullYear() === year
                            )
                            .map((document) => (
                              <DownloadItem
                                isHaveDescription
                                key={document.id}
                                {...document}
                              />
                            ))}
                      </div>
                    </div>
                  ))}
                  {dataDocuments && dataDocuments?.last_page > 1 && (
                    <Pagination className="mt-12">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            isDisabled={page === 1}
                            onClick={() =>
                              page > 1 && handlePageChange(page - 1)
                            }
                          />
                        </PaginationItem>
                        {[...Array(dataDocuments.last_page)].map((_, index) => (
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
                            isDisabled={page === dataDocuments.last_page}
                            onClick={() =>
                              page < dataDocuments.last_page &&
                              handlePageChange(page + 1)
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </>
          </Anim>
        </div>
      </section>
    </>
  )
}
