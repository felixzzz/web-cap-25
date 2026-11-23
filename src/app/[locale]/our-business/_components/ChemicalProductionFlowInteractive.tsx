"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { ProductFlowModal } from "@/components/product-flow"

// Lazy-load XyflowDiagram (React Flow engine) without SSR to eliminate heavy initial JS payload
const XyflowDiagram = dynamic(
  () => import("@/components/product-flow").then((mod) => mod.XyflowDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/10] min-h-[480px] flex items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/50">
        <div className="flex flex-col items-center gap-2.5 text-slate-400">
          <div className="h-7 w-7 rounded-full border-2 border-slate-200 border-t-[#0082C8] animate-spin" />
          <span className="text-xs font-medium">Memuat alur proses interaktif...</span>
        </div>
      </div>
    ),
  }
)

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

  // Lazy-mount the interactive engine when approaching viewport (300px margin)
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  })

  // Fetch coordinates and node texts saved from CMS when approaching viewport
  useEffect(() => {
    if (!inView) return

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
  }, [inView])

  return (
    <div ref={ref} className="w-full pt-1 sm:pt-4">
      {/* Interactive Diagram Canvas (Lazy-loaded upon viewport entry) */}
      {inView ? (
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
      ) : (
        <div className="w-full aspect-[16/10] min-h-[480px] rounded-2xl border border-slate-200/60 bg-slate-50/40" />
      )}

      {/* Node Detail Modal */}
      <ProductFlowModal
        nodeId={selectedNodeId}
        locale={locale}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={setSelectedNodeId}
        customNodesData={customNodes}
      />
    </div>
  )
}
