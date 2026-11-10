"use client"

import React, { useMemo, useState, useEffect, useCallback } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { PRODUCT_FLOW_2_DATA, Flow2Zone } from "../_data/productFlow2Data"
import { FlowProductNode, FlowPlantNode, FlowZoneBarNode, Flow2NodeData } from "./CustomNodes2"
import { Compass, RotateCcw } from "lucide-react"

export interface XyflowDiagramProps {
  locale: "id" | "en"
  activeZone: Flow2Zone | "all"
  selectedNodeId: string | null
  hoveredNodeId: string | null
  onHoverNode: (id: string | null) => void
  onSelectNode: (id: string) => void
  isLocked?: boolean
  showLegend?: boolean
  customCoordinates?: Record<string, { x: number; y: number }> | null
  customNodesData?: Record<string, any> | null
  onCoordinatesChange?: (coords: Record<string, { x: number; y: number }>) => void
}

export const DEFAULT_FLOW_2_POSITIONS: Record<string, { x: number; y: number }> = {
  "crude-oil": { x: 40, y: 350 },
  "natural-gas": { x: 40, y: 610 },
  "refinery-plant": { x: 230, y: 348 },
  "gas-separation-unit": { x: 230, y: 608 },
  "lpg": { x: 440, y: 280 },
  "naphtha": { x: 440, y: 400 },
  "condensate": { x: 440, y: 610 },
  "ethylene-cracker-plant": { x: 650, y: 440 },
  "ethylene": { x: 860, y: 120 },
  "propylene": { x: 860, y: 330 },
  "raw-c4": { x: 860, y: 450 },
  "pygas": { x: 860, y: 565 },
  "pfo": { x: 860, y: 675 },
  "polyethylene-plant": { x: 1140, y: 45 },
  "styrene-monomer-plant": { x: 1140, y: 235 },
  "polypropylene-plant": { x: 1140, y: 495 },
  "butadiene-plant": { x: 1140, y: 775 },
  "hdpe": { x: 1360, y: 15 },
  "lldpe": { x: 1360, y: 95 },
  "styrene-monomer": { x: 1360, y: 205 },
  "toluene": { x: 1360, y: 280 },
  "homo-pp": { x: 1360, y: 435 },
  "random-pp": { x: 1360, y: 515 },
  "impact-pp": { x: 1360, y: 595 },
  "butadiene": { x: 1360, y: 740 },
  "raff-1": { x: 1360, y: 815 },
}

const nodeTypes = {
  productNode: FlowProductNode,
  plantNode: FlowPlantNode,
  zoneBar: FlowZoneBarNode,
}

