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
          <div>
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
