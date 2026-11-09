"use client"

import React, { useState } from "react"
import { Flow2Zone } from "../_data/productFlow2Data"
import { XyflowDiagram } from "./XyflowDiagram"
import { ProductFlow2MobileView } from "./ProductFlow2MobileView"
import { ProductFlow2Modal } from "./ProductFlow2Modal"
import { ProductFlow2Header } from "./ProductFlow2Header"

interface ProductFlow2ContainerProps {
  locale: "id" | "en"
}

export const ProductFlow2Container: React.FC<ProductFlow2ContainerProps> = ({ locale }) => {
  const [activeZone, setActiveZone] = useState<Flow2Zone | "all">("all")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"diagram" | "steps">("diagram")

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1580px] mx-auto space-y-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200/80">
        {/* Header & Controls */}
        <ProductFlow2Header
          locale={locale}
          activeZone={activeZone}
          onSelectZone={setActiveZone}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Diagram Canvas or Step Pipeline */}
        {viewMode === "diagram" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0082C8] animate-pulse" />
                {locale === "id"
                  ? "Geser canvas atau gunakan zoom, lalu klik simpul untuk melihat fungsi utama & definisi"
                  : "Pan or zoom canvas, and click any node to see definition & main functions"}
              </span>
              <span className="hidden sm:inline text-slate-400">
                {locale === "id"
                  ? "Arahkan kursor ke simpul untuk menelusuri alur pipa proses"
                  : "Hover over nodes to trace active process flow"}
              </span>
            </div>

            <XyflowDiagram
              locale={locale}
              activeZone={activeZone}
              selectedNodeId={selectedNodeId}
              hoveredNodeId={hoveredNodeId}
              onHoverNode={setHoveredNodeId}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        ) : (
          <ProductFlow2MobileView
            locale={locale}
            activeZone={activeZone}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        )}
      </div>

      {/* Node Detail Modal */}
      <ProductFlow2Modal
        nodeId={selectedNodeId}
        locale={locale}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={setSelectedNodeId}
      />
    </div>
  )
}
