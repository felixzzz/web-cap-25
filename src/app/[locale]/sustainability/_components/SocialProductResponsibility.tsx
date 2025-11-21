import { icTempPowerGeneration } from "@/data/images"
import { MetaPointImage } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import React from "react"

export function SocialProductResponsibility({
  description_en,
  description_id,
  image_en,
  image_id,
  list_poin_en,
  list_poin_id,
  small_title_en,
  small_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaPointImage) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="py-10 lg:py-20">
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <h2 className="mb-4 max-w-md text-balance text-2xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {getLocalizedContent(locale, list_poin_en, list_poin_id)?.map(
            (item, i) => (
              <div key={i}>
                <div className="flex items-start gap-6">
                  <div className="relative aspect-square min-w-[56px] lg:top-2">
                    <Image
                      src={assetUrl(item.icon)!}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
