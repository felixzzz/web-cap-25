import React from "react"
import { FacilitiesGridData, Locale } from "../types"
import { pickText, resolveBlockImage } from "../utils"

interface FacilitiesGridBlockProps {
  data: FacilitiesGridData
  locale: Locale
}

export const FacilitiesGridBlock: React.FC<FacilitiesGridBlockProps> = ({
  data,
  locale,
}) => {
  const title = pickText(locale, data.title_en, data.title_id)

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {title && (
          <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-[30px]">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, idx) => {
            const description = pickText(
              locale,
              item.description_en,
              item.description_id
            )
            const imgSrc = resolveBlockImage(item.image)

            return (
              <article key={idx} className="flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-[13px]">
                  {description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
