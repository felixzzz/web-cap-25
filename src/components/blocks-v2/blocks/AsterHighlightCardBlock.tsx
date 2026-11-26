import React from "react"
import Link from "next/link"
import { AsterHighlightCardData, Locale } from "../types"
import { pickText, resolveLocaleHref } from "../utils"

interface AsterHighlightCardBlockProps {
  data: AsterHighlightCardData
  locale: Locale
}

export const AsterHighlightCardBlock: React.FC<
  AsterHighlightCardBlockProps
> = ({ data, locale }) => {
  const title = pickText(locale, data.title_en, data.title_id)
  const description = pickText(
    locale,
    data.description_en,
    data.description_id
  )
  const ctaLabel = pickText(locale, data.cta_label_en, data.cta_label_id)
  const href = resolveLocaleHref(locale, data.cta_url)
  const isExternal = href.startsWith("http://") || href.startsWith("https://")

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[#071D3B] p-8 text-white shadow-lg md:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <h2 className="text-2xl font-bold leading-snug text-white md:text-[30px]">
                  {title}
                </h2>
                <div
                  className="mt-4 text-sm leading-relaxed text-slate-200 md:text-[15px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                <div className="mt-7">
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center rounded-full border border-white/70 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#071D3B]"
                  >
                    {ctaLabel}
                  </Link>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-2.5">
                <span className="inline-block h-6 w-6 rounded-full bg-white/95 ring-4 ring-white/20" />
                <span className="text-lg font-semibold tracking-tight text-white">
                  Aster
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {data.products.map((product, index) => (
                  <div
                    key={index}
                    className="text-base font-medium text-[#70B5E8] transition-colors hover:text-white md:text-lg"
                  >
                    {product}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
