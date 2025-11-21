"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { iconEye, iconPdf, imgTempInternalAudit } from "@/data/images"
import { MetaGovernanceInternalAudit } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function GovernanceInternalAudit({
  description_en,
  description_id,
  file_en,
  file_id,
  file_title_en,
  file_title_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaGovernanceInternalAudit) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  const isFileExist =
    file_en?.path && file_id?.path && file_title_en && file_title_id

  return (
    <>
      <section className="container">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-5/12">
            <Anim>
              <div className="text-3xl font-bold">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
              <div
                className="prose mt-4 max-w-[520px] text-md tracking-[0.16px]"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(
                    locale,
                    description_en,
                    description_id
                  ),
                }}
              />
              {isFileExist && (
                <div className="mt-6 rounded-xl border bg-white p-6">
                  <div className="flex flex-col lg:flex-row">
                    <div className="my-auto mr-auto text-md font-bold">
                      {getLocalizedContent(
                        locale,
                        file_title_en,
                        file_title_id
                      )}
                    </div>
                    <div className="mt-3 flex flex-row lg:mt-0">
                      <a
                        className="mr-6 cursor-pointer"
                        href={
                          assetUrl(
                            getLocalizedContent(
                              locale,
                              file_en.path,
                              file_id.path
                            )
                          ) || ""
                        }
                        target="_blank"
                      >
                        <Image className="my-auto" src={iconPdf} alt="" />
                      </a>
                      <Button
                        className="group cursor-pointer px-3"
                        variant="outline-primary"
                        asChild
                      >
                        <a
                          className="flex"
                          href={
                            assetUrl(
                              getLocalizedContent(
                                locale,
                                file_en.path,
                                file_id.path
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
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Anim>
          </div>
          <div className="w-full lg:w-1/12"></div>
          <div className="w-full lg:w-6/12">
            <Anim>
              <AspectRatio ratio={4 / 3} className="mb-4">
                <Image
                  src={assetUrl(image_id) || ""}
                  alt="img-corporate"
                  fill
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </Anim>
          </div>
        </div>
      </section>
    </>
  )
}
