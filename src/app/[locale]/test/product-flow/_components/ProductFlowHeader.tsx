"use client"

import React from "react"
import { PRODUCT_FLOW_DATA, NodeCategory } from "../_data/productFlowData"
import { ZoomIn, ZoomOut, RotateCcw, Smartphone, Monitor, Info, Layers } from "lucide-react"

interface ProductFlowHeaderProps {
  locale: "id" | "en"
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  activeCategory: NodeCategory | "all"
  onSelectCategory: (cat: NodeCategory | "all") => void
  viewMode: "diagram" | "steps"
  onToggleViewMode: (mode: "diagram" | "steps") => void
}

export const ProductFlowHeader: React.FC<ProductFlowHeaderProps> = ({
  locale,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  activeCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
}) => {
  const { meta, categories } = PRODUCT_FLOW_DATA

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0082C8] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            {meta.subtitle[locale]}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#062C48] tracking-tight leading-tight">
            {meta.title[locale]}
          </h1>
          {locale === "id" && (
            <p className="text-base sm:text-lg font-medium text-slate-500">
              {meta.title.en}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
            {meta.description[locale]}
          </p>
          {locale === "id" && (
            <p className="text-xs sm:text-sm text-slate-400 italic">
              {meta.description.en}
            </p>
          )}
        </div>

        {/* Action Controls toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm self-start">
          {/* Mobile/Desktop View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onToggleViewMode("diagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "diagram"
                  ? "bg-white text-[#0082C8] shadow-sm"
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
                  ? "bg-white text-[#0082C8] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Step-by-Step Pipeline Flow"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{locale === "id" ? "Daftar Alur" : "Step View"}</span>
            </button>
          </div>

          {/* Zoom controls (Active in diagram mode) */}
          {viewMode === "diagram" && (
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
              <button
                onClick={onZoomOut}
                disabled={zoom <= 0.6}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700 w-12 text-center select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={onZoomIn}
                disabled={zoom >= 1.5}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={onResetZoom}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Reset Zoom & Pan"
                aria-label="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Category Filter Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50/90 p-3 sm:p-4 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Layers className="w-4 h-4 text-[#0082C8]" />
          <span>{locale === "id" ? "Filter Kategori:" : "Legend / Category Filter:"}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* All Button */}
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
              activeCategory === "all"
                ? "bg-[#062C48] text-white border-[#062C48] scale-105"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {locale === "id" ? "Semua Simpul" : "All Elements"}
          </button>

          {/* Individual Category Badges */}
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? "all" : cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 shadow-sm ${
                  isSelected
                    ? "ring-2 ring-offset-1 ring-[#0082C8] scale-105 font-bold shadow-md"
                    : "opacity-90 hover:opacity-100"
                } ${
                  cat.id === "facility"
                    ? "bg-[#0082C8] text-white border-[#0082C8]"
                    : cat.id === "customer"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : cat.id === "product"
                    ? "bg-white text-[#0082C8] border-[#00A3E0]"
                    : "bg-white text-[#062C48] border-slate-300"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    cat.id === "facility"
                      ? "bg-sky-200"
                      : cat.id === "customer"
                      ? "bg-amber-400"
                      : cat.id === "product"
                      ? "bg-[#00A3E0]"
                      : "bg-[#062C48]"
                  }`}
                />
                <span>{cat.label[locale]}</span>
              </button>
            )
          })}
        </div>

        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-[#00A3E0]" />
          <span>{locale === "id" ? "Klik simpul manapun untuk melihat detail" : "Click any node to view detailed specs & connections"}</span>
        </div>
      </div>
    </div>
  )
}
