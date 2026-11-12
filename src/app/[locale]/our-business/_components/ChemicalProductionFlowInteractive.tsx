"use client"

import React, { useState, useEffect } from "react"
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
  const [coordinates, setCoordinates] = useState<Record<string, { x: number; y: number }> | null>(null)
  const [customNodes, setCustomNodes] = useState<Record<string, any> | null>(null)
  const [customLegend, setCustomLegend] = useState<any[] | null>(null)

  // Fetch coordinates and node texts saved from CMS
  useEffect(() => {
    async function fetchLayout() {
      try {
        const res = await fetch("/api/product-flow/layout", { cache: "no-store" })
        if (res.ok) {
          const json = await res.json()
          if (json?.data?.coordinates && Object.keys(json.data.coordinates).length > 0) {
            setCoordinates(json.data.coordinates)
          }
          if (json?.data?.nodes && Object.keys(json.data.nodes).length > 0) {
            setCustomNodes(json.data.nodes)
          }
          if (json?.data?.legend && Array.isArray(json.data.legend) && json.data.legend.length > 0) {
            setCustomLegend(json.data.legend)
          }
        }
      } catch {
        // Fallback to default positions handled inside XyflowDiagram
      }
    }
    fetchLayout()
  }, [])

  return (
    <div className="w-full pt-4">
      {/* Interactive Diagram Canvas (Locked & Auto-fitted to Device) */}
      <XyflowDiagram
        locale={locale}
        activeZone="all"
        selectedNodeId={selectedNodeId}
        hoveredNodeId={hoveredNodeId}
        onHoverNode={setHoveredNodeId}
        onSelectNode={setSelectedNodeId}
        isLocked={true}
        customCoordinates={coordinates}
        customNodesData={customNodes}
        customLegendData={customLegend}
        showLegend={true}
      />

      {/* Node Detail Modal */}
      <ProductFlow2Modal
        nodeId={selectedNodeId}
        locale={locale}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={setSelectedNodeId}
        customNodesData={customNodes}
      />
    </div>
  )
}

