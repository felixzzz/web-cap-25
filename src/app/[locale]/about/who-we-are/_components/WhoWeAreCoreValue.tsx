"use client"

import Anim from "@/components/global/Anim"
import { MetaAboutCoreValues } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function WhoWeAreCoreValue({
  status_en,
  status_id,
  title_en,
  title_id,
  value_en,
  value_id,
}: MetaAboutCoreValues) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="relative">
        <Anim>
          <div className="grid grid-cols-2 *:transition-all lg:grid-cols-6">
            {getLocalizedContent(locale, value_en, value_id)?.map(
              (core, indexCore) => (
                <Image
                  key={indexCore}
                  className="h-full w-full object-cover first:brightness-100 first:grayscale-0 hover:brightness-100 hover:grayscale-0 lg:brightness-50 lg:grayscale-[0.5]"
                  src={assetUrl(core.image) || ""}
                  width={241}
                  height={442}
                  alt=""
                />
              )
            )}
          </div>
        </Anim>
      </section>
    </>
  )
}
