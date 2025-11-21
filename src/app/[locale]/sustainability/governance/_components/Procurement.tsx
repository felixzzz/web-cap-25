import { IntroBlock } from "@/components/block/IntroBlock"
import { MockMetaIntro } from "@/components/block/mock"
import { icTempPowerGeneration } from "@/data/images"
import { MetaIntro, MetaProcurement } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import React from "react"

export default function Procurement({
  description_en,
  description_id,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaProcurement) {
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
      <IntroBlock className="bg-slate-50" {...MetaIntroData} />

      <div className="bg-slate-50 py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {getLocalizedContent(locale, list_en, list_id)?.map((item, i) => (
              <div key={i}>
                <div className="relative mb-4 aspect-square w-10 lg:top-2">
                  <Image
                    src={assetUrl(item.icon)!}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  {/* <h3 className="mb-2 text-lg font-bold">
                    Design for Circularity
                  </h3> */}
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
