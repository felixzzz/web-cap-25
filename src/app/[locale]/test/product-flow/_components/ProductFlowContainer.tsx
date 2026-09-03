"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { NodeCategory } from "../_data/productFlowData"
import { ProductFlowHeader } from "./ProductFlowHeader"
import { ProductFlowDesktopDiagram } from "./ProductFlowDesktopDiagram"
import { ProductFlowMobileView } from "./ProductFlowMobileView"
import { NodeDetailModal } from "./NodeDetailModal"
import { Sparkles, ArrowRight, Layers } from "lucide-react"

interface ProductFlowContainerProps {
  locale: "id" | "en"
}

export const ProductFlowContainer: React.FC<ProductFlowContainerProps> = ({ locale }) => {
  const [zoom, setZoom] = useState<number>(1)
  const [activeCategory, setActiveCategory] = useState<NodeCategory | "all">("all")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"diagram" | "steps">("diagram")

  // Auto-adjust default view and zoom on mobile/tablet screens
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setZoom(0.65)
      } else if (width < 1280) {
        setZoom(0.85)
      } else {
        setZoom(1.0)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1.5, Math.round((prev + 0.1) * 10) / 10))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.6, Math.round((prev - 0.1) * 10) / 10))
  }

  const handleResetZoom = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280
    if (width < 768) {
      setZoom(0.65)
    } else if (width < 1280) {
      setZoom(0.85)
    } else {
      setZoom(1.0)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1540px] mx-auto space-y-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200/80">
        {/* Banner with Link to Approach 2 (XYFlow) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 border border-sky-200/80 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#062C48] text-white shadow-xs">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#062C48]">
                  Approach 1 (Interactive SVG Map)
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-[#0082C8]">
                  Standard Vector
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {locale === "id"
                  ? "Diagram vektor presisi tinggi dengan animasi alur & mode langkah mobile"
                  : "High-precision SVG vector canvas with flow tracing & mobile step mode"}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/test/product-flow-2`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-[#0082C8] border border-sky-300 hover:border-[#0082C8] shadow-xs transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0082C8]" />
            <span>{locale === "id" ? "Buka Pendekatan 2 (XYFlow Engine)" : "Try Approach 2 (XYFlow Engine)"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        {/* Header & Controls */}
        <ProductFlowHeader
          locale={locale}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Interactive View: Diagram Canvas or Step Pipeline */}
        {viewMode === "diagram" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0082C8] animate-pulse" />
                {locale === "id"
                  ? "Geser horizontal / gunakan zoom untuk eksplorasi peta alur"
                  : "Scroll horizontally / use zoom to explore the flow map"}
              </span>
              <span className="hidden sm:inline text-slate-400">
                {locale === "id"
                  ? "Arahkan kursor untuk melihat koneksi"
                  : "Hover over nodes to trace connections"}
              </span>
            </div>

            <ProductFlowDesktopDiagram
              locale={locale}
              zoom={zoom}
              activeCategory={activeCategory}
              selectedNodeId={selectedNodeId}
              hoveredNodeId={hoveredNodeId}
              onHoverNode={setHoveredNodeId}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        ) : (
          <ProductFlowMobileView
            locale={locale}
            activeCategory={activeCategory}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        )}
      </div>

      {/* Node Detail Modal / Bottom Drawer */}
      <NodeDetailModal
        nodeId={selectedNodeId}
        locale={locale}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={setSelectedNodeId}
      />
    </div>
  )
}
