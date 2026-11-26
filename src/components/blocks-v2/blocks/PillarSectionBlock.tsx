"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Locale, PillarSectionData } from "../types"
import { pickText, resolveBlockImage, resolveLocaleHref } from "../utils"

interface PillarSectionBlockProps {
  data: PillarSectionData
  locale: Locale
}

export const PillarSectionBlock: React.FC<PillarSectionBlockProps> = ({
  data,
  locale,
}) => {
  const sectionTitle = pickText(
    locale,
    data.section_title_en,
    data.section_title_id
  )
  const [activeId, setActiveId] = useState<string>(data.items[0]?.id || "")

  const handleSelect = (id: string) => {
    setActiveId(id)
    const el = document.getElementById(`pillar-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {sectionTitle && (
          <h2 className="mb-8 text-2xl font-bold text-slate-900 md:mb-10 md:text-[28px]">
            {sectionTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Sticky left vertical indicator */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28 space-y-1">
              {data.items.map((item) => {
                const label = pickText(
                  locale,
                  item.nav_label_en,
                  item.nav_label_id
                )
                const isActive = activeId === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`group flex w-full items-center gap-4 py-3 text-left transition-colors ${
                      isActive
                        ? "text-[#0070B8] font-semibold"
                        : "text-slate-500 hover:text-slate-800 font-medium"
                    }`}
                  >
                    <span
                      className={`h-14 w-1 rounded-full transition-colors ${
                        isActive ? "bg-[#0070B8]" : "bg-slate-200"
                      }`}
                    />
                    <span className="text-base leading-snug">{label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Right pillar cards */}
          <div className="space-y-8 lg:col-span-9">
            {data.items.map((item) => {
              const badge = pickText(
                locale,
                item.badge_label_en || item.nav_label_en,
                item.badge_label_id || item.nav_label_id
              )
              const ctaLabel = pickText(
                locale,
                item.cta_label_en,
                item.cta_label_id
              )
              const description = pickText(
                locale,
                item.description_en,
                item.description_id
              )
              const href = resolveLocaleHref(locale, item.cta_url)
              const imgSrc = resolveBlockImage(item.banner_image)

              return (
                <article
                  key={item.id}
                  id={`pillar-${item.id}`}
                  onMouseEnter={() => setActiveId(item.id)}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-slate-800 sm:h-32">
                    <img
                      src={imgSrc}
                      alt={badge}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/35 to-slate-950/50" />

                    <div className="absolute inset-0 flex items-center justify-between gap-4 px-5 sm:px-7">
                      <span className="inline-flex items-center rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm sm:text-sm">
                        {badge}
                      </span>

                      <Link
                        href={href}
                        className="inline-flex items-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#0070B8] shadow-sm transition hover:bg-[#0070B8] hover:text-white sm:text-sm"
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div
                      className="text-sm leading-relaxed text-slate-700 sm:text-[15px] sm:leading-[1.7]"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
