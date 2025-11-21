"use client"

import Anim from "@/components/global/Anim"
import DownloadItem from "@/components/global/DownloadItem"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { iconEye, iconPlus, imgTempCorporate } from "@/data/images"
import {
  MetaDocumentItem,
  MetaGovernanceCorporateSecretary,
} from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GovernanceCorporate({
  description_en,
  description_id,
  file_en,
  file_id,
  file_title_en,
  file_title_id,
  image_en,
  image_id,
  position_en,
  position_id,
  status_en,
  status_id,
  title_en,
  title_id,
  name_id,
  name_en,
  cv_en,
  cv_id,
  popup_description_en,
  popup_description_id,
  dataDocumentsCorporate,
}: MetaGovernanceCorporateSecretary & {
  dataDocumentsCorporate: MetaDocumentItem
}) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section>
        <div className="container py-8 lg:pb-[81px] lg:pt-[66px]">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="mr-0 w-full lg:mr-4 lg:w-3/12">
              <Anim>
                <Dialog>
                  <DialogTrigger className="cursor-pointer">
                    <div>
                      <Image
                        src={assetUrl(image_id) || ""}
                        alt="img-corporate"
                        width={302}
                        height={302}
                        className="rounded-3xl object-cover"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="gap-0 overflow-y-scroll border-0 p-0 max-[992px]:max-h-full sm:max-h-full sm:max-w-[982px] sm:!rounded-t-[25px]">
                    <DialogHeader className="sticky top-0 z-10 bg-[#2A3D7F] px-4 py-4 sm:rounded-t-3xl lg:px-10 lg:py-8">
                      <DialogTitle className="text-lg font-bold text-white">
                        {getLocalizedContent(locale, name_en, name_id)}
                      </DialogTitle>
                      <DialogDescription className="text-white/50">
                        {getLocalizedContent(locale, position_id, position_id)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 px-4 py-8 lg:px-10">
                      <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-4/12">
                          <AspectRatio ratio={1 / 1} className="mb-4">
                            <Image
                              src={assetUrl(image_id) || ""}
                              alt="img-corporate"
                              fill
                              className="rounded-3xl border object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <div className="custom-scrollbar w-full pl-0 lg:max-h-[469px] lg:w-8/12 lg:overflow-auto lg:pl-10 lg:pr-4">
                          {getLocalizedContent(
                            locale,
                            popup_description_en,
                            popup_description_id
                          ) && (
                            <div
                              className="prose text-md"
                              dangerouslySetInnerHTML={{
                                __html: getLocalizedContent(
                                  locale,
                                  popup_description_en,
                                  popup_description_id
                                ),
                              }}
                            />
                          )}
                          {getLocalizedContent(
                            locale,
                            cv_en.path,
                            cv_id.path
                          ) && (
                            <div className="mt-6">
                              <Link
                                target="_blank"
                                href={
                                  assetUrl(
                                    getLocalizedContent(
                                      locale,
                                      cv_en.path,
                                      cv_id.path
                                    )
                                  )!
                                }
                                className="flex cursor-pointer justify-between rounded-lg border border-blue-tint px-5 py-3 text-blue-tint"
                              >
                                <div className="text-sm font-bold">
                                  CV -{" "}
                                  {getLocalizedContent(
                                    locale,
                                    name_en,
                                    name_id
                                  )}
                                </div>
                                <div className="flex flex-row gap-1">
                                  <div className="text-sm">PDF</div>
                                  <ChevronRight
                                    width={16}
                                    className="my-auto"
                                    height={16}
                                    color="#337ABC"
                                  />
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {getLocalizedContent(locale, name_en, name_id) && (
                  <div className="mt-4 text-lg font-bold">
                    {getLocalizedContent(locale, name_en, name_id)}
                  </div>
                )}
                <div className="mt-1 text-sm text-gray">
                  {getLocalizedContent(locale, position_id, position_id)}
                </div>
                {dataDocumentsCorporate && (
                  <div className="mt-6">
                    <DownloadItem
                      onlyTitle
                      isCard
                      classNameTitle="text-md lg:text-lg mb-5"
                      {...dataDocumentsCorporate}
                    />
                  </div>
                )}
              </Anim>
            </div>
            <div className="w-full lg:w-9/12 lg:pl-6">
              <Anim>
                <div className="text-3xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </div>
                <div
                  className="prose mt-6 flex flex-col text-md tracking-[0.16px] prose-p:mt-0 prose-ol:mt-0"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                />
              </Anim>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
