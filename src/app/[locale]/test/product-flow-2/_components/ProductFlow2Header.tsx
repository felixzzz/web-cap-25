"use client"

import React from "react"
import { PRODUCT_FLOW_2_DATA, Flow2Zone } from "../_data/productFlow2Data"
import { Monitor, Smartphone, Sparkles, Filter } from "lucide-react"

interface ProductFlow2HeaderProps {
  locale: "id" | "en"
  activeZone: Flow2Zone | "all"
  onSelectZone: (zone: Flow2Zone | "all") => void
  viewMode: "diagram" | "steps"
  onToggleViewMode: (mode: "diagram" | "steps") => void
}

export const ProductFlow2Header: React.FC<ProductFlow2HeaderProps> = ({
  locale,
  activeZone,
  onSelectZone,
  viewMode,
  onToggleViewMode,
}) => {
  const { meta } = PRODUCT_FLOW_2_DATA

  const zoneFilters: Array<{ id: Flow2Zone | "all"; label: { id: string; en: string } }> = [
    { id: "all", label: { id: "Semua Zona", en: "All Sectors" } },
    { id: "upstream", label: { id: "Upstream Industry (Hulu)", en: "Upstream Industry" } },
    { id: "intermediate", label: { id: "Intermediate Industry (Antara)", en: "Intermediate Industry" } },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0082C8] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#0082C8] animate-pulse" />
            {meta.subtitle[locale]}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#062C48] tracking-tight leading-tight">
            {meta.title[locale]}
          </h1>
          {locale === "id" && (
            <p className="text-sm sm:text-base font-medium text-slate-500">
              {meta.title.en}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
            {meta.description[locale]}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2.5 shrink-0 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs self-start">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onToggleViewMode("diagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "diagram"
                  ? "bg-white text-[#0082C8] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Interactive Flow Diagram"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{locale === "id" ? "Peta Diagram" : "Diagram Map"}</span>
            </button>
            <button
              onClick={() => onToggleViewMode("steps")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "steps"
                  ? "bg-white text-[#0082C8] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Step-by-Step Pipeline Flow"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{locale === "id" ? "Daftar Alur" : "Step View"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Zone */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5 text-[#0082C8]" />
            <span>{locale === "id" ? "Sektor:" : "Sector:"}</span>
          </div>

          {zoneFilters.map((zf) => {
            const isActive = activeZone === zf.id

            return (
              <button
                key={zf.id}
                onClick={() => onSelectZone(zf.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all border ${
                  isActive
                    ? "bg-[#0082C8] text-white border-[#0082C8] shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {zf.label[locale]}
              </button>
            )
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {locale === "id"
            ? "Klik simpul mana saja untuk membuka jendela modal spesifikasi"
            : "Click any node to open the detailed modal specification"}
        </div>
      </div>
    </div>
  )
}

