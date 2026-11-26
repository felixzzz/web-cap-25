import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CtaBannerData, Locale } from "../types"
import { pickText, resolveBlockImage, resolveLocaleHref } from "../utils"

interface CtaBannerBlockProps {
  data: CtaBannerData
  locale: Locale
}

const BRAND_LABEL_MAP: Record<string, string> = {
  "chandra-asri": "Chandra Asri",
  aster: "Aster",
  cdi: "Chandra Daya Investasi",
  cass: "Chandra Asri Sentral Solusi",
}

export const CtaBannerBlock: React.FC<CtaBannerBlockProps> = ({
  data,
  locale,
}) => {
  const title = pickText(locale, data.title_en, data.title_id)
  const description = pickText(
    locale,
    data.description_en,
    data.description_id
  )
  const ctaLabel = pickText(locale, data.cta_label_en, data.cta_label_id)
  const href = resolveLocaleHref(locale, data.cta_url)
  const isExternal = href.startsWith("http://") || href.startsWith("https://")
  const bgImage = resolveBlockImage(data.background_image)
  const brandLabel = BRAND_LABEL_MAP[data.brand || "chandra-asri"] || "Chandra Asri"

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[#0D213F] px-6 py-14 text-center text-white shadow-lg sm:px-12 md:py-20">
          <img
            src={bgImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D3D]/85 via-[#0F274D]/80 to-[#0A1D3D]/90" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2.5">
              <span className="inline-block h-6 w-6 rounded-full bg-white/90 ring-4 ring-white/20" />
              <span className="text-lg font-semibold tracking-tight text-white">
                {brandLabel}
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-snug text-white md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              {description}
            </p>

            <div className="mt-8">
              <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-[#007EC6] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0068A5]"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
