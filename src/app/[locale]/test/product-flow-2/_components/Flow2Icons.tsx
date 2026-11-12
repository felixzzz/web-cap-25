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

/**
 * Crude Oil Barrel / Drum Icon
 */
export const BarrelIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="16" cy="8" rx="8" ry="3" stroke={color} strokeWidth="2.2" />
    <path
      d="M8 8V24C8 25.66 11.58 27 16 27C20.42 27 24 25.66 24 24V8"
      stroke={color}
      strokeWidth="2.2"
    />
    <path d="M8 14C8 15.66 11.58 17 16 17C20.42 17 24 15.66 24 14" stroke={color} strokeWidth="1.8" />
    <path d="M8 20C8 21.66 11.58 23 16 23C20.42 23 24 21.66 24 20" stroke={color} strokeWidth="1.8" />
  </svg>
)

/**
 * Natural Gas / Flame Icon
 */
export const FlameIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M17 5C17 5 19.5 9 19.5 12C19.5 13.5 18.5 14.8 17.5 15.5C18.8 14.5 21 14 22 16.5C23.2 19.5 21.5 23 19 25C15 28.2 9.5 25.5 9.5 20C9.5 16 13 13 14 10C14.8 7.5 17 5 17 5Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 19C16 19 17.5 20.5 17.5 22C17.5 23 16.5 24 15 24C13.5 24 13 23 13 22C13 20.5 15 19 16 19Z"
      fill={color}
    />
  </svg>
)

/**
 * Droplet Icon
 */
export const DropletIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 6C16 6 8 16 8 20.5C8 24.6 11.6 27 16 27C20.4 27 24 24.6 24 20.5C24 16 16 6 16 6Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 18C13 15.5 15.5 13 16 12.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Chemistry Molecule / Atom Icon
 */
export const AtomIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="3" fill={color} />
    <ellipse cx="16" cy="16" rx="10" ry="4" stroke={color} strokeWidth="2" transform="rotate(-30 16 16)" />
    <ellipse cx="16" cy="16" rx="10" ry="4" stroke={color} strokeWidth="2" transform="rotate(30 16 16)" />
  </svg>
)

/**
 * Polymer Layers Icon
 */
export const LayersIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 6L6 11L16 16L26 11L16 6Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M6 16L16 21L26 16" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M6 21L16 26L26 21" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
)

/**
 * Transport / Logistics Truck Icon
 */
export const TruckIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M4 8H19V22H4V8Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M19 13H24L27 17V22H19V13Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="24" r="2.5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="23" cy="24" r="2.5" stroke={color} strokeWidth="2" fill="none" />
  </svg>
)

/**
 * Storage Tank / Gas Cylinder Icon
 */
export const CylinderIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="9" y="10" width="14" height="15" rx="3" stroke={color} strokeWidth="2.2" />
    <path d="M13 10V7H19V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="5" x2="16" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="17" x2="23" y2="17" stroke={color} strokeWidth="1.8" />
  </svg>
)

export const AVAILABLE_FLOW_ICONS: Array<{
  id: string
  label: string
  component: React.FC<IconProps>
}> = [
  { id: "flask", label: "Flask Drop", component: FlaskDropIcon },
  { id: "plant", label: "Factory Plant", component: FactoryPlantIcon },
  { id: "barrel", label: "Oil Barrel", component: BarrelIcon },
  { id: "flame", label: "Gas Flame", component: FlameIcon },
  { id: "droplet", label: "Droplet", component: DropletIcon },
  { id: "atom", label: "Atom / Molecule", component: AtomIcon },
  { id: "layers", label: "Polymer Layers", component: LayersIcon },
  { id: "cylinder", label: "Tank / Cylinder", component: CylinderIcon },
  { id: "truck", label: "Logistics Truck", component: TruckIcon },
]

export const Flow2Icon: React.FC<{
  type?: string
  customUrl?: string
  className?: string
  color?: string
}> = ({
  type = "flask",
  customUrl,
  className = "w-6 h-6",
  color = "currentColor",
}) => {
  if (customUrl) {
    return (
      <img
        src={customUrl}
        alt="Node logo"
        className={`${className} object-contain`}
        onError={(e) => {
          // Fallback to default flask if broken URL
          e.currentTarget.style.display = "none"
        }}
      />
    )
  }

  switch (type) {
    case "plant":
      return <FactoryPlantIcon className={className} color={color} />
    case "barrel":
      return <BarrelIcon className={className} color={color} />
    case "flame":
    case "gas":
      return <FlameIcon className={className} color={color} />
    case "droplet":
      return <DropletIcon className={className} color={color} />
    case "atom":
      return <AtomIcon className={className} color={color} />
    case "layers":
      return <LayersIcon className={className} color={color} />
    case "cylinder":
    case "tank":
      return <CylinderIcon className={className} color={color} />
    case "truck":
      return <TruckIcon className={className} color={color} />
    case "flask":
    default:
      return <FlaskDropIcon className={className} color={color} />
  }
}
