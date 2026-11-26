import React from "react"
import { HeroBannerData, Locale } from "../types"
import { pickText, resolveBlockImage } from "../utils"

interface HeroBannerBlockProps {
  data: HeroBannerData
  locale: Locale
}

export const HeroBannerBlock: React.FC<HeroBannerBlockProps> = ({
  data,
  locale,
}) => {
  const eyebrow = pickText(locale, data.eyebrow_en, data.eyebrow_id)
  const title = pickText(locale, data.title_en, data.title_id)
  const alt = pickText(locale, data.alt_en, data.alt_id) || title
  const bgImage = resolveBlockImage(data.background_image)

  return (
    <section className="relative w-full min-h-[460px] md:min-h-[600px] lg:min-h-[680px] flex items-end overflow-hidden bg-slate-900">
      <img
        src={bgImage}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/15" />

      <div className="container relative z-10 pb-12 pt-32 md:pb-16 lg:pb-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[44px] lg:leading-[1.18]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
