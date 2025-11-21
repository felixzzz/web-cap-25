import { MetaInformation } from "@/lib/types"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import React from "react"

export function ThreeBasicComponent({
  card_en,
  card_id,
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaInformation) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="relative py-10 lg:py-14">
      <div className="container">
        <h2 className="mb-10 max-w-xl text-xl font-bold">
          {getLocalizedContent(locale, title_en, title_id)}
        </h2>
        <div
          className="max-w-xl text-sm"
          dangerouslySetInnerHTML={{
            __html: getLocalizedContent(locale, description_en, description_id),
          }}
        ></div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {getLocalizedContent(locale, card_en, card_id)?.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-light-blue font-bold text-white">
                {i + 1}
              </div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
