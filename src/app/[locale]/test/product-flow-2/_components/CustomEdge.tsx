"use client"

import React, { memo } from "react"
import {
  EdgeProps,
  getSmoothStepPath,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
} from "@xyflow/react"

export interface FlowEdgeData {
  variant?: "blue" | "cyan" | "navy" | "subsea"
  showArrowBadge?: boolean
  arrowBadgePosition?: "end" | "middle"
  isHighlighted?: boolean
  isDimmed?: boolean
}

export const FlowStepEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
  }: EdgeProps) => {
    const edgeData = (data || {}) as FlowEdgeData
    const {
      variant = "blue",
      showArrowBadge = true,
      arrowBadgePosition = "end",
      isHighlighted = false,
      isDimmed = false,
    } = edgeData

    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 12,
    })

    const isSubsea = variant === "subsea"
    const isCyan = variant === "cyan"
    const isNavy = variant === "navy"

    const strokeColor = isSubsea
      ? "#0082C8"
      : isNavy
      ? "#062C48"
      : isCyan
      ? "#00A3E0"
      : "#0082C8"

    const badgeX = arrowBadgePosition === "end" ? targetX - 16 : labelX
    const badgeY = arrowBadgePosition === "end" ? targetY : labelY

    return (
      <>
        {/* Glow halo when highlighted */}
        {isHighlighted && (
          <BaseEdge
            path={edgePath}
            style={{
              stroke: "#38BDF8",
              strokeWidth: 6,
              strokeOpacity: 0.6,
              filter: "blur(2px)",
            }}
          />
        )}

        {/* Main Edge Line */}
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            ...style,
            stroke: strokeColor,
            strokeWidth: isHighlighted ? 3 : isSubsea ? 3.5 : 2.5,
            strokeDasharray: isSubsea ? "6 3" : undefined,
            opacity: isDimmed ? 0.2 : 1,
            transition: "all 0.3s ease",
          }}
          markerEnd={markerEnd}
        />

        {/* Arrow Badge Indicator */}
        {showArrowBadge && !isSubsea && (
          <EdgeLabelRenderer>
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${badgeX}px,${badgeY}px)`,
                pointerEvents: "none",
                opacity: isDimmed ? 0.2 : 1,
                transition: "all 0.3s ease",
              }}
              className="nodrag nopan z-20"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${
                  isNavy
                    ? "bg-[#062C48] text-white"
                    : isCyan
                    ? "bg-[#00A3E0] text-white"
                    : "bg-[#0082C8] text-white"
                } ${isHighlighted ? "scale-125 ring-2 ring-sky-300" : ""}`}
              >
                <svg
                  className="w-2 h-2 fill-current"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 1.5 1 L 6.5 4 L 1.5 7 z" />
                </svg>
              </div>
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    )
  }
)
FlowStepEdge.displayName = "FlowStepEdge"
