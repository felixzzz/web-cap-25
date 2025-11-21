import {
  ImageContentLeft,
  ImageContentRight,
  ImageContentWrapper,
} from "@/components/block/ContentLeftRightBlock"
import { IntroBlock } from "@/components/block/IntroBlock"
import { icTempPowerGeneration, imgTempCardItem } from "@/data/images"
import { MetaIntro, MetaPointGoveranance } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import React from "react"

export function AntiCorruption({
  description_en,
  description_id,
  image_en,
  image_id,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaPointGoveranance) {
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

      <section className="relative pb-10 lg:pb-14">
        <div className="container">
          <ImageContentWrapper className="gap-10 lg:gap-14">
            <ImageContentLeft>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={assetUrl(image_id)!}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </ImageContentLeft>
            <ImageContentRight>
              <div className="flex h-full w-full max-w-lg items-center justify-center">
                <div className="space-y-5">
                  {getLocalizedContent(locale, list_en, list_id)?.map(
                    (item, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <CheckCircle2
                              strokeWidth={1.5}
                              fill="#53C3D9"
                              color="#fff"
                              size={30}
                            />
                          </div>
                          <div>
                            <h3 className="mb-2 font-bold">{item.title}</h3>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </ImageContentRight>
          </ImageContentWrapper>
        </div>
      </section>
    </>
  )
}