const XyflowCanvas: React.FC<XyflowDiagramProps> = ({
  locale,
  activeZone,
  selectedNodeId,
  hoveredNodeId,
  onHoverNode,
  onSelectNode,
  isLocked = true,
  customCoordinates = null,
  customNodesData = null,
  onCoordinatesChange,
}) => {
  const { fitView } = useReactFlow()
  const [showMiniMap, setShowMiniMap] = useState<boolean>(!isLocked)

  const getPosition = useCallback(
    (id: string) => {
      if (customCoordinates && customCoordinates[id]) {
        return customCoordinates[id]
      }
      return DEFAULT_FLOW_2_POSITIONS[id] || { x: 0, y: 0 }
    },
    [customCoordinates]
  )

  // Auto-fit on window resize and mount
  useEffect(() => {
    const handleResize = () => {
      fitView({ padding: 0.05, duration: 250 })
    }
    window.addEventListener("resize", handleResize)
    const timer = setTimeout(() => {
      fitView({ padding: 0.05, duration: 300 })
    }, 150)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [fitView])

  const rawNodes = useMemo(() => {
    const base = PRODUCT_FLOW_2_DATA.nodes
    if (!customNodesData) return base

    const merged: Record<string, any> = {}
    Object.keys(base).forEach((key) => {
      const override = customNodesData[key]
      merged[key] = {
        ...base[key],
        ...(override || {}),
        name: locale === "id" && override?.nameId ? override.nameId : (override?.name || base[key].name),
      }
    })
    return merged
  }, [locale, customNodesData])

  const activeFocusId = hoveredNodeId || selectedNodeId
  const activeFocusNode = activeFocusId ? rawNodes[activeFocusId] : null

  // Set of connected node IDs for interactive highlighting
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusNode) return new Set<string>()
    const set = new Set<string>([activeFocusNode.id])
    if (activeFocusNode.inputs) activeFocusNode.inputs.forEach((id: string) => set.add(id))
    if (activeFocusNode.outputs) activeFocusNode.outputs.forEach((id: string) => set.add(id))
    return set
  }, [activeFocusNode])

  // Initial nodes layout matching the user's slide
  const initialNodes: Node[] = useMemo(() => {

    const nList: Node[] = [
      // ---------------- COL 1: FEEDSTOCKS ----------------
      {
        id: "crude-oil",
        type: "productNode",
        position: getPosition("crude-oil"),
        data: {
          ...rawNodes["crude-oil"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "natural-gas",
        type: "productNode",
        position: getPosition("natural-gas"),
        data: {
          ...rawNodes["natural-gas"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 2: PRE-TREATMENT PLANTS ----------------
      {
        id: "refinery-plant",
        type: "plantNode",
        position: getPosition("refinery-plant"),
        data: {
          ...rawNodes["refinery-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "gas-separation-unit",
        type: "plantNode",
        position: getPosition("gas-separation-unit"),
        data: {
          ...rawNodes["gas-separation-unit"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 3: REFINERY & GSU OUTPUTS ----------------
      {
        id: "lpg",
        type: "productNode",
        position: getPosition("lpg"),
        data: {
          ...rawNodes["lpg"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "naphtha",
        type: "productNode",
        position: getPosition("naphtha"),
        data: {
          ...rawNodes["naphtha"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "condensate",
        type: "productNode",
        position: getPosition("condensate"),
        data: {
          ...rawNodes["condensate"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 4: ETHYLENE CRACKER PLANT ----------------
      {
        id: "ethylene-cracker-plant",
        type: "plantNode",
        position: getPosition("ethylene-cracker-plant"),
        data: {
          ...rawNodes["ethylene-cracker-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 5: CRACKER OUTPUTS ----------------
      {
        id: "ethylene",
        type: "productNode",
        position: getPosition("ethylene"),
        data: {
          ...rawNodes["ethylene"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "propylene",
        type: "productNode",
        position: getPosition("propylene"),
        data: {
          ...rawNodes["propylene"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "raw-c4",
        type: "productNode",
        position: getPosition("raw-c4"),
        data: {
          ...rawNodes["raw-c4"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "pygas",
        type: "productNode",
        position: getPosition("pygas"),
        data: {
          ...rawNodes["pygas"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "pfo",
        type: "productNode",
        position: getPosition("pfo"),
        data: {
          ...rawNodes["pfo"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 6: INTERMEDIATE PLANTS ----------------
      {
        id: "polyethylene-plant",
        type: "plantNode",
        position: getPosition("polyethylene-plant"),
        data: {
          ...rawNodes["polyethylene-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "styrene-monomer-plant",
        type: "plantNode",
        position: getPosition("styrene-monomer-plant"),
        data: {
          ...rawNodes["styrene-monomer-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "polypropylene-plant",
        type: "plantNode",
        position: getPosition("polypropylene-plant"),
        data: {
          ...rawNodes["polypropylene-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "butadiene-plant",
        type: "plantNode",
        position: getPosition("butadiene-plant"),
        data: {
          ...rawNodes["butadiene-plant"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COL 7: DOWNSTREAM PRODUCTS ----------------
      {
        id: "hdpe",
        type: "productNode",
        position: getPosition("hdpe"),
        data: {
          ...rawNodes["hdpe"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "lldpe",
        type: "productNode",
        position: getPosition("lldpe"),
        data: {
          ...rawNodes["lldpe"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "styrene-monomer",
        type: "productNode",
        position: getPosition("styrene-monomer"),
        data: {
          ...rawNodes["styrene-monomer"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "toluene",
        type: "productNode",
        position: getPosition("toluene"),
        data: {
          ...rawNodes["toluene"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "homo-pp",
        type: "productNode",
        position: getPosition("homo-pp"),
        data: {
          ...rawNodes["homo-pp"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "random-pp",
        type: "productNode",
        position: getPosition("random-pp"),
        data: {
          ...rawNodes["random-pp"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "impact-pp",
        type: "productNode",
        position: getPosition("impact-pp"),
        data: {
          ...rawNodes["impact-pp"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "butadiene",
        type: "productNode",
        position: getPosition("butadiene"),
        data: {
          ...rawNodes["butadiene"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "raff-1",
        type: "productNode",
        position: getPosition("raff-1"),
        data: {
          ...rawNodes["raff-1"],
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- BOTTOM ZONE BARS ----------------
      {
        id: "zone-bar-upstream",
        type: "zoneBar",
        position: { x: 30, y: 940 },
        draggable: false,
        selectable: false,
        data: {
          title: "UPSTREAM INDUSTRY",
          width: 950,
        },
      },
      {
        id: "zone-bar-intermediate",
        type: "zoneBar",
        position: { x: 1040, y: 940 },
        draggable: false,
        selectable: false,
        data: {
          title: "INTERMEDIATE INDUSTRY",
          width: 440,
        },
      },
    ]

    return nList
  }, [onSelectNode, onHoverNode, getPosition, rawNodes])

  // Initial Edges matching the slide diagram
  const initialEdges: Edge[] = useMemo(() => {
    const rawEdges: Array<{
      id: string
      source: string
      target: string
    }> = [
      // Crude Oil & Natural Gas feeds
      { id: "e-crude-refinery", source: "crude-oil", target: "refinery-plant" },
      { id: "e-gas-gsu", source: "natural-gas", target: "gas-separation-unit" },

      // Refinery outputs
      { id: "e-refinery-lpg", source: "refinery-plant", target: "lpg" },
      { id: "e-refinery-naphtha", source: "refinery-plant", target: "naphtha" },

      // GSU outputs
      { id: "e-gsu-condensate", source: "gas-separation-unit", target: "condensate" },

      // Feeds into Ethylene Cracker
      { id: "e-lpg-cracker", source: "lpg", target: "ethylene-cracker-plant" },
      { id: "e-naphtha-cracker", source: "naphtha", target: "ethylene-cracker-plant" },
      { id: "e-condensate-cracker", source: "condensate", target: "ethylene-cracker-plant" },

      // Ethylene Cracker outputs (fanning out)
      { id: "e-cracker-ethylene", source: "ethylene-cracker-plant", target: "ethylene" },
      { id: "e-cracker-propylene", source: "ethylene-cracker-plant", target: "propylene" },
      { id: "e-cracker-rawc4", source: "ethylene-cracker-plant", target: "raw-c4" },
      { id: "e-cracker-pygas", source: "ethylene-cracker-plant", target: "pygas" },
      { id: "e-cracker-pfo", source: "ethylene-cracker-plant", target: "pfo" },

      // Chemical outputs to Intermediate Plants
      { id: "e-ethylene-pe", source: "ethylene", target: "polyethylene-plant" },
      { id: "e-ethylene-sm", source: "ethylene", target: "styrene-monomer-plant" },
      { id: "e-propylene-pp", source: "propylene", target: "polypropylene-plant" },
      { id: "e-rawc4-bd", source: "raw-c4", target: "butadiene-plant" },

      // PE Plant outputs
      { id: "e-pe-hdpe", source: "polyethylene-plant", target: "hdpe" },
      { id: "e-pe-lldpe", source: "polyethylene-plant", target: "lldpe" },

      // SM Plant outputs
      { id: "e-sm-styrene", source: "styrene-monomer-plant", target: "styrene-monomer" },
      { id: "e-sm-toluene", source: "styrene-monomer-plant", target: "toluene" },

      // PP Plant outputs
      { id: "e-pp-homo", source: "polypropylene-plant", target: "homo-pp" },
      { id: "e-pp-random", source: "polypropylene-plant", target: "random-pp" },
      { id: "e-pp-impact", source: "polypropylene-plant", target: "impact-pp" },

      // Butadiene Plant outputs
      { id: "e-bd-butadiene", source: "butadiene-plant", target: "butadiene" },
      { id: "e-bd-raff1", source: "butadiene-plant", target: "raff-1" },
    ]

    return rawEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: "source-right",
      targetHandle: "target-left",
      type: "straight",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#0082C8",
        width: 14,
        height: 14,
      },
      style: {
        stroke: "#0082C8",
        strokeWidth: 2,
      },
    }))
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Sync custom coordinates from props (e.g. from API or reset)
  useEffect(() => {
    if (customCoordinates) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.type === "zoneBar") return n
          const customPos = customCoordinates[n.id]
          if (customPos) {
            return {
              ...n,
              position: customPos,
            }
          }
          return n
        })
      )
    }
  }, [customCoordinates, setNodes])

  // Sync custom node text updates
  useEffect(() => {
    if (customNodesData) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.type === "zoneBar") return n
          const override = customNodesData[n.id]
          if (override) {
            return {
              ...n,
              data: {
                ...n.data,
                ...override,
                name:
                  locale === "id" && override?.nameId
                    ? override.nameId
                    : (override?.name || n.data.name),
              },
            }
          }
          return n
        })
      )
    }
  }, [customNodesData, locale, setNodes])

  // Handle node drag stop in editor mode
  const handleNodeDragStop = useCallback(
    (_: any, node: Node) => {
      if (isLocked) return

      setNodes((nds) => {
        const updated = nds.map((n) => (n.id === node.id ? node : n))
        if (onCoordinatesChange) {
          const coords: Record<string, { x: number; y: number }> = {}
          updated.forEach((n) => {
            if (n.type !== "zoneBar") {
              coords[n.id] = {
                x: Math.round(n.position.x),
                y: Math.round(n.position.y),
              }
            }
          })
          onCoordinatesChange(coords)
        }
        return updated
      })
    },
    [isLocked, setNodes, onCoordinatesChange]
  )

  // Update nodes with highlight / focus / dimming states
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "zoneBar") return node

        const nodeData = node.data as unknown as Flow2NodeData
        const isFocused = node.id === activeFocusId
        const isHighlighted = activeFocusId ? connectedNodeIds.has(node.id) : false

        // Zone filtering
        const matchesZone =
          activeZone === "all" ||
          (nodeData.zone && nodeData.zone === activeZone)

        const isDimmed = !matchesZone || (Boolean(activeFocusId) && !isHighlighted)

        return {
          ...node,
          data: {
            ...nodeData,
            isFocused,
            isHighlighted,
            isDimmed,
            onSelect: onSelectNode,
            onHover: onHoverNode,
          },
        }
      })
    )
  }, [activeFocusId, connectedNodeIds, activeZone, onSelectNode, onHoverNode, setNodes])

  // Update edge styling on hover / selection
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isConnected =
          activeFocusId &&
          (edge.source === activeFocusId || edge.target === activeFocusId)

        const isDimmed = Boolean(activeFocusId) && !isConnected

        return {
          ...edge,
          style: {
            stroke: isConnected ? "#0284c7" : "#0082C8",
            strokeWidth: isConnected ? 3.5 : 2,
            opacity: isDimmed ? 0.2 : 1,
            transition: "all 0.25s ease",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isConnected ? "#0284c7" : "#0082C8",
            width: isConnected ? 16 : 14,
            height: isConnected ? 16 : 14,
          },
        }
      })
    )
  }, [activeFocusId, setEdges])

  return (
    <div className="relative w-full h-[720px] sm:h-[800px] md:h-[860px] rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.05, duration: 400 }}
        minZoom={0.3}
        maxZoom={1.5}
        nodesDraggable={!isLocked}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={!isLocked}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#E2E8F0" />
        
        {!isLocked && (
          <Controls
            showInteractive={false}
            className="!bg-white !border !border-slate-200 !rounded-xl !shadow-md overflow-hidden"
          />
        )}

        {showMiniMap && (
          <MiniMap
            nodeColor={(node) => {
              if (node.type === "plantNode") return "#ffffff"
              if (node.type === "zoneBar") return "#0082C8"
              return "#0082C8"
            }}
            nodeStrokeColor={() => "#0082C8"}
            nodeStrokeWidth={2}
            nodeBorderRadius={8}
            maskColor="rgba(241, 245, 249, 0.75)"
            className="!border !border-slate-200 !rounded-xl !shadow-sm overflow-hidden"
            zoomable
            pannable
          />
        )}

        {/* Top-Right Helper Panel (shown if not locked) */}
        {!isLocked && (
          <Panel position="top-right" className="flex items-center gap-2">
            <button
              onClick={() => fitView({ padding: 0.05, duration: 400 })}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 hover:bg-slate-50 text-xs font-semibold text-[#062C48] border border-slate-200 shadow-xs backdrop-blur-xs transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#0082C8]" />
              <span className="hidden sm:inline">{locale === "id" ? "Pusatkan" : "Center View"}</span>
            </button>
            <button
              onClick={() => setShowMiniMap(!showMiniMap)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 hover:bg-slate-50 text-xs font-semibold text-[#062C48] border border-slate-200 shadow-xs backdrop-blur-xs transition-colors"
              title="Toggle MiniMap"
            >
              <Compass className="w-3.5 h-3.5 text-[#0082C8]" />
              <span className="hidden sm:inline">Minimap</span>
            </button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}

export const XyflowDiagram: React.FC<XyflowDiagramProps> = (props) => {
  return (
    <ReactFlowProvider>
      <XyflowCanvas {...props} />
    </ReactFlowProvider>
  )
}
