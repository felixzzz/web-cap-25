"use client"

import { iconSearch } from "@/data/images"
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import Anim from "@/components/global/Anim"
import { MetaDocumentItem } from "@/lib/fragment"
import DownloadItem from "@/components/global/DownloadItem"
import { ChangeEvent, useEffect, useState } from "react"
import { PaginationHandlerResponse } from "@/lib/types"
import { adjustSearchParams } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"

export default function PolicyContent({
  dataDocumentsPolicy,
}: {
  dataDocumentsPolicy: PaginationHandlerResponse<MetaDocumentItem[]>
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string | undefined>(
    searchParams.get("search") ?? ""
  )
  const debounceSearch = useDebounce(search, 500)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  useEffect(() => {
    if (typeof debounceSearch === "undefined") return
    adjustSearchParams(searchParams, router, "page", "1")
    adjustSearchParams(searchParams, router, "search", debounceSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  useEffect(() => {
    if (searchParams.get("search") !== null) {
      setSearch(searchParams.get("search") ?? "")
    }
  }, [searchParams])

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
                value={search ?? ""}
                onChange={handleOnChange}
              />
            </div>
            <div className="text-xl font-bold">Policy</div>
            <div className="mt-4 flex min-h-[220px] flex-col">
              {!dataDocumentsPolicy?.data ||
              dataDocumentsPolicy?.data?.length === 0 ? (
                <BlankSpaceContent />
              ) : (
                dataDocumentsPolicy?.data?.map((item) => (
                  <DownloadItem key={item.id} {...item} />
                ))
              )}
            </div>
            {(dataDocumentsPolicy?.last_page || 0) > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  {dataDocumentsPolicy?.links && dataDocumentsPolicy.links.length > 0 ? (
                    dataDocumentsPolicy.links.map((item, index) => {
                      const isPrevious =
                        item.label.toLowerCase().includes("previous") ||
                        item.label.includes("&laquo;")
                      const isNext =
                        item.label.toLowerCase().includes("next") ||
                        item.label.includes("&raquo;")
                      const isEllipsis = item.label.includes("...")
                      const pageNum = parseInt(item.label, 10)
                      const isNumber =
                        !isPrevious && !isNext && !isEllipsis && !isNaN(pageNum)

                      return (
                        <PaginationItem key={`${item.label}-${index}`}>
                          {isPrevious && (
                            <PaginationPrevious
                              isDisabled={dataDocumentsPolicy.current_page === 1}
                              onClick={() =>
                                dataDocumentsPolicy.current_page > 1 &&
                                handlePageChange(
                                  dataDocumentsPolicy.current_page - 1
                                )
                              }
                            />
                          )}
                          {isEllipsis && <PaginationEllipsis />}
                          {isNumber && (
                            <PaginationLink
                              isActive={item.active}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {item.label}
                            </PaginationLink>
                          )}
                          {isNext && (
                            <PaginationNext
                              isDisabled={
                                dataDocumentsPolicy.current_page ===
                                dataDocumentsPolicy.last_page
                              }
                              onClick={() =>
                                dataDocumentsPolicy.current_page <
                                  dataDocumentsPolicy.last_page &&
                                handlePageChange(
                                  dataDocumentsPolicy.current_page + 1
                                )
                              }
                            />
                          )}
                        </PaginationItem>
                      )
                    })
                  ) : (
                    <>
                      <PaginationItem>
                        <PaginationPrevious
                          isDisabled={dataDocumentsPolicy.current_page === 1}
                          onClick={() =>
                            dataDocumentsPolicy.current_page > 1 &&
                            handlePageChange(
                              dataDocumentsPolicy.current_page - 1
                            )
                          }
                        />
                      </PaginationItem>
                      {[...Array(dataDocumentsPolicy.last_page)].map(
                        (_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={
                                dataDocumentsPolicy.current_page === index + 1
                              }
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          isDisabled={
                            dataDocumentsPolicy.current_page ===
                            dataDocumentsPolicy.last_page
                          }
                          onClick={() =>
                            dataDocumentsPolicy.current_page <
                              dataDocumentsPolicy.last_page &&
                            handlePageChange(
                              dataDocumentsPolicy.current_page + 1
                            )
                          }
                        />
                      </PaginationItem>
                    </>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </Anim>
        </div>
      </section>
    </>
  )
}
