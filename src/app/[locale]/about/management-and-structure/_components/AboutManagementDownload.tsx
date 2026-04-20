"use client"

import Anim from "@/components/global/Anim"
import DownloadItem from "@/components/global/DownloadItem"
import { Button } from "@/components/ui/button"
import { iconEye, iconPdf, iconPlus } from "@/data/images"
import { MetaAboutDownload, MetaDocumentItem } from "@/lib/fragment"
import { adjustSearchParams, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function AboutManagementDownload({
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  dataAboutDownload,
  last_page,
  current_page,
}: MetaAboutDownload & { dataAboutDownload: MetaDocumentItem[]; last_page?: number; current_page?: number }) {
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = current_page || 1

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page_download", newPage.toString())
  }

  return (
    <section className="relative bg-surface">
      <div className="container pb-6 pt-8 lg:py-[80px]">
        <div className="flex flex-col gap-6 lg:justify-between lg:gap-10">
          <Anim>
            <div className="flex flex-row justify-between">
              <div className="my-auto text-xl font-bold lg:text-3xl">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
            </div>
            <div>
              <div className="mt-0 grid grid-cols-1 gap-6 lg:grid-cols-4">
                {dataAboutDownload?.map((document) => (
                  <DownloadItem isCard key={document.id} {...document} />
                ))}
              </div>
              {last_page !== undefined && last_page > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        isDisabled={page === 1}
                        onClick={() => page > 1 && handlePageChange(page - 1)}
                      />
                    </PaginationItem>
                    {[...Array(last_page)].map((_, index) => (
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
                        isDisabled={page === last_page}
                        onClick={() =>
                          page < last_page && handlePageChange(page + 1)
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </Anim>
        </div>
      </div>
    </section>
  )
}
