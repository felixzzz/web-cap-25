"use client"

import React from "react"

interface IconProps {
  className?: string
  color?: string
}

/**
 * Tilted conical flask pouring a droplet — exact match to the blue product cards in the slide diagram
 */
export const FlaskDropIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Conical Flask tilted at an angle */}
    <g transform="translate(1, 0)">
      {/* Flask rim/neck */}
      <path
        d="M11 6L16.5 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Flask Body */}
      <path
        d="M12.5 6.5V11L7.2 20.8C6.3 22.4 7.5 24.5 9.4 24.5H20.6C22.5 24.5 23.7 22.4 22.8 20.8L17.5 11V6.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Liquid level mark */}
      <path
        d="M9.5 18H20.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Liquid bubble inside */}
      <circle cx="15" cy="21.5" r="1.3" fill={color} />
    </g>
    {/* Droplet falling from top-right / pour */}
    <path
      d="M24.5 10C24.5 10 26.8 12.8 26.8 14.5C26.8 15.8 25.8 16.8 24.5 16.8C23.2 16.8 22.2 15.8 22.2 14.5C22.2 12.8 24.5 10 24.5 10Z"
      fill={color}
    />
  </svg>
)

/**
 * Industrial processing plant / factory facility — exact match to the white plant cards in the slide diagram
 */
export const FactoryPlantIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Base ground line */}
    <line x1="4" y1="26" x2="28" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Factory Silhouette with sawtooth roof & main hall */}
    <path
      d="M6 26V14L13 18V13L20 17V8L26 12V26H6Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Door / Entry port */}
    <rect x="14" y="21" width="4" height="5" rx="0.5" fill={color} />
    {/* Windows */}
    <rect x="8" y="21" width="3" height="3" rx="0.5" fill={color} />
    <rect x="21" y="21" width="3" height="3" rx="0.5" fill={color} />
    {/* Chimney vent accent */}
    <line x1="23" y1="6" x2="23" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const Flow2Icon: React.FC<{ type: "flask" | "plant"; className?: string; color?: string }> = ({
  type,
  className = "w-6 h-6",
  color = "currentColor",
}) => {
  if (type === "plant") {
    return <FactoryPlantIcon className={className} color={color} />
  }
  return <FlaskDropIcon className={className} color={color} />
}

