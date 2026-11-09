"use client"

import React, { useState } from "react"
import { XyflowDiagram } from "../../test/product-flow-2/_components/XyflowDiagram"
import { ProductFlow2Modal } from "../../test/product-flow-2/_components/ProductFlow2Modal"

interface ChemicalProductionFlowInteractiveProps {
  locale: "id" | "en"
}

export const ChemicalProductionFlowInteractive: React.FC<ChemicalProductionFlowInteractiveProps> = ({
  locale,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  return (
    <div className="w-full space-y-3 pt-6">
      {/* Top hint bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 px-1">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#0082C8] animate-pulse" />
          {locale === "id"
            ? "Diagram Interaktif Alur Produk: Klik simpul untuk melihat fungsi utama & definisi"
            : "Interactive Product Flow: Click any node to view definition & main functions"}
        </span>
        <span className="hidden sm:inline text-slate-400">
          {locale === "id"
            ? "Arahkan kursor ke simpul untuk menelusuri alur proses"
            : "Hover over nodes to trace active process flow"}
        </span>
      </div>

      {/* Interactive Diagram Canvas (Locked & Auto-fitted to Device) */}
      <XyflowDiagram
        locale={locale}
        activeZone="all"
        selectedNodeId={selectedNodeId}
        hoveredNodeId={hoveredNodeId}
        onHoverNode={setHoveredNodeId}
        onSelectNode={setSelectedNodeId}
        isLocked={true}
      />

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

