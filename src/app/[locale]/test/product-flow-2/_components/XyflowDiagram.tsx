"use client"

import React, { useMemo, useCallback, useState, useEffect } from "react"
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
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { PRODUCT_FLOW_DATA, NodeCategory } from "../../product-flow/_data/productFlowData"
import { SquareNode, ProductNode, PillNode, ZoneBarNode, FlowNodeData } from "./CustomNodes"
import { FlowStepEdge } from "./CustomEdge"
import { Compass, Lock, Unlock, Move, RotateCcw, Hand } from "lucide-react"

interface XyflowDiagramProps {
  locale: "id" | "en"
  activeCategory: NodeCategory | "all"
  selectedNodeId: string | null
  hoveredNodeId: string | null
  onHoverNode: (id: string | null) => void
  onSelectNode: (id: string) => void
}

const nodeTypes = {
  squareNode: SquareNode,
  productNode: ProductNode,
  pillNode: PillNode,
  zoneBar: ZoneBarNode,
}

const edgeTypes = {
  flowStep: FlowStepEdge,
}

const XyflowCanvas: React.FC<XyflowDiagramProps> = ({
  locale,
  activeCategory,
  selectedNodeId,
  hoveredNodeId,
  onHoverNode,
  onSelectNode,
}) => {
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const activeFocusId = hoveredNodeId || selectedNodeId
  const activeFocusNode = activeFocusId ? PRODUCT_FLOW_DATA.nodes[activeFocusId] : null

  // Set of connected nodes for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusNode) return new Set<string>()
    const set = new Set<string>([activeFocusNode.id])
    if (activeFocusNode.inputs) activeFocusNode.inputs.forEach((id) => set.add(id))
    if (activeFocusNode.outputs) activeFocusNode.outputs.forEach((id) => set.add(id))
    return set
  }, [activeFocusNode])

  // Build React Flow Nodes
  const initialNodes: Node[] = useMemo(() => {
    const rawNodes = PRODUCT_FLOW_DATA.nodes

    const nList: Node[] = [
      // ---------------- COLUMN 1: FEEDSTOCKS & REFINERY ----------------
      {
        id: "crude-oil",
        type: "squareNode",
        position: { x: 40, y: 390 },
        data: {
          id: "crude-oil",
          name: rawNodes["crude-oil"].name,
          fullName: rawNodes["crude-oil"].fullName,
          icon: rawNodes["crude-oil"].icon,
          category: rawNodes["crude-oil"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "refinery-complex",
        type: "squareNode",
        position: { x: 210, y: 385 },
        data: {
          id: "refinery-complex",
          name: rawNodes["refinery-complex"].name,
          fullName: rawNodes["refinery-complex"].fullName,
          icon: rawNodes["refinery-complex"].icon,
          category: rawNodes["refinery-complex"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 2: 8 FUEL & OIL PRODUCTS ----------------
      {
        id: "lpg",
        type: "productNode",
        position: { x: 430, y: 25 },
        data: {
          id: "lpg",
          name: rawNodes["lpg"].name,
          icon: rawNodes["lpg"].icon,
          category: rawNodes["lpg"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "naphtha",
        type: "productNode",
        position: { x: 430, y: 120 },
        data: {
          id: "naphtha",
          name: rawNodes["naphtha"].name,
          icon: rawNodes["naphtha"].icon,
          category: rawNodes["naphtha"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "hydrowax",
        type: "productNode",
        position: { x: 430, y: 215 },
        data: {
          id: "hydrowax",
          name: rawNodes["hydrowax"].name,
          icon: rawNodes["hydrowax"].icon,
          category: rawNodes["hydrowax"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "gas-oil",
        type: "productNode",
        position: { x: 430, y: 310 },
        data: {
          id: "gas-oil",
          name: rawNodes["gas-oil"].name,
          icon: rawNodes["gas-oil"].icon,
          category: rawNodes["gas-oil"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "mogas",
        type: "productNode",
        position: { x: 430, y: 405 },
        data: {
          id: "mogas",
          name: rawNodes["mogas"].name,
          icon: rawNodes["mogas"].icon,
          category: rawNodes["mogas"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "jet-fuel",
        type: "productNode",
        position: { x: 430, y: 500 },
        data: {
          id: "jet-fuel",
          name: rawNodes["jet-fuel"].name,
          icon: rawNodes["jet-fuel"].icon,
          category: rawNodes["jet-fuel"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "base-oil",
        type: "productNode",
        position: { x: 430, y: 595 },
        data: {
          id: "base-oil",
          name: rawNodes["base-oil"].name,
          icon: rawNodes["base-oil"].icon,
          category: rawNodes["base-oil"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "bitumen-fuel-oil",
        type: "productNode",
        position: { x: 430, y: 690 },
        data: {
          id: "bitumen-fuel-oil",
          name: rawNodes["bitumen-fuel-oil"].name,
          icon: rawNodes["bitumen-fuel-oil"].icon,
          category: rawNodes["bitumen-fuel-oil"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 3: ETHYLENE CRACKER & BUKOM CUSTOMERS ----------------
      {
        id: "ethylene-cracker",
        type: "squareNode",
        position: { x: 640, y: 160 },
        data: {
          id: "ethylene-cracker",
          name: rawNodes["ethylene-cracker"].name,
          fullName: rawNodes["ethylene-cracker"].fullName,
          icon: rawNodes["ethylene-cracker"].icon,
          category: rawNodes["ethylene-cracker"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "customers-bukom",
        type: "squareNode",
        position: { x: 640, y: 540 },
        data: {
          id: "customers-bukom",
          name: rawNodes["customers-bukom"].name,
          fullName: rawNodes["customers-bukom"].fullName,
          icon: rawNodes["customers-bukom"].icon,
          category: rawNodes["customers-bukom"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 4: 4 BASE CHEMICALS (JURONG) ----------------
      {
        id: "ethylene",
        type: "pillNode",
        position: { x: 860, y: 35 },
        data: {
          id: "ethylene",
          name: rawNodes["ethylene"].name,
          icon: rawNodes["ethylene"].icon,
          category: rawNodes["ethylene"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "propylene",
        type: "pillNode",
        position: { x: 860, y: 95 },
        data: {
          id: "propylene",
          name: rawNodes["propylene"].name,
          icon: rawNodes["propylene"].icon,
          category: rawNodes["propylene"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "benzene",
        type: "pillNode",
        position: { x: 860, y: 155 },
        data: {
          id: "benzene",
          name: rawNodes["benzene"].name,
          icon: rawNodes["benzene"].icon,
          category: rawNodes["benzene"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "butadiene",
        type: "pillNode",
        position: { x: 860, y: 215 },
        data: {
          id: "butadiene",
          name: rawNodes["butadiene"].name,
          icon: rawNodes["butadiene"].icon,
          category: rawNodes["butadiene"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 5: INTERMEDIATE FACILITIES (JURONG) ----------------
      {
        id: "meg-facility",
        type: "squareNode",
        position: { x: 1040, y: 65 },
        data: {
          id: "meg-facility",
          name: rawNodes["meg-facility"].name,
          fullName: rawNodes["meg-facility"].fullName,
          icon: rawNodes["meg-facility"].icon,
          category: rawNodes["meg-facility"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "smpo-facility",
        type: "squareNode",
        position: { x: 1040, y: 535 },
        data: {
          id: "smpo-facility",
          name: rawNodes["smpo-facility"].name,
          fullName: rawNodes["smpo-facility"].fullName,
          icon: rawNodes["smpo-facility"].icon,
          category: rawNodes["smpo-facility"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 6: DERIVATIVES & HDPE (JURONG) ----------------
      {
        id: "ethoxylates",
        type: "pillNode",
        position: { x: 1230, y: 30 },
        data: {
          id: "ethoxylates",
          name: rawNodes["ethoxylates"].name,
          icon: rawNodes["ethoxylates"].icon,
          category: rawNodes["ethoxylates"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "hpeo",
        type: "pillNode",
        position: { x: 1230, y: 115 },
        data: {
          id: "hpeo",
          name: rawNodes["hpeo"].name,
          icon: rawNodes["hpeo"].icon,
          category: rawNodes["hpeo"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "meg-product",
        type: "pillNode",
        position: { x: 1230, y: 200 },
        data: {
          id: "meg-product",
          name: rawNodes["meg-product"].name,
          icon: rawNodes["meg-product"].icon,
          category: rawNodes["meg-product"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "po",
        type: "pillNode",
        position: { x: 1230, y: 440 },
        data: {
          id: "po",
          name: rawNodes["po"].name,
          icon: rawNodes["po"].icon,
          category: rawNodes["po"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "sm",
        type: "pillNode",
        position: { x: 1230, y: 505 },
        data: {
          id: "sm",
          name: rawNodes["sm"].name,
          icon: rawNodes["sm"].icon,
          category: rawNodes["sm"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "mpg",
        type: "pillNode",
        position: { x: 1230, y: 570 },
        data: {
          id: "mpg",
          name: rawNodes["mpg"].name,
          icon: rawNodes["mpg"].icon,
          category: rawNodes["mpg"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "polyols",
        type: "pillNode",
        position: { x: 1230, y: 635 },
        data: {
          id: "polyols",
          name: rawNodes["polyols"].name,
          icon: rawNodes["polyols"].icon,
          category: rawNodes["polyols"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },
      {
        id: "hdpe",
        type: "pillNode",
        position: { x: 1230, y: 730 },
        data: {
          id: "hdpe",
          name: rawNodes["hdpe"].name,
          footnote: PRODUCT_FLOW_DATA.meta.footnotes[0][locale],
          icon: rawNodes["hdpe"].icon,
          category: rawNodes["hdpe"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- COLUMN 7: JURONG CUSTOMERS ----------------
      {
        id: "customers-jurong",
        type: "squareNode",
        position: { x: 1420, y: 310 },
        data: {
          id: "customers-jurong",
          name: rawNodes["customers-jurong"].name,
          fullName: rawNodes["customers-jurong"].fullName,
          icon: rawNodes["customers-jurong"].icon,
          category: rawNodes["customers-jurong"].category,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      },

      // ---------------- BOTTOM ZONE BARS ----------------
      {
        id: "zone-bukom",
        type: "zoneBar",
        position: { x: 40, y: 810 },
        selectable: false,
        draggable: false,
        data: {
          title: PRODUCT_FLOW_DATA.zones[0].name[locale],
          width: 600,
        },
      },
      {
        id: "zone-subsea",
        type: "zoneBar",
        position: { x: 670, y: 810 },
        selectable: false,
        draggable: false,
        data: {
          title: PRODUCT_FLOW_DATA.zones[1].name[locale],
          width: 160,
        },
      },
      {
        id: "zone-jurong",
        type: "zoneBar",
        position: { x: 860, y: 810 },
        selectable: false,
        draggable: false,
        data: {
          title: PRODUCT_FLOW_DATA.zones[2].name[locale],
          width: 670,
        },
      },
    ]

    return nList
  }, [locale, onSelectNode, onHoverNode])

  // Build React Flow Edges
  const initialEdges: Edge[] = useMemo(() => {
    return [
      // Crude Oil -> Refinery
      {
        id: "e-crude-refinery",
        source: "crude-oil",
        sourceHandle: "source-right",
        target: "refinery-complex",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // Refinery -> 8 Fuel & Oil Products
      {
        id: "e-ref-lpg",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "lpg",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-naphtha",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "naphtha",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-hydrowax",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "hydrowax",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-gasoil",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "gas-oil",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-mogas",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "mogas",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-jetfuel",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "jet-fuel",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-baseoil",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "base-oil",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-ref-bitumen",
        source: "refinery-complex",
        sourceHandle: "source-right",
        target: "bitumen-fuel-oil",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // Top 4 Fuel Products -> Ethylene Cracker Complex
      {
        id: "e-lpg-cracker",
        source: "lpg",
        sourceHandle: "source-right",
        target: "ethylene-cracker",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-naphtha-cracker",
        source: "naphtha",
        sourceHandle: "source-right",
        target: "ethylene-cracker",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-hydrowax-cracker",
        source: "hydrowax",
        sourceHandle: "source-right",
        target: "ethylene-cracker",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-gasoil-cracker",
        source: "gas-oil",
        sourceHandle: "source-right",
        target: "ethylene-cracker",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // Bottom 4 Fuel Products -> Bukom Customers
      {
        id: "e-mogas-cust",
        source: "mogas",
        sourceHandle: "source-right",
        target: "customers-bukom",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-jetfuel-cust",
        source: "jet-fuel",
        sourceHandle: "source-right",
        target: "customers-bukom",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-baseoil-cust",
        source: "base-oil",
        sourceHandle: "source-right",
        target: "customers-bukom",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-bitumen-cust",
        source: "bitumen-fuel-oil",
        sourceHandle: "source-right",
        target: "customers-bukom",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },

      // Ethylene Cracker -> Bukom Customers
      {
        id: "e-cracker-cust",
        source: "ethylene-cracker",
        sourceHandle: "source-bottom",
        target: "customers-bukom",
        targetHandle: "target-top",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // Ethylene Cracker -> 4 Base Chemicals (via Subsea Pipeline)
      {
        id: "e-cracker-ethylene",
        source: "ethylene-cracker",
        sourceHandle: "source-right",
        target: "ethylene",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "subsea", showArrowBadge: true },
      },
      {
        id: "e-cracker-propylene",
        source: "ethylene-cracker",
        sourceHandle: "source-right",
        target: "propylene",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "subsea", showArrowBadge: true },
      },
      {
        id: "e-cracker-benzene",
        source: "ethylene-cracker",
        sourceHandle: "source-right",
        target: "benzene",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "subsea", showArrowBadge: true },
      },
      {
        id: "e-cracker-butadiene",
        source: "ethylene-cracker",
        sourceHandle: "source-right",
        target: "butadiene",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "subsea", showArrowBadge: true },
      },

      // 4 Base Chemicals -> MEG Facility (Dark Navy Trunk Line)
      {
        id: "e-ethylene-meg",
        source: "ethylene",
        sourceHandle: "source-right",
        target: "meg-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-propylene-meg",
        source: "propylene",
        sourceHandle: "source-right",
        target: "meg-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-benzene-meg",
        source: "benzene",
        sourceHandle: "source-right",
        target: "meg-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-butadiene-meg",
        source: "butadiene",
        sourceHandle: "source-right",
        target: "meg-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },

      // 4 Base Chemicals -> SMPO & PO Derivatives Complex (Dark Navy Trunk Line)
      {
        id: "e-ethylene-smpo",
        source: "ethylene",
        sourceHandle: "source-right",
        target: "smpo-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-propylene-smpo",
        source: "propylene",
        sourceHandle: "source-right",
        target: "smpo-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-benzene-smpo",
        source: "benzene",
        sourceHandle: "source-right",
        target: "smpo-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },
      {
        id: "e-butadiene-smpo",
        source: "butadiene",
        sourceHandle: "source-right",
        target: "smpo-facility",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "navy", showArrowBadge: true },
      },

      // MEG Facility -> Ethoxylates, HPEO, MEG (Product)
      {
        id: "e-meg-ethoxylates",
        source: "meg-facility",
        sourceHandle: "source-right",
        target: "ethoxylates",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-meg-hpeo",
        source: "meg-facility",
        sourceHandle: "source-right",
        target: "hpeo",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-meg-megprod",
        source: "meg-facility",
        sourceHandle: "source-right",
        target: "meg-product",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // SMPO Facility -> PO, SM, MPG, Polyols
      {
        id: "e-smpo-po",
        source: "smpo-facility",
        sourceHandle: "source-right",
        target: "po",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-smpo-sm",
        source: "smpo-facility",
        sourceHandle: "source-right",
        target: "sm",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-smpo-mpg",
        source: "smpo-facility",
        sourceHandle: "source-right",
        target: "mpg",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },
      {
        id: "e-smpo-polyols",
        source: "smpo-facility",
        sourceHandle: "source-right",
        target: "polyols",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "blue", showArrowBadge: true },
      },

      // MEG Derivatives -> Jurong Customers
      {
        id: "e-ethoxylates-cust",
        source: "ethoxylates",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-hpeo-cust",
        source: "hpeo",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-megprod-cust",
        source: "meg-product",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },

      // SMPO Derivatives -> Jurong Customers
      {
        id: "e-po-cust",
        source: "po",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-sm-cust",
        source: "sm",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-mpg-cust",
        source: "mpg",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
      {
        id: "e-polyols-cust",
        source: "polyols",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-left",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },

      // HDPE¹ -> Jurong Customers (Bottom Entrance)
      {
        id: "e-hdpe-cust",
        source: "hdpe",
        sourceHandle: "source-right",
        target: "customers-jurong",
        targetHandle: "target-bottom",
        type: "flowStep",
        data: { variant: "cyan", showArrowBadge: true },
      },
    ]
  }, [])

  // In-memory node & edge state for interactive dragging (not saved permanently)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Sync with initial layout on locale change or reset
  useEffect(() => {
    setNodes((currentNodes) =>
      initialNodes.map((initNode) => {
        const existing = currentNodes.find((n) => n.id === initNode.id)
        return {
          ...initNode,
          position: existing ? existing.position : initNode.position,
        }
      })
    )
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  // Reset layout callback
  const handleResetLayout = useCallback(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
    fitView({ duration: 400 })
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView])

  // Dynamic nodes with active states (dimmed, highlighted, focused)
  const dynamicNodes = useMemo(() => {
    return nodes.map((node) => {
      if (node.type === "zoneBar") return node

      const nodeData = node.data as unknown as FlowNodeData
      const isCategoryFiltered = activeCategory !== "all" && (nodeData.category as string) !== activeCategory
      const isFocused = activeFocusId === node.id
      const isConnected = activeFocusId ? connectedNodeIds.has(node.id) : true

      const isDimmed = isCategoryFiltered || (activeFocusId !== null && !isConnected)
      const isHighlighted = isFocused || (activeFocusId !== null && isConnected)

      return {
        ...node,
        data: {
          ...nodeData,
          isDimmed,
          isHighlighted,
          isFocused,
          onSelect: onSelectNode,
          onHover: onHoverNode,
        },
      }
    })
  }, [nodes, activeCategory, activeFocusId, connectedNodeIds, onSelectNode, onHoverNode])

  // Dynamic edges with active states
  const dynamicEdges = useMemo(() => {
    return edges.map((edge) => {
      const isSourceConnected = activeFocusId ? connectedNodeIds.has(edge.source) : false
      const isTargetConnected = activeFocusId ? connectedNodeIds.has(edge.target) : false
      const isHighlighted = activeFocusId !== null && isSourceConnected && isTargetConnected
      const isDimmed = activeFocusId !== null && !isHighlighted

      return {
        ...edge,
        data: {
          ...(edge.data || {}),
          isHighlighted,
          isDimmed,
        },
      }
    })
  }, [edges, activeFocusId, connectedNodeIds])

  return (
    <div className="w-full h-[760px] md:h-[840px] rounded-3xl overflow-hidden border border-sky-100 shadow-inner bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 relative">
      <ReactFlow
        nodes={dynamicNodes}
        edges={dynamicEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={2}
        nodesDraggable={!isLocked}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={!isLocked}
        zoomOnScroll={!isLocked}
        zoomOnPinch={true}
        className="touch-none"
      >
        <Background color="rgba(0, 163, 224, 0.2)" gap={24} size={1} variant={BackgroundVariant.Dots} />

        {/* Floating Top Control Panel */}
        <Panel position="top-right" className="bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-md flex items-center gap-1">
          <button
            onClick={() => fitView({ duration: 400 })}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={locale === "id" ? "Pusatkan Tampilan (Fit View)" : "Fit View"}
          >
            <Compass className="w-4 h-4 text-[#0082C8]" />
          </button>
          <button
            onClick={handleResetLayout}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={locale === "id" ? "Kembalikan Posisi Default (Reset Layout)" : "Reset Node Positions to Default"}
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
          </button>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`p-2 rounded-xl transition-colors ${
              isLocked ? "bg-amber-100 text-amber-800" : "text-slate-600 hover:bg-slate-100"
            }`}
            title={isLocked ? "Unlock Canvas Pan & Zoom" : "Lock Canvas"}
          >
            {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowMiniMap(!showMiniMap)}
            className={`p-2 rounded-xl transition-colors ${
              showMiniMap ? "bg-sky-100 text-[#0082C8]" : "text-slate-600 hover:bg-slate-100"
            }`}
            title={showMiniMap ? "Hide MiniMap" : "Show MiniMap"}
          >
            <Move className="w-4 h-4" />
          </button>
        </Panel>

        {/* Floating Bottom Left Instructions */}
        <Panel position="bottom-left" className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-600 hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {locale === "id"
              ? "Simpul dapat digeser bebas untuk demonstrasi interaktif (perubahan posisi tidak disimpan permanen)"
              : "All nodes can be freely dragged for interactive demo (positions are not saved permanently)"}
          </span>
        </Panel>

        <Controls position="bottom-right" className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl overflow-hidden shadow-md" />

        {showMiniMap && (
          <MiniMap
            position="top-left"
            className="!bg-white/90 !border !border-slate-200 !rounded-2xl !shadow-md !overflow-hidden hidden md:block"
            nodeColor={(node) => {
              if (node.id.includes("customers")) return "#0F172A"
              if (node.id.includes("cracker") || node.id.includes("refinery") || node.id.includes("facility"))
                return "#0082C8"
              if (node.type === "zoneBar") return "#E2E8F0"
              return "#00A3E0"
            }}
            maskColor="rgba(240, 249, 255, 0.6)"
            zoomable
            pannable
          />
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
