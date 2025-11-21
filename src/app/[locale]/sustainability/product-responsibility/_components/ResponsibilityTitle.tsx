import React from "react"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Anim from "@/components/global/Anim"

type MetaTitle = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
}

export default function ResponsibilityTitle({
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaTitle & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className={`relative py-12 lg:pb-4 lg:pt-20`}>
        <div className="container">
          <div className="w-full gap-10 lg:w-8/12">
            <Anim>
              <h3
                className="prose text-balance text-2xl font-bold lg:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(locale, title_en, title_id),
                }}
              />
            </Anim>
          </div>
        </div>
      </div>
    </>
  )
}
