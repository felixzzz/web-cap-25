"use client"

import React, { useState, useRef } from "react"
import { PRODUCT_FLOW_DATA, FlowNode, NodeCategory } from "../_data/productFlowData"
import { FlowNodeIcon } from "./FlowIcons"
import { Info, Sparkles } from "lucide-react"

interface ProductFlowDesktopDiagramProps {
  locale: "id" | "en"
  zoom: number
  activeCategory: NodeCategory | "all"
  selectedNodeId: string | null
  hoveredNodeId: string | null
  onHoverNode: (id: string | null) => void
  onSelectNode: (id: string) => void
}

export const ProductFlowDesktopDiagram: React.FC<ProductFlowDesktopDiagramProps> = ({
  locale,
  zoom,
  activeCategory,
  selectedNodeId,
  hoveredNodeId,
  onHoverNode,
  onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeFocusId = hoveredNodeId || selectedNodeId
  const activeFocusNode = activeFocusId ? PRODUCT_FLOW_DATA.nodes[activeFocusId] : null

  // Calculate connected node IDs (inputs + outputs) for path highlighting
  const connectedNodeIds = React.useMemo(() => {
    if (!activeFocusNode) return new Set<string>()
    const set = new Set<string>([activeFocusNode.id])
    if (activeFocusNode.inputs) activeFocusNode.inputs.forEach((id) => set.add(id))
    if (activeFocusNode.outputs) activeFocusNode.outputs.forEach((id) => set.add(id))
    return set
  }, [activeFocusNode])

  // Helper to determine node opacity/highlight state
  const getNodeState = (node: FlowNode) => {
    const isCategoryFiltered = activeCategory !== "all" && (node.category as string) !== activeCategory
    const isFocused = activeFocusId === node.id
    const isConnected = activeFocusId ? connectedNodeIds.has(node.id) : true

    const isDimmed = isCategoryFiltered || (activeFocusId !== null && !isConnected)
    const isHighlighted = isFocused || (activeFocusId !== null && isConnected)

    return { isDimmed, isHighlighted, isFocused }
  }

  // Node Component Renderers
  const renderSquareNode = (
    nodeId: string,
    variant: "feedstock" | "facility" | "customer",
    customClass = ""
  ) => {
    const node = PRODUCT_FLOW_DATA.nodes[nodeId]
    if (!node) return null
    const { isDimmed, isHighlighted, isFocused } = getNodeState(node)

    const isFacility = variant === "facility"
    const isCustomer = variant === "customer"

    return (
      <div
        key={node.id}
        onClick={() => onSelectNode(node.id)}
        onMouseEnter={() => onHoverNode(node.id)}
        onMouseLeave={() => onHoverNode(null)}
        className={`relative group cursor-pointer select-none transition-all duration-300 rounded-2xl flex flex-col items-center justify-center p-3 text-center ${
          isFacility
            ? "bg-[#0082C8] text-white shadow-lg shadow-[#0082C8]/25 border-2 border-[#0082C8]"
            : isCustomer
            ? "bg-[#0F172A] text-white shadow-lg shadow-slate-900/30 border-2 border-[#0F172A]"
            : "bg-white text-[#062C48] shadow-md border-2 border-[#0082C8]"
        } ${customClass} ${
          isDimmed ? "opacity-30 grayscale-[50%] scale-95" : "opacity-100"
        } ${
          isHighlighted
            ? "ring-4 ring-[#00A3E0] scale-105 z-30 shadow-xl"
            : "hover:scale-102 hover:shadow-lg z-10"
        }`}
      >
        {/* Glow indicator when focused */}
        {isFocused && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00A3E0]"></span>
          </span>
        )}

        <div className="mb-2">
          <FlowNodeIcon
            icon={node.icon}
            className="w-10 h-10 transition-transform group-hover:scale-110 duration-200"
            color={isFacility || isCustomer ? "#ffffff" : "#0082C8"}
          />
        </div>

        <span className="text-[12px] font-extrabold tracking-wide uppercase leading-tight line-clamp-2">
          {node.name}
        </span>
      </div>
    )
  }

  const renderProductCard = (nodeId: string, customClass = "") => {
    const node = PRODUCT_FLOW_DATA.nodes[nodeId]
    if (!node) return null
    const { isDimmed, isHighlighted, isFocused } = getNodeState(node)

    return (
      <div
        key={node.id}
        onClick={() => onSelectNode(node.id)}
        onMouseEnter={() => onHoverNode(node.id)}
        onMouseLeave={() => onHoverNode(null)}
        className={`relative group cursor-pointer select-none transition-all duration-300 rounded-xl bg-white flex flex-col items-center justify-center p-2.5 text-center border-2 border-[#00A3E0] shadow-sm hover:shadow-md ${customClass} ${
          isDimmed ? "opacity-25 grayscale-[60%] scale-95" : "opacity-100"
        } ${
          isHighlighted
            ? "ring-4 ring-[#0082C8] bg-sky-50/50 scale-105 z-30 shadow-lg"
            : "hover:scale-102 z-10"
        }`}
      >
        {isFocused && (
          <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0082C8]"></span>
          </span>
        )}

        <div className="mb-1">
          <FlowNodeIcon
            icon={node.icon}
            className="w-7 h-7 transition-transform group-hover:scale-110 duration-200"
            color="#0082C8"
          />
        </div>

        <span className="text-[11px] font-bold text-[#0082C8] tracking-wide uppercase leading-tight">
          {node.name}
        </span>
      </div>
    )
  }

  const renderPillNode = (nodeId: string, customClass = "") => {
    const node = PRODUCT_FLOW_DATA.nodes[nodeId]
    if (!node) return null
    const { isDimmed, isHighlighted, isFocused } = getNodeState(node)

    return (
      <div
        key={node.id}
        onClick={() => onSelectNode(node.id)}
        onMouseEnter={() => onHoverNode(node.id)}
        onMouseLeave={() => onHoverNode(null)}
        className={`relative group cursor-pointer select-none transition-all duration-300 rounded-full bg-white flex items-center justify-center px-4 py-2 text-center border-2 border-[#00A3E0] shadow-sm hover:shadow-md ${customClass} ${
          isDimmed ? "opacity-25 grayscale-[60%] scale-95" : "opacity-100"
        } ${
          isHighlighted
            ? "ring-4 ring-[#0082C8] bg-sky-50/70 scale-105 z-30 shadow-lg"
            : "hover:scale-102 z-10"
        }`}
      >
        {isFocused && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0082C8]"></span>
          </span>
        )}

        <span className="text-[12px] font-bold text-[#0082C8] tracking-wider uppercase">
          {node.name}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto overflow-y-hidden bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 rounded-3xl border border-sky-100 p-6 md:p-8 shadow-inner"
    >
      <div
        className="relative mx-auto transition-transform duration-300 origin-top-left"
        style={{
          width: "1480px",
          minHeight: "860px",
          transform: `scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {/* ========================================================================= */}
        {/* SVG BACKGROUND CONNECTION LINES & PATHS                                  */}
        {/* ========================================================================= */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Arrow marker for lines */}
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#0082C8" />
            </marker>

            <marker
              id="flow-arrow-highlight"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#00A3E0" />
            </marker>

            {/* Gradient for subsea pipeline */}
            <linearGradient id="subseaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0082C8" />
              <stop offset="50%" stopColor="#00A3E0" />
              <stop offset="100%" stopColor="#0082C8" />
            </linearGradient>
          </defs>

          {/* ------------------------------------------------------------- */}
          {/* ZONE 1: BUKOM ISLAND FLOW PATHS                              */}
          {/* ------------------------------------------------------------- */}

          {/* Crude Oil -> Refinery Complex */}
          <path
            d="M 125 435 L 180 435"
            stroke="#0082C8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Node connector circle + arrow at Refinery entrance */}
          <circle cx="180" cy="435" r="7" fill="#0082C8" />
          <path d="M 178 431 L 183 435 L 178 439" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Refinery Complex -> 8 Fuel & Oil Products Trunk Line */}
          <path
            d="M 290 435 L 360 435"
            stroke="#0082C8"
            strokeWidth="2.5"
          />
          <circle cx="360" cy="435" r="4" fill="#0082C8" />

          {/* Vertical distribution spine to 8 products */}
          <path
            d="M 360 62 L 360 762"
            stroke="#0082C8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Branches to each of the 8 fuel & oil products */}
          {[62, 162, 262, 362, 462, 562, 662, 762].map((y, idx) => (
            <g key={`bukom-branch-${idx}`}>
              <path d={`M 360 ${y} L 415 ${y}`} stroke="#0082C8" strokeWidth="2.5" />
              <circle cx="395" cy={y} r="7" fill="#0082C8" />
              <path d={`M 393 ${y - 4} L 398 ${y} L 393 ${y + 4}`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* Top 4 products (LPG, Naphtha, Hydrowax, Gas Oil) -> Ethylene Cracker Complex */}
          <path
            d="M 525 62 L 565 62 L 565 210 L 610 210"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 162 L 565 162"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 262 L 565 262"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 362 L 565 362 L 565 210"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="565" cy="210" r="4" fill="#0082C8" />
          {/* Arrow into Ethylene Cracker Complex */}
          <circle cx="585" cy="210" r="7" fill="#0082C8" />
          <path d="M 583 206 L 588 210 L 583 214" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Bottom 4 products (Mogas, Jet Fuel, Base Oil, Bitumen) -> Customers (Bukom) */}
          <path
            d="M 525 462 L 565 462 L 565 610 L 600 610"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 562 L 565 562"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 662 L 565 662"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 525 762 L 565 762 L 565 610"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="565" cy="610" r="4" fill="#00A3E0" />
          {/* Arrow into Bukom Customers */}
          <circle cx="585" cy="610" r="7" fill="#00A3E0" />
          <path d="M 583 606 L 588 610 L 583 614" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Ethylene Cracker Complex -> Customers (Bukom) Downward line */}
          <path
            d="M 665 265 L 665 540"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="665" cy="540" r="7" fill="#0082C8" />
          <path d="M 661 538 L 665 543 L 669 538" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* ------------------------------------------------------------- */}
          {/* SUBSEA PIPELINE: CRACKER TO JURONG BASE CHEMICALS             */}
          {/* ------------------------------------------------------------- */}
          <path
            d="M 720 210 L 780 210 L 780 145"
            stroke="url(#subseaGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 3"
            fill="none"
          />
          <circle cx="780" cy="145" r="4" fill="#0082C8" />

          {/* Base chemicals vertical distribution spine on Jurong Island */}
          <path
            d="M 780 55 L 780 235"
            stroke="#0082C8"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Branches to 4 Base Chemicals: Ethylene, Propylene, Benzene, Butadiene */}
          {[55, 115, 175, 235].map((y, idx) => (
            <g key={`base-chem-${idx}`}>
              <path d={`M 780 ${y} L 845 ${y}`} stroke="#0082C8" strokeWidth="2.5" />
              <circle cx="820" cy={y} r="7" fill="#0082C8" />
              <path d={`M 818 ${y - 4} L 823 ${y} L 818 ${y + 4}`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* ------------------------------------------------------------- */}
          {/* ZONE 3: JURONG ISLAND INTERMEDIATES & DERIVATIVES             */}
          {/* ------------------------------------------------------------- */}

          {/* Base Chemicals right outputs into vertical dark navy trunk line */}
          <path d="M 960 55 L 980 55" stroke="#062C48" strokeWidth="2.5" />
          <path d="M 960 115 L 980 115" stroke="#062C48" strokeWidth="2.5" />
          <path d="M 960 175 L 980 175" stroke="#062C48" strokeWidth="2.5" />
          <path d="M 960 235 L 980 235" stroke="#062C48" strokeWidth="2.5" />

          {/* Vertical dark navy trunk line connecting Base Chemicals down to MEG and SMPO & PO */}
          <path
            d="M 980 55 L 980 600 L 1025 600"
            stroke="#062C48"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Branch into MEG Facility at y = 120 */}
          <path
            d="M 980 120 L 1025 120"
            stroke="#062C48"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Arrow into MEG Facility */}
          <circle cx="1005" cy="120" r="7" fill="#062C48" />
          <path d="M 1003 116 L 1008 120 L 1003 124" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Arrow into SMPO & PO Derivatives at y = 600 */}
          <circle cx="1005" cy="600" r="7" fill="#062C48" />
          <path d="M 1003 596 L 1008 600 L 1003 604" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* MEG Facility -> Ethoxylates, HPEO, MEG (Product) */}
          <path
            d="M 1135 120 L 1160 120"
            stroke="#0082C8"
            strokeWidth="2.5"
          />
          <circle cx="1160" cy="120" r="4" fill="#0082C8" />
          <path
            d="M 1160 50.5 L 1160 230.5"
            stroke="#0082C8"
            strokeWidth="2.5"
          />
          {[50.5, 140.5, 230.5].map((y, idx) => (
            <g key={`meg-prod-${idx}`}>
              <path d={`M 1160 ${y} L 1205 ${y}`} stroke="#0082C8" strokeWidth="2.5" />
              <circle cx="1185" cy={y} r="7" fill="#0082C8" />
              <path d={`M 1183 ${y - 4} L 1188 ${y} L 1183 ${y + 4}`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* MEG Derivatives -> Vertical Cyan Line to Customers */}
          <path
            d="M 1320 50.5 L 1350 50.5 L 1350 365"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <path d="M 1320 140.5 L 1350 140.5" stroke="#00A3E0" strokeWidth="2.5" fill="none" />
          <path d="M 1320 230.5 L 1350 230.5" stroke="#00A3E0" strokeWidth="2.5" fill="none" />

          {/* SMPO Facility -> PO, SM, MPG, Polyols */}
          <path
            d="M 1135 600 L 1160 600"
            stroke="#0082C8"
            strokeWidth="2.5"
          />
          <circle cx="1160" cy="600" r="4" fill="#0082C8" />
          <path
            d="M 1160 480.5 L 1160 681.5"
            stroke="#0082C8"
            strokeWidth="2.5"
          />
          {[480.5, 547.5, 614.5, 681.5].map((y, idx) => (
            <g key={`smpo-prod-${idx}`}>
              <path d={`M 1160 ${y} L 1205 ${y}`} stroke="#0082C8" strokeWidth="2.5" />
              <circle cx="1185" cy={y} r="7" fill="#0082C8" />
              <path d={`M 1183 ${y - 4} L 1188 ${y} L 1183 ${y + 4}`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* SMPO Derivatives -> Vertical Cyan Line to Customers */}
          <path
            d="M 1320 480.5 L 1350 480.5 L 1350 365"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <path d="M 1320 547.5 L 1350 547.5" stroke="#00A3E0" strokeWidth="2.5" fill="none" />
          <path d="M 1320 614.5 L 1350 614.5" stroke="#00A3E0" strokeWidth="2.5" fill="none" />
          <path d="M 1320 681.5 L 1350 681.5" stroke="#00A3E0" strokeWidth="2.5" fill="none" />

          {/* Horizontal Line & Arrow into Jurong Customers */}
          <path d="M 1350 365 L 1395 365" stroke="#00A3E0" strokeWidth="2.5" fill="none" />
          <circle cx="1375" cy="365" r="7" fill="#00A3E0" />
          <path d="M 1373 361 L 1378 365 L 1373 369" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Direct Line from HDPE¹ into Customers Bottom with Upward Arrow */}
          <path
            d="M 1320 772.5 L 1450 772.5 L 1450 420"
            stroke="#00A3E0"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="1450" cy="445" r="7" fill="#00A3E0" />
          <path d="M 1446 447 L 1450 442 L 1454 447" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* ========================================================================= */}
        {/* HTML NODES GRID & LAYOUT                                                  */}
        {/* ========================================================================= */}

        {/* ----------------- COLUMN 1: FEEDSTOCKS & REFINERY ----------------- */}
        <div className="absolute top-[385px] left-[15px] w-[110px]">
          {renderSquareNode("crude-oil", "feedstock", "w-[110px] h-[100px]")}
        </div>

        <div className="absolute top-[380px] left-[180px] w-[110px]">
          {renderSquareNode("refinery-complex", "facility", "w-[110px] h-[110px]")}
        </div>

        {/* ----------------- COLUMN 2: 8 FUEL & OIL PRODUCTS ----------------- */}
        <div className="absolute top-[20px] left-[415px] flex flex-col gap-[18px] w-[110px]">
          {renderProductCard("lpg", "w-[110px] h-[75px]")}
          {renderProductCard("naphtha", "w-[110px] h-[75px]")}
          {renderProductCard("hydrowax", "w-[110px] h-[75px]")}
          {renderProductCard("gas-oil", "w-[110px] h-[75px]")}
          {renderProductCard("mogas", "w-[110px] h-[75px]")}
          {renderProductCard("jet-fuel", "w-[110px] h-[75px]")}
          {renderProductCard("base-oil", "w-[110px] h-[75px]")}
          {renderProductCard("bitumen-fuel-oil", "w-[110px] h-[75px]")}
        </div>

        {/* ----------------- COLUMN 3: ETHYLENE CRACKER COMPLEX & CUSTOMERS (BUKOM) ----------------- */}
        <div className="absolute top-[155px] left-[610px] w-[110px]">
          {renderSquareNode("ethylene-cracker", "facility", "w-[110px] h-[110px]")}
        </div>

        <div className="absolute top-[555px] left-[610px] w-[110px]">
          {renderSquareNode("customers-bukom", "customer", "w-[110px] h-[110px]")}
        </div>

        {/* ----------------- COLUMN 4: BASE CHEMICALS (JURONG) ----------------- */}
        <div className="absolute top-[32.5px] left-[845px] flex flex-col gap-[15px] w-[115px]">
          {renderPillNode("ethylene", "w-[115px] h-[45px]")}
          {renderPillNode("propylene", "w-[115px] h-[45px]")}
          {renderPillNode("benzene", "w-[115px] h-[45px]")}
          {renderPillNode("butadiene", "w-[115px] h-[45px]")}
        </div>

        {/* ----------------- COLUMN 5: INTERMEDIATE FACILITIES (JURONG) ----------------- */}
        {/* MEG Plant */}
        <div className="absolute top-[65px] left-[1025px] w-[110px]">
          {renderSquareNode("meg-facility", "facility", "w-[110px] h-[110px]")}
        </div>

        {/* SMPO Plant */}
        <div className="absolute top-[545px] left-[1025px] w-[110px]">
          {renderSquareNode("smpo-facility", "facility", "w-[110px] h-[110px]")}
        </div>

        {/* ----------------- COLUMN 6: INTERMEDIATES & DERIVATIVES PRODUCTS (JURONG) ----------------- */}
        {/* MEG Derivatives Group */}
        <div className="absolute top-[28px] left-[1205px] flex flex-col gap-[45px] w-[115px]">
          {renderPillNode("ethoxylates", "w-[115px] h-[45px]")}
          {renderPillNode("hpeo", "w-[115px] h-[45px]")}
          {renderPillNode("meg-product", "w-[115px] h-[45px]")}
        </div>

        {/* SMPO Derivatives Group */}
        <div className="absolute top-[458px] left-[1205px] flex flex-col gap-[22px] w-[115px]">
          {renderPillNode("po", "w-[115px] h-[45px]")}
          {renderPillNode("sm", "w-[115px] h-[45px]")}
          {renderPillNode("mpg", "w-[115px] h-[45px]")}
          {renderPillNode("polyols", "w-[115px] h-[45px]")}
        </div>

        {/* HDPE Pill at bottom */}
        <div className="absolute top-[750px] left-[1205px] w-[115px]">
          {renderPillNode("hdpe", "w-[115px] h-[45px]")}
        </div>

        {/* Footnote text under HDPE */}
        <div className="absolute top-[802px] left-[1130px] w-[270px] text-center">
          <span className="text-[10px] text-slate-500 font-medium tracking-tight">
            {PRODUCT_FLOW_DATA.meta.footnotes[0][locale]}
          </span>
        </div>

        {/* ----------------- COLUMN 7: CUSTOMERS (JURONG) ----------------- */}
        <div className="absolute top-[310px] left-[1395px] w-[110px]">
          {renderSquareNode("customers-jurong", "customer", "w-[110px] h-[110px]")}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM LABELS & GEOGRAPHIC ZONE PILLS                                    */}
        {/* ========================================================================= */}
        {/* Category section indicators */}
        <div className="absolute bottom-[85px] left-0 right-0 flex items-center justify-between px-8 text-xs font-extrabold uppercase tracking-widest text-[#062C48]/70">
          <div className="w-[300px] text-center border-b-2 border-slate-300 pb-1">
            {locale === "id" ? "Bahan Baku (Feedstocks)" : "Feedstocks"}
          </div>
          <div className="w-[320px] text-center border-b-2 border-slate-300 pb-1">
            {locale === "id" ? "Produk Minyak & Bahan Bakar" : "Fuel & Oil Products"}
          </div>
          <div className="w-[180px] text-center border-b-2 border-slate-300 pb-1">
            {locale === "id" ? "Bahan Kimia Dasar" : "Base Chemicals"}
          </div>
          <div className="w-[420px] text-center border-b-2 border-slate-300 pb-1">
            {locale === "id" ? "Intermediat & Turunan" : "Intermediates & Derivatives"}
          </div>
        </div>

        {/* Bottom Geographic Island Bars (Exact match to the diagram) */}
        <div className="absolute bottom-[20px] left-[10px] right-[10px] flex items-center gap-4">
          {/* Bukom Island Pill */}
          <div className="flex-1 py-3 px-6 rounded-full bg-white border-2 border-[#00A3E0] shadow-sm flex items-center justify-center">
            <span className="text-sm font-extrabold text-[#0082C8] tracking-wide">
              {PRODUCT_FLOW_DATA.zones[0].name[locale]}
            </span>
          </div>

          {/* Subsea Pipeline Pill */}
          <div className="py-3 px-8 rounded-full bg-white border-2 border-[#00A3E0] shadow-sm flex items-center justify-center shrink-0">
            <span className="text-xs font-extrabold text-[#0082C8] tracking-wide">
              {PRODUCT_FLOW_DATA.zones[1].name[locale]}
            </span>
          </div>

          {/* Jurong Island Pill */}
          <div className="flex-1 py-3 px-6 rounded-full bg-white border-2 border-[#00A3E0] shadow-sm flex items-center justify-center">
            <span className="text-sm font-extrabold text-[#0082C8] tracking-wide">
              {PRODUCT_FLOW_DATA.zones[2].name[locale]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
