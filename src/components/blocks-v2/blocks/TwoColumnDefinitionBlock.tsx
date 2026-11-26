import React from "react"
import { Locale, TwoColumnDefinitionData } from "../types"
import { pickList, pickText } from "../utils"

interface TwoColumnDefinitionBlockProps {
  data: TwoColumnDefinitionData
  locale: Locale
}

export const TwoColumnDefinitionBlock: React.FC<
  TwoColumnDefinitionBlockProps
> = ({ data, locale }) => {
  const title = pickText(locale, data.title_en, data.title_id)
  const paragraphs = pickList(locale, data.paragraphs_en, data.paragraphs_id)

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold leading-snug text-slate-900 md:text-[32px] md:leading-[1.25]">
              {title}
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:col-span-7 md:text-base md:leading-[1.7]">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
