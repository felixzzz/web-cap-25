"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { imgCommisioner } from "@/data/images"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronRight } from "lucide-react"
import {
  MetaAboutManagement,
  MetaAboutStructure,
  MetaTopics,
  PostManagement,
} from "@/lib/fragment"
import { useLocale, useTranslations } from "next-intl"
import {
  adjustSearchParams,
  assetUrl,
  getLocalizedContent,
  isContentActive,
} from "@/lib/utils"
import { keepPreviousData } from "@tanstack/react-query"
import { useManagements } from "@/lib/hooks"
import { PaginationHandlerResponse } from "@/lib/types"
import ManagementItem, {
  ManagementItemSkeleton,
} from "@/components/global/ManagementItem"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"

export default function AboutManagementStructure({
  dataCategories,
  management,
  structure,
}: {
  dataCategories: MetaTopics[]
  management: MetaAboutManagement
  structure: MetaAboutStructure
}) {
  const locale = useLocale()
  const t = useTranslations("global")
  const router = useRouter()
  const [tab, setTab] = useState("management")
  const [tabManagement, setTabManagement] = useState(dataCategories?.[0]?.slug)
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [popupManagement, setPopupManagement] = useState<PostManagement | null>(
    null
  )

  const {
    data: dataManagements,
    isLoading,
    isFetching,
  } = useManagements({
    options: {
      enabled: true,
      placeholderData: keepPreviousData,
    },
    page: page,
    category_slug: tabManagement,
  })

  const handleTabChange = (value: string) => {
    setTab(value)
    const currentQuery = new URLSearchParams(window.location.search)
    currentQuery.set("tab", value)
    router.push(
      `/${locale}/about/management-and-structure?${currentQuery.toString()}`,
      {
        scroll: false,
      }
    )
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    adjustSearchParams(searchParams, router, "page", newPage.toString())
  }

  useEffect(() => {
    adjustSearchParams(searchParams, router, "management_type", tabManagement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabManagement])

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")))
    }
  }, [page, searchParams])

  return (
    <>
      <section className="py-8 lg:pb-20 lg:pt-12">
        <div className="container">
          <Tabs
            value={tab}
            className="min-h-[25vh]"
            onValueChange={handleTabChange}
          >
            <TabsList className="mb-6 flex w-full flex-row">
              {isContentActive(
                locale,
                management.status_en,
                management.status_id
              ) && (
                <TabsTrigger value="management">{t("management")}</TabsTrigger>
              )}
              {isContentActive(
                locale,
                structure.status_en,
                structure.status_id
              ) && (
                <TabsTrigger value="structure">{t("structure")}</TabsTrigger>
              )}
            </TabsList>
            {isContentActive(
              locale,
              management.status_en,
              management.status_id
            ) && (
              <TabsContent value="management">
                <Anim>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {dataCategories?.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => setTabManagement(item.slug)}
                        variant={
                          tabManagement === item.slug ? "blue" : "outline-blue"
                        }
                      >
                        {getLocalizedContent(locale, item.name_en, item.name)}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-[56px]">
                    <Dialog>
                      <>
                        {(isLoading || isFetching) && (
                          <>
                            <ManagementItemSkeleton />
                            <ManagementItemSkeleton />
                            <ManagementItemSkeleton />
                            <ManagementItemSkeleton />
                          </>
                        )}
                        {!isLoading &&
                        !isFetching &&
                        dataManagements?.data?.length === 0 ? (
                          <div className="col-span-4">
                            <BlankSpaceContent className="text-center" />
                          </div>
                        ) : (
                          !isLoading &&
                          !isFetching &&
                          dataManagements?.data.map((management) => (
                            <DialogTrigger
                              className="cursor-pointer"
                              key={management.id}
                              asChild
                            >
                              <div
                                onClick={() => setPopupManagement(management)}
                              >
                                <ManagementItem {...management} />
                              </div>
                            </DialogTrigger>
                          ))
                        )}
                      </>
                      <DialogContent className="gap-0 overflow-auto border-0 p-0 max-[992px]:max-h-full sm:max-h-full sm:max-w-[982px] sm:!rounded-t-[25px]">
                        <DialogHeader className="bg-[#2A3D7F] px-4 py-4 sm:rounded-t-3xl lg:px-10 lg:py-8">
                          <DialogTitle className="text-lg font-bold text-white">
                            {getLocalizedContent(
                              locale,
                              popupManagement?.meta?.list.name_en,
                              popupManagement?.meta?.list.name_id
                            )}
                          </DialogTitle>
                          <DialogDescription className="text-white/50">
                            {getLocalizedContent(
                              locale,
                              popupManagement?.meta?.list.position_en,
                              popupManagement?.meta?.list.position_id
                            )}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 px-4 py-8 lg:px-10">
                          <div className="flex flex-col lg:flex-row">
                            {popupManagement?.meta.list.picture_id && (
                              <div className="w-full lg:w-4/12">
                                <AspectRatio ratio={1 / 1} className="mb-4">
                                  <Image
                                    src={
                                      assetUrl(
                                        popupManagement?.meta.list.picture_id!
                                      )!
                                    }
                                    alt="img-corporate"
                                    fill
                                    className="rounded-3xl border object-cover"
                                  />
                                </AspectRatio>
                              </div>
                            )}
                            <div className="custom-scrollbar w-full pl-0 lg:max-h-[469px] lg:w-8/12 lg:overflow-auto lg:pl-10 lg:pr-4">
                              {getLocalizedContent(
                                locale,
                                popupManagement?.meta?.list.description_en,
                                popupManagement?.meta?.list.description_id
                              ) && (
                                <div
                                  className="prose text-md"
                                  dangerouslySetInnerHTML={{
                                    __html: getLocalizedContent(
                                      locale,
                                      popupManagement?.meta?.list
                                        .description_en,
                                      popupManagement?.meta?.list.description_id
                                    )!,
                                  }}
                                />
                              )}
                              {getLocalizedContent(
                                locale,
                                popupManagement?.meta?.list.document_list_en,
                                popupManagement?.meta?.list.document_list_id
                              )?.map((itemDocument) => (
                                <div key={itemDocument.title} className="mt-6">
                                  {itemDocument.cv && (
                                    <Link
                                      target="_blank"
                                      href={assetUrl(itemDocument.cv)!}
                                      className="flex cursor-pointer justify-between rounded-lg border border-blue-tint px-5 py-3 text-blue-tint"
                                    >
                                      <div className="text-sm font-bold">
                                        {itemDocument.title}
                                      </div>
                                      {itemDocument.format && (
                                        <div className="flex flex-row gap-1">
                                          <div className="text-sm">
                                            {itemDocument.format}
                                          </div>
                                          <ChevronRight
                                            width={16}
                                            className="my-auto"
                                            height={16}
                                            color="#337ABC"
                                          />
                                        </div>
                                      )}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {dataManagements && dataManagements?.last_page > 1 && (
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
                          {[...Array(dataManagements?.last_page)].map(
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
                              isDisabled={page === dataManagements?.last_page}
                              onClick={() =>
                                page < dataManagements?.last_page &&
                                handlePageChange(page + 1)
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </div>
                </Anim>
              </TabsContent>
            )}
            {isContentActive(
              locale,
              structure.status_en,
              structure.status_id
            ) && (
              <TabsContent value="structure">
                <Anim>
                  <div className="mb-12">
                    <div className="text-xl font-bold">
                      {getLocalizedContent(
                        locale,
                        structure.organization_title_en,
                        structure.organization_title_id
                      )}
                    </div>
                    <Image
                      src={assetUrl(structure.organization_image_id)!}
                      width={1280}
                      height={442}
                      className="w-full"
                      alt={getLocalizedContent(
                        locale,
                        structure.alt_text_image_organization_en,
                        structure.alt_text_image_organization_id
                      )}
                    />
                    <div
                      className="prose overflow-auto text-md"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedContent(
                          locale,
                          structure.organization_updated_date_en,
                          structure.organization_updated_date_id
                        ),
                      }}
                    />
                  </div>
                  <div className="py-12">
                    <div className="text-xl font-bold">
                      {getLocalizedContent(
                        locale,
                        structure.corperate_title_en,
                        structure.corperate_title_id
                      )}
                    </div>
                    <Image
                      src={assetUrl(structure.corperate_image_id) || ""}
                      width={1280}
                      height={1055}
                      className="w-full"
                      alt={getLocalizedContent(
                        locale,
                        structure.alt_text_image_corperate_en,
                        structure.alt_text_image_corperate_id
                      )}
                    />
                    <div
                      className="prose overflow-auto text-md"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedContent(
                          locale,
                          structure.corperate_updated_date_en,
                          structure.corperate_updated_date_id
                        ),
                      }}
                    />
                  </div>
                  <div className="pt-12">
                    <div className="text-[18px] font-bold">
                      {getLocalizedContent(
                        locale,
                        structure.table_title_en,
                        structure.table_title_id
                      )}
                    </div>
                    <div
                      className="prose mt-6 overflow-auto"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedContent(
                          locale,
                          structure?.content_en,
                          structure?.content_id
                        ),
                      }}
                    />
                  </div>
                </Anim>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </>
  )
}
