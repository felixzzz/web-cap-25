"use client"

import React, { memo } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { FlaskDropIcon, FactoryPlantIcon } from "./Flow2Icons"
import { Flow2Category, Flow2Zone } from "../_data/productFlow2Data"

export interface Flow2NodeData {
  id: string
  name: string
  fullName?: string
  iconType: "flask" | "plant"
  category: Flow2Category
  zone: Flow2Zone
  isDimmed?: boolean
  isHighlighted?: boolean
  isFocused?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
}

/**
 * Solid blue product card node with tilted flask icon — Feedstocks & Petrochemical products
 */
export const FlowProductNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as Flow2NodeData
  const { id, name, isDimmed, isHighlighted, isFocused, onSelect, onHover } = nodeData

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative group cursor-pointer select-none transition-all duration-300 rounded-xl bg-[#0082C8] text-white flex flex-col items-center justify-center p-2.5 text-center shadow-sm w-[112px] h-[72px] border border-[#0070ad] ${
        isDimmed ? "opacity-30 grayscale-[50%] scale-95" : "opacity-100"
      } ${
        isHighlighted
          ? "ring-4 ring-[#38BDF8] shadow-lg scale-105 z-30"
          : "hover:scale-105 hover:shadow-md hover:bg-[#0077b8] z-10"
      }`}
    >
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-2.5 !h-2.5 !bg-[#0082C8] !border-2 !border-white"
      />
      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-2.5 !h-2.5 !bg-[#0082C8] !border-2 !border-white"
      />

      {isFocused && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border border-[#0082C8]"></span>
        </span>
      )}

      {/* Icon */}
      <div className="mb-1">
        <FlaskDropIcon
          className="w-5 h-5 text-white transition-transform group-hover:scale-110 duration-200"
          color="#ffffff"
        />
      </div>

      {/* Label */}
      <span className="text-[10.5px] font-bold text-white tracking-wide uppercase leading-tight line-clamp-2 px-1">
        {name}
      </span>
    </div>
  )
})
FlowProductNode.displayName = "FlowProductNode"

/**
 * White card with blue border & factory icon — Processing Plants & Facilities
 */
export const FlowPlantNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as Flow2NodeData
  const { id, name, isDimmed, isHighlighted, isFocused, onSelect, onHover } = nodeData

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative group cursor-pointer select-none transition-all duration-300 rounded-xl bg-white text-[#0082C8] flex flex-col items-center justify-center p-2.5 text-center shadow-xs border-2 border-[#0082C8] w-[124px] h-[76px] ${
        isDimmed ? "opacity-30 grayscale-[50%] scale-95" : "opacity-100"
      } ${
        isHighlighted
          ? "ring-4 ring-[#38BDF8] bg-sky-50 shadow-lg scale-105 z-30"
          : "hover:scale-105 hover:shadow-md hover:bg-sky-50/50 z-10"
      }`}
    >
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-2.5 !h-2.5 !bg-[#0082C8] !border-2 !border-white"
      />
      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-2.5 !h-2.5 !bg-[#0082C8] !border-2 !border-white"
      />

      {isFocused && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0082C8]"></span>
        </span>
      )}

      {/* Factory Icon */}
      <div className="mb-1">
        <FactoryPlantIcon
          className="w-5 h-5 text-[#0082C8] transition-transform group-hover:scale-110 duration-200"
          color="#0082C8"
        />
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold text-[#0082C8] tracking-wider uppercase leading-tight line-clamp-2 px-1">
        {name}
      </span>
    </div>
  )
})
FlowPlantNode.displayName = "FlowPlantNode"

/**
 * Solid blue bottom zone pill (e.g., UPSTREAM INDUSTRY, INTERMEDIATE INDUSTRY)
 */
export const FlowZoneBarNode = memo(({ data }: NodeProps) => {
  const { title, width = 600 } = data as { title: string; width?: number }

  return (
    <div
      style={{ width: `${width}px` }}
      className="h-[38px] rounded-full bg-[#0082C8] text-white shadow-sm flex items-center justify-center select-none nodrag px-6"
    >
      <span className="text-xs font-bold text-white tracking-widest uppercase">
        {title}
      </span>
    </div>
  )
})
FlowZoneBarNode.displayName = "FlowZoneBarNode"

