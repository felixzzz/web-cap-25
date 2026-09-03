"use client"

import React, { memo } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { FlowNodeIcon } from "../../product-flow/_components/FlowIcons"
import { NodeCategory } from "../../product-flow/_data/productFlowData"

export interface FlowNodeData {
  id: string
  name: string
  fullName?: string
  icon: string
  category: NodeCategory
  footnote?: string
  isDimmed?: boolean
  isHighlighted?: boolean
  isFocused?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
}

export const SquareNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as FlowNodeData
  const { id, name, icon, category, isDimmed, isHighlighted, isFocused, onSelect, onHover } = nodeData

  const isFacility = category === "facility"
  const isCustomer = category === "customer"

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative group cursor-grab active:cursor-grabbing select-none transition-all duration-300 rounded-2xl flex flex-col items-center justify-center p-3 text-center w-[110px] h-[110px] ${
        isFacility
          ? "bg-[#0082C8] text-white shadow-lg shadow-[#0082C8]/25 border-2 border-[#0082C8]"
          : isCustomer
          ? "bg-[#0F172A] text-white shadow-lg shadow-slate-900/30 border-2 border-[#0F172A]"
          : "bg-white text-[#062C48] shadow-md border-2 border-[#0082C8]"
      } ${isDimmed ? "opacity-25 grayscale-[60%] scale-95" : "opacity-100"} ${
        isHighlighted
          ? "ring-4 ring-[#00A3E0] scale-105 z-30 shadow-xl"
          : "hover:scale-102 hover:shadow-lg z-10"
      }`}
    >
      {/* Target Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        className="!w-2 !h-2 !bg-[#00A3E0] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Source Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {isFocused && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00A3E0]"></span>
        </span>
      )}

      <div className="mb-2">
        <FlowNodeIcon
          icon={icon}
          className="w-10 h-10 transition-transform group-hover:scale-110 duration-200"
          color={isFacility || isCustomer ? "#ffffff" : "#0082C8"}
        />
      </div>

      <span className="text-[12px] font-extrabold tracking-wide uppercase leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  )
})
SquareNode.displayName = "SquareNode"

export const ProductNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as FlowNodeData
  const { id, name, icon, isDimmed, isHighlighted, isFocused, onSelect, onHover } = nodeData

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative group cursor-grab active:cursor-grabbing select-none transition-all duration-300 rounded-xl bg-white flex flex-col items-center justify-center p-2.5 text-center border-2 border-[#00A3E0] shadow-sm hover:shadow-md w-[110px] h-[75px] ${
        isDimmed ? "opacity-25 grayscale-[60%] scale-95" : "opacity-100"
      } ${
        isHighlighted
          ? "ring-4 ring-[#0082C8] bg-sky-50/50 scale-105 z-30 shadow-lg"
          : "hover:scale-102 z-10"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {isFocused && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0082C8]"></span>
        </span>
      )}

      <div className="mb-1">
        <FlowNodeIcon
          icon={icon}
          className="w-7 h-7 transition-transform group-hover:scale-110 duration-200"
          color="#0082C8"
        />
      </div>

      <span className="text-[11px] font-bold text-[#0082C8] tracking-wide uppercase leading-tight">
        {name}
      </span>
    </div>
  )
})
ProductNode.displayName = "ProductNode"

export const PillNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as FlowNodeData
  const { id, name, footnote, isDimmed, isHighlighted, isFocused, onSelect, onHover } = nodeData

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => onSelect?.(id)}
        onMouseEnter={() => onHover?.(id)}
        onMouseLeave={() => onHover?.(null)}
        className={`relative group cursor-grab active:cursor-grabbing select-none transition-all duration-300 rounded-full bg-white flex items-center justify-center px-4 py-2 text-center border-2 border-[#00A3E0] shadow-sm hover:shadow-md w-[115px] h-[45px] ${
          isDimmed ? "opacity-25 grayscale-[60%] scale-95" : "opacity-100"
        } ${
          isHighlighted
            ? "ring-4 ring-[#0082C8] bg-sky-50/70 scale-105 z-30 shadow-lg"
            : "hover:scale-102 z-10"
        }`}
      >
        <Handle
          type="target"
          position={Position.Left}
          id="target-left"
          className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          className="!w-2 !h-2 !bg-[#0082C8] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="source-bottom"
          className="!w-2 !h-2 !bg-[#00A3E0] !border-white opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {isFocused && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0082C8]"></span>
          </span>
        )}

        <span className="text-[12px] font-bold text-[#0082C8] tracking-wider uppercase">
          {name}
        </span>
      </div>

      {footnote && (
        <div className="mt-1.5 max-w-[260px] text-center pointer-events-none">
          <span className="text-[10px] text-slate-500 font-medium tracking-tight">
            {footnote}
          </span>
        </div>
      )}
    </div>
  )
})
PillNode.displayName = "PillNode"

export const ZoneBarNode = memo(({ data }: NodeProps) => {
  const { title, width = 450 } = data as { title: string; width?: number }

  return (
    <div
      style={{ width: `${width}px` }}
      className="py-3 px-6 rounded-full bg-white border-2 border-[#00A3E0] shadow-sm flex items-center justify-center select-none"
    >
      <span className="text-sm font-extrabold text-[#0082C8] tracking-wide">
        {title}
      </span>
    </div>
  )
})
ZoneBarNode.displayName = "ZoneBarNode"
