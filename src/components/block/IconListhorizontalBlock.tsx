"use client"

import { MetaIconListHorizontal } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Anim from "../global/Anim"

export function IconListhorizontalBlock({
  description_en,
  description_id,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaIconListHorizontal) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative py-6 lg:py-20">
        <div className="container">
          <div className="mb-10 space-y-4 text-center">
            <Anim>
              <div className="mx-auto max-w-lg">
                <h2 className="text-pretty text-2xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </h2>
              </div>
              <div className="mx-auto max-w-xl">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                ></div>
              </div>
            </Anim>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Anim>
              {getLocalizedContent(locale, list_en, list_id).map((item, i) => (
                <div key={i}>
                  <div className="relative mb-3 aspect-square w-16">
                    {assetUrl(item.icon) && (
                      <Image
                        src={assetUrl(item.icon)!}
                        alt="ic-temp"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: item.description! }}
                  />
                </div>
              ))}
            </Anim>
          </div>
        </div>
      </div>
    </>
  )
}
