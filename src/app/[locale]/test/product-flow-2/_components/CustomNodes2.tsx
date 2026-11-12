"use client"

import React, { memo } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { Flow2Icon } from "./Flow2Icons"
import { Flow2Category, Flow2Zone, FlowNodeColorPreset } from "../_data/productFlow2Data"

export interface Flow2NodeData {
  id: string
  name: string
  fullName?: string
  iconType?: string
  customIconUrl?: string
  category: Flow2Category
  zone: Flow2Zone
  colorPreset?: FlowNodeColorPreset
  customBgColor?: string
  customTextColor?: string
  customBorderColor?: string
  isDimmed?: boolean
  isHighlighted?: boolean
  isFocused?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
}

/**
 * Resolves node colors based on preset or custom hex overrides
 */
export function getNodeColors(nodeData: Partial<Flow2NodeData>) {
  const isExcludedDefault = [
    "crude-oil",
    "natural-gas",
    "refinery-plant",
    "gas-separation-unit",
    "lpg",
    "naphtha",
    "condensate",
  ].includes(nodeData.id || "")

  const preset: FlowNodeColorPreset =
    nodeData.colorPreset ||
    (isExcludedDefault
      ? "exclude"
      : nodeData.category === "facility"
      ? "facility"
      : "product")

  if (preset === "facility") {
    const bg = nodeData.customBgColor || "#ffffff"
    const text = nodeData.customTextColor || "#0082C8"
    const border = nodeData.customBorderColor || "#0082C8"
    return {
      bg,
      text,
      border,
      borderWidth: 2,
      iconColor: text,
      handleColor: text,
      preset: "facility" as const,
    }
  }

  if (preset === "exclude") {
    const bg = nodeData.customBgColor || "#1B2B5A"
    const text = nodeData.customTextColor || "#ffffff"
    const border = nodeData.customBorderColor || "#131f42"
    return {
      bg,
      text,
      border,
      borderWidth: 1.5,
      iconColor: text,
      handleColor: "#1B2B5A",
      preset: "exclude" as const,
    }
  }

  if (preset === "custom") {
    const bg = nodeData.customBgColor || "#0082C8"
    const text = nodeData.customTextColor || "#ffffff"
    const border = nodeData.customBorderColor || "#0070ad"
    return {
      bg,
      text,
      border,
      borderWidth: 2,
      iconColor: text,
      handleColor: bg,
      preset: "custom" as const,
    }
  }

  // Default "product" (Chandra Asri Product)
  const bg = nodeData.customBgColor || "#0082C8"
  const text = nodeData.customTextColor || "#ffffff"
  const border = nodeData.customBorderColor || "#0070ad"
  return {
    bg,
    text,
    border,
    borderWidth: 1,
    iconColor: text,
    handleColor: "#0082C8",
    preset: "product" as const,
  }
}

/**
 * Solid product card node — Feedstocks & Petrochemical products
 */
export const FlowProductNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as Flow2NodeData
  const {
    id,
    name,
    iconType,
    customIconUrl,
    isDimmed,
    isHighlighted,
    isFocused,
    onSelect,
    onHover,
  } = nodeData

  const colors = getNodeColors(nodeData)
  const defaultIcon = nodeData.category === "facility" ? "plant" : "flask"

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        borderWidth: `${colors.borderWidth}px`,
        borderStyle: "solid",
      }}
      className={`relative group cursor-pointer select-none transition-all duration-300 rounded-xl flex flex-col items-center justify-center p-2.5 text-center shadow-sm w-[112px] h-[72px] ${
        isDimmed ? "opacity-30 grayscale-[50%] scale-95" : "opacity-100"
      } ${
        isHighlighted
          ? "ring-4 ring-[#38BDF8] shadow-lg scale-105 z-30"
          : "hover:scale-105 hover:shadow-md z-10"
      }`}
    >
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{ backgroundColor: colors.handleColor }}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
      />
      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{ backgroundColor: colors.handleColor }}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
      />

      {isFocused && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
          <span
            style={{ borderColor: colors.border }}
            className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border"
          ></span>
        </span>
      )}

      {/* Icon / Custom Logo */}
      <div className="mb-1">
        <Flow2Icon
          type={iconType || defaultIcon}
          customUrl={customIconUrl}
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          color={colors.iconColor}
        />
      </div>

      {/* Label */}
      <span
        style={{ color: colors.text }}
        className="text-[10px] font-bold tracking-wide uppercase leading-tight line-clamp-2 px-1"
      >
        {name}
      </span>
    </div>
  )
})
FlowProductNode.displayName = "FlowProductNode"

/**
 * Facility card node — Processing Plants & Facilities
 */
export const FlowPlantNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as Flow2NodeData
  const {
    id,
    name,
    iconType,
    customIconUrl,
    isDimmed,
    isHighlighted,
    isFocused,
    onSelect,
    onHover,
  } = nodeData

  const colors = getNodeColors(nodeData)

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        borderWidth: `${colors.borderWidth}px`,
        borderStyle: "solid",
      }}
      className={`relative group cursor-pointer select-none transition-all duration-300 rounded-xl flex flex-col items-center justify-center p-2.5 text-center shadow-xs w-[124px] h-[76px] ${
        isDimmed ? "opacity-30 grayscale-[50%] scale-95" : "opacity-100"
      } ${
        isHighlighted
          ? "ring-4 ring-[#38BDF8] shadow-lg scale-105 z-30"
          : "hover:scale-105 hover:shadow-md z-10"
      }`}
    >
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{ backgroundColor: colors.handleColor }}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
      />
      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{ backgroundColor: colors.handleColor }}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
      />

      {isFocused && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span
            style={{ backgroundColor: colors.handleColor }}
            className="relative inline-flex rounded-full h-3.5 w-3.5"
          ></span>
        </span>
      )}

      {/* Factory Icon / Custom Logo */}
      <div className="mb-1">
        <Flow2Icon
          type={iconType || "plant"}
          customUrl={customIconUrl}
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          color={colors.iconColor}
        />
      </div>

      {/* Label */}
      <span
        style={{ color: colors.text }}
        className="text-[10px] font-bold tracking-wider uppercase leading-tight line-clamp-2 px-1"
      >
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
