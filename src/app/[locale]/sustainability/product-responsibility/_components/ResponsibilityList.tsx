import React from "react"
import Image from "next/image"
import { getLocalizedContent, isContentActive, assetUrl } from "@/lib/utils"
import { useLocale } from "next-intl"
import { ContentProductResponsibility } from "@/lib/types"

function RenderItems({
  status,
  order,
  title,
  description,
}: {
  status?: string
  order?: string
  title?: string
  description?: string
}) {
  return (
    <>
      {status === "active" && (
        <div className="flex gap-4">
          <div className="block">
            <div className="flex size-8 items-center justify-center rounded-full bg-light-blue text-base font-bold text-white">
              {order}
            </div>
          </div>
          <div className="block">
            <div
              className="text-lg font-bold leading-7"
              dangerouslySetInnerHTML={{
                __html: title || "",
              }}
            />
            <div
              className="mt-1.5 text-xs leading-[18px] tracking-[0.12px]"
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function ResponsibilityList({
  status_id,
  image_id,
  list_id,
  status_en,
  image_en,
  list_en,
  title2_id,
  title2_en,
  description_id,
  description_en,
}: ContentProductResponsibility) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const imageSrc = image_id
  const listing = getLocalizedContent(locale, list_en, list_id)

  return (
    <>
      <div className={`relative py-4 lg:py-16`}>
        <div className={"container"}>
          <div className={`grid grid-cols-1 lg:grid-cols-12 lg:gap-10`}>
            <div className={`col-span-5`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={assetUrl(imageSrc) || ""}
                  alt="img-card"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-7 flex items-center justify-center py-5">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  {getLocalizedContent(locale, title2_en, title2_id)}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                />
                <div className="flex flex-col gap-6 pt-4">
                  {listing?.length > 0 &&
                    listing?.map((res, i) => <RenderItems key={i} {...res} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
