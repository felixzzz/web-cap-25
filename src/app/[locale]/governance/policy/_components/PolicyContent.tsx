"use client"

import { iconSearch } from "@/data/images"
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import Anim from "@/components/global/Anim"
import { MetaDocumentItem } from "@/lib/fragment"
import DownloadItem, {
  DownloadItemSkeleton,
} from "@/components/global/DownloadItem"
import { ChangeEvent, Suspense, useEffect, useState } from "react"
import { PaginationHandlerResponse } from "@/lib/types"
import { adjustSearchParams } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useQueryGovernancePolicy } from "@/lib/hooks"
import { keepPreviousData } from "@tanstack/react-query"
import useDebounce from "@/hooks/useDebounce"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"

export default function PolicyContent({
  dataDocumentsPolicy,
}: {
  dataDocumentsPolicy: PaginationHandlerResponse<MetaDocumentItem[]>
}) {
  const router = useRouter()
  const [search, setSearch] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const debounceSearch = useDebounce(search, 500)

  const {
    data: dataDocuments,
    isLoading,
    isFetching,
    refetch,
  } = useQueryGovernancePolicy({
    options: {
      initialData: dataDocumentsPolicy,
      enabled: false,
      placeholderData: keepPreviousData,
    },
    page: page,
    search: debounceSearch,
  })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    adjustSearchParams(searchParams, router, "page", newPage.toString())
  }

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
    <>
      <section className="pb-8 pt-6 lg:pb-20">
        <div className="container">
          <Anim>
            <CustomBreadcrumb
              data={[
                {
                  url: "/news",
                  label: "News",
                  isPrimary: true,
                },
                {
                  url: "/governance",
                  label: "Governance",
                  isPrimary: true,
                },
                {
                  label: "Policy",
                  isPrimary: true,
                },
              ]}
              className="mb-8 lg:mb-[40px]"
            />
            <div className="relative mb-8 w-full lg:mb-[52px]">
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
                className="bg-white pl-10"
                onChange={handleOnChange}
              />
            </div>
            <div className="text-xl font-bold">Policy</div>
            <div className="mt-4 flex min-h-[220px] flex-col">
              {(isLoading || isFetching) && (
                <>
                  <DownloadItemSkeleton />
                </>
              )}
              {!isLoading &&
              !isFetching &&
              dataDocuments?.data?.length === 0 ? (
                <BlankSpaceContent />
              ) : (
                !isLoading &&
                !isFetching &&
                dataDocuments?.data?.map((item) => (
                  <DownloadItem key={item.id} {...item} />
                ))
              )}
            </div>
            {dataDocumentsPolicy.last_page > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      isDisabled={page === 1}
                      onClick={() => page > 1 && handlePageChange(page - 1)}
                    />
                  </PaginationItem>
                  {[...Array(dataDocumentsPolicy.last_page)].map((_, index) => (
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
                      isDisabled={page === dataDocumentsPolicy.last_page}
                      onClick={() =>
                        page < dataDocumentsPolicy.last_page &&
                        handlePageChange(page + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </Anim>
        </div>
      </section>
    </>
  )
}
