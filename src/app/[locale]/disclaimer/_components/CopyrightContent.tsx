"use client"

import { MetaCopyrightContent } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function CopyrightContent({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaCopyrightContent) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="mt-12 text-xl font-bold">
        {getLocalizedContent(locale, title_en, title_id)}
      </div>
      <div
        className="prose mt-4"
        dangerouslySetInnerHTML={{
          __html: getLocalizedContent(locale, description_en, description_id),
        }}
      />
    </>
  )
}
