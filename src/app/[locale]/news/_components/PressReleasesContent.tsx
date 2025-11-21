import { MetaDocumentItem } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import { iconSearch } from "@/data/images"
import Image from "next/image"
import { adjustSearchParams } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQueryPressReleases } from "@/lib/hooks"
import { keepPreviousData } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import DownloadItem, {
  DownloadItemSkeleton,
} from "@/components/global/DownloadItem"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import DownloadItemPressRelease from "@/components/global/DownloadItemPressRelease"

export default function PressReleasesContent({
  data,
}: {
  data: PaginationHandlerResponse<MetaDocumentItem[]>
}) {
  const router = useRouter()
  const [search, setSearch] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const debounceSearch = useDebounce(search, 500)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  useEffect(() => {
    if (typeof debounceSearch === "undefined") return
    adjustSearchParams(searchParams, router, "page", "1")
    adjustSearchParams(searchParams, router, "search", debounceSearch)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  // useEffect(() => {
  //   refetch()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, debounceSearch])

  // useEffect(() => {
  //   if (searchParams.get("page")) {
  //     setPage(Number(searchParams.get("page")))
  //   }
  // }, [page, searchParams])

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearch(searchParams.get("search")!)
    }
  }, [searchParams])

  return (
    <>
      <div className="relative w-full">
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
          value={search}
          onChange={handleOnChange}
        />
      </div>
      <div className="mt-4 flex flex-col">
        {/* {(isLoading || isFetching) && (
          <>
            <DownloadItemSkeleton />
          </>
        )} */}
        {/* {!isLoading && !isFetching && data?.data?.length === 0 ? (
          <BlankSpaceContent className="text-center" />
        ) : (
          data?.data?.map((item) => (
            <DownloadItem isHaveCheckbox key={item.id} {...item} />
          ))
        )} */}
        {data?.data?.map((item) => (
          <DownloadItemPressRelease key={item.id} {...item} />
        ))}
      </div>
      {data?.last_page > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            {data.links.map((item, index) => {
              return (
                <PaginationItem key={`${item.label}-${index}`}>
                  {item.label.toLowerCase().includes("previous") && (
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
                      onClick={() => handlePageChange(parseInt(item.label))}
                    >
                      {item.label}
                    </PaginationLink>
                  )}
                  {item.label === "..." && index === 11 && (
                    <PaginationLink>...</PaginationLink>
                  )}
                  {item.label.toLowerCase().includes("next") && (
                    <PaginationNext
                      isDisabled={data.current_page === data.last_page}
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
    </>
  )
}
