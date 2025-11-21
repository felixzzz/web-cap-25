"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { MetaIntro } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function WhoWeAreChandraAsri({
  description_en,
  description_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaIntro) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="py-8 lg:py-[100px]">
        <div className="container">
          <div className="flex flex-col md:flex-row">
            <div className="my-auto w-full md:w-5/12">
              <Anim>
                <AspectRatio ratio={1 / 1} className="mb-4">
                  <Image
                    src={
                      assetUrl(
                        getLocalizedContent(locale, image_id, image_id)
                      ) || ""
                    }
                    alt="img-corporate"
                    fill
                    className="rounded-3xl object-cover"
                  />
                </AspectRatio>
              </Anim>
            </div>
            <div className="w-full md:w-1/12"></div>
            <div className="my-auto w-full md:w-6/12">
              <Anim>
                <div className="text-3xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </div>
                <div
                  className="prose mt-6 text-md"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    )!,
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
