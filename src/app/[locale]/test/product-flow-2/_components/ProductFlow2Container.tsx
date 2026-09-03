"use client"

import React, { useState } from "react"
import Link from "next/link"
import { NodeCategory, PRODUCT_FLOW_DATA } from "../../product-flow/_data/productFlowData"
import { XyflowDiagram } from "./XyflowDiagram"
import { ProductFlowMobileView } from "../../product-flow/_components/ProductFlowMobileView"
import { NodeDetailModal } from "../../product-flow/_components/NodeDetailModal"
import { ProductFlowHeader } from "../../product-flow/_components/ProductFlowHeader"
import { Sparkles, ArrowRight, Layers, LayoutGrid } from "lucide-react"

interface ProductFlow2ContainerProps {
  locale: "id" | "en"
}

export const ProductFlow2Container: React.FC<ProductFlow2ContainerProps> = ({ locale }) => {
  const [activeCategory, setActiveCategory] = useState<NodeCategory | "all">("all")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"diagram" | "steps">("diagram")
  const [zoom, setZoom] = useState<number>(1)

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1540px] mx-auto space-y-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200/80">
        {/* Banner with XYFlow Badge and Link to Approach 1 */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50/40 to-sky-50 border border-sky-200/80 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#0082C8] text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0082C8]">
                  Approach 2 (XYFlow / React Flow)
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Node Engine
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {locale === "id"
                  ? "Diagram interaktif dinamis berbasis graf xyflow dengan minimap & physics drag"
                  : "Dynamic graph-based diagram powered by XYFlow with minimap & physics drag"}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/test/product-flow`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-[#062C48] border border-slate-300 hover:border-slate-400 shadow-xs transition-all group"
          >
            <Layers className="w-3.5 h-3.5 text-[#0082C8]" />
            <span>{locale === "id" ? "Bandingkan dengan Pendekatan 1 (SVG Canvas)" : "Compare with Approach 1 (SVG Canvas)"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Header & Controls */}
        <ProductFlowHeader
          locale={locale}
          zoom={zoom}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
          onResetZoom={() => {}}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Canvas or Step Pipeline */}
        {viewMode === "diagram" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0082C8] animate-pulse" />
                {locale === "id"
                  ? "Gunakan mouse / layar sentuh untuk menggeser, memperbesar (zoom), dan klik simpul"
                  : "Use mouse or touch gestures to pan, pinch-to-zoom, and click any node"}
              </span>
              <span className="hidden sm:inline text-slate-400">
                {locale === "id"
                  ? "Arahkan kursor ke simpul untuk menelusuri alur proses"
                  : "Hover over nodes to trace active process flow"}
              </span>
            </div>

            <XyflowDiagram
              locale={locale}
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
