import React from "react"
import { ChemicalProductionFlowInteractive } from "@/app/[locale]/our-business/_components/ChemicalProductionFlowInteractive"
import { Locale, ProductionFlowData } from "../types"
import { pickText } from "../utils"

interface ProductionFlowBlockProps {
  data: ProductionFlowData
  locale: Locale
}

export const ProductionFlowBlock: React.FC<ProductionFlowBlockProps> = ({
  data,
  locale,
}) => {
  const title = pickText(locale, data.title_en, data.title_id)
  const description = pickText(
    locale,
    data.description_en,
    data.description_id
  )

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start md:gap-10">
          <div className="md:col-span-7">
            <p className="text-sm leading-relaxed text-slate-700 md:text-base md:leading-[1.7]">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <h2 className="text-2xl font-bold leading-snug text-slate-900 md:text-[32px]">
              {title}
            </h2>
          </div>
        </div>

        <ChemicalProductionFlowInteractive locale={locale} />
      </div>
    </section>
  )
}
