import { IntroBlock } from "@/components/block/IntroBlock"
import { MockMetaIntro } from "@/components/block/mock"
import { MetaHomeBusinessSolutions, MetaIntro } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import React from "react"

export default function CyberSecurity({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  card_en,
  card_id,
}: MetaHomeBusinessSolutions) {
  const locale = useLocale()

  const MetaIntroData = {
    description_en,
    description_id,
    status_en,
    status_id,
    title_en,
    title_id,
  } as MetaIntro

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <IntroBlock {...MetaIntroData} />
      <div className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {getLocalizedContent(locale, card_en, card_id)?.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
