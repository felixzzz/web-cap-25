import React from "react"
import Link from "next/link"
import { Locale, ZigzagFeatureListData } from "../types"
import { pickText, resolveBlockImage, resolveLocaleHref } from "../utils"

interface ZigzagFeatureListBlockProps {
  data: ZigzagFeatureListData
  locale: Locale
}

export const ZigzagFeatureListBlock: React.FC<ZigzagFeatureListBlockProps> = ({
  data,
  locale,
}) => {
  const sectionTitle = pickText(locale, data.title_en, data.title_id)

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {sectionTitle && (
          <h2 className="mb-10 text-2xl font-bold text-slate-900 md:text-[30px]">
            {sectionTitle}
          </h2>
        )}

        <div className="space-y-12 md:space-y-16">
          {data.items.map((item, idx) => {
            const title = pickText(locale, item.title_en, item.title_id)
            const description = pickText(
              locale,
              item.description_en,
              item.description_id
            )
            const ctaLabel = pickText(
              locale,
              item.cta_label_en,
              item.cta_label_id
            )
            const imgSrc = resolveBlockImage(item.image)
            const isImageRight =
              item.image_position === "right" ||
              (!item.image_position && idx % 2 === 1)

            return (
              <div
                key={idx}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                <div
                  className={`md:col-span-5 ${
                    isImageRight ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                    <img
                      src={imgSrc}
                      alt={title || sectionTitle || "Feature"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`md:col-span-7 ${
                    isImageRight ? "md:order-1" : "md:order-2"
                  }`}
                >
                  {title && (
                    <h3 className="mb-3 text-xl font-bold text-slate-900 md:text-2xl">
                      {title}
                    </h3>
                  )}
                  <div
                    className="text-sm leading-relaxed text-slate-700 md:text-base md:leading-[1.7]"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                  {ctaLabel && item.cta_url && (
                    <div className="mt-6">
                      <Link
                        href={resolveLocaleHref(locale, item.cta_url)}
                        className="inline-flex items-center rounded-full bg-[#1C64B0] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#144E8C] sm:text-sm"
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
