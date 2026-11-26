import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Locale, ProductGridData } from "../types"
import { pickText, resolveBlockImage, resolveLocaleHref } from "../utils"

interface ProductGridBlockProps {
  data: ProductGridData
  locale: Locale
}

export const ProductGridBlock: React.FC<ProductGridBlockProps> = ({
  data,
  locale,
}) => {
  const title = pickText(locale, data.title_en, data.title_id)

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {title && (
          <h2 className="mb-8 max-w-md text-2xl font-bold leading-snug text-slate-900 md:text-[30px]">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, idx) => {
            const subtitle = pickText(
              locale,
              item.subtitle_en,
              item.subtitle_id
            )
            const ctaLabel = pickText(
              locale,
              item.cta_label_en,
              item.cta_label_id
            )
            const href = resolveLocaleHref(locale, item.cta_url)
            const imgSrc = resolveBlockImage(item.image)

            return (
              <Link
                key={idx}
                href={href}
                className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/10" />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-200">
                    {subtitle}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
