"use client"

import Anim from "@/components/global/Anim"
import { CardItem } from "@/components/global/CardItem"
import { MetaHomeBusinessSolutions } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function HomeDrivingChange({
  card_en,
  card_id,
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaHomeBusinessSolutions) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }
  return (
    <div className="bg-surface">
      <div className="container overflow-clip pb-5 pt-6 lg:py-20">
        <Anim>
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-6">
            <div className="mb-auto max-w-[600px] text-xl font-bold lg:text-4xl">
              {getLocalizedContent(locale, title_en, title_id)}
            </div>
            <div
              className="prose max-w-[516px] text-md tracking-[0.16px]"
              dangerouslySetInnerHTML={{
                __html:
                  getLocalizedContent(locale, description_en, description_id) ||
                  "",
              }}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-6">
            {getLocalizedContent(locale, card_en, card_id)?.map(
              (item, indexItem) => (
                <CardItem
                  key={indexItem}
                  href={item.cta_url}
                  title={item.title}
                  desc={item.description}
                  bg={assetUrl(item.image)}
                  cta_label={item.cta_label}
                  className="max-lg:h-[218px] max-lg:rounded-xl max-lg:px-[14px] max-lg:py-4"
                  alt=""
                />
              )
            )}
          </div>
        </Anim>
      </div>
    </div>
  )
}
