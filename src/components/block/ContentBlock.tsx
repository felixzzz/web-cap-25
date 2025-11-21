"use client"

import { MetaContentBlock } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function ContentBlock({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  isHaveStatus = false,
}: MetaContentBlock & { isHaveStatus?: boolean }) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id) && isHaveStatus)
    return <></>

  return (
    <>
      <section className="container pb-10 pt-[96px] lg:px-[109px] lg:pb-[80px] lg:pt-[128px]">
        <div className="text-xl font-bold">
          {getLocalizedContent(locale, title_en, title_id)}
        </div>
        <div
          className="prose mt-4"
          dangerouslySetInnerHTML={{
            __html: getLocalizedContent(locale, description_en, description_id),
          }}
        />
      </section>
    </>
  )
}
