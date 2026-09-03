import React from "react"

interface IconProps {
  className?: string
  size?: number
  color?: string
}

export const CrudeOilIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Offshore rig & tanker ship */}
    <path d="M6 46C14 44 20 48 28 46C36 44 42 48 50 46C54 45 58 46 60 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 44L14 36H48L52 44" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M18 36V28H28V36" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M36 36V22H44V36" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M40 22V16H42V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Drilling derrick silhouette */}
    <path d="M22 28L25 14H27L30 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23.5 21H28.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="26" cy="10" r="2" fill={color} />
    <circle cx="20" cy="40" r="1.5" fill={color} />
    <circle cx="25" cy="40" r="1.5" fill={color} />
    <circle cx="30" cy="40" r="1.5" fill={color} />
  </svg>
)

export const RefineryIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Refinery dome & distillation towers */}
    <path d="M12 50V28C12 22 20 22 20 28V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M20 50V20C20 14 30 14 30 20V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M30 50V32C30 26 38 26 38 32V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    {/* Base plate */}
    <path d="M8 50H56" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Connecting process pipes */}
    <path d="M12 34H38" stroke={color} strokeWidth="2" />
    <path d="M12 42H38" stroke={color} strokeWidth="2" />
    {/* Fractionation Column Right */}
    <path d="M44 50V24H52V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M46 20L48 24H50L52 20" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M48 20V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Industrial cloud / flame */}
    <path d="M48 10C46 8 47 6 49 5C51 6 52 8 50 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const LpgIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* LPG Gas Tank Cylinder */}
    <rect x="18" y="20" width="28" height="32" rx="14" stroke={color} strokeWidth="2.5" />
    {/* Top handle shroud */}
    <path d="M22 20V14C22 12 24 10 26 10H38C40 10 42 12 42 14V20" stroke={color} strokeWidth="2.5" />
    <rect x="28" y="13" width="8" height="3" rx="1.5" fill={color} />
    {/* Bottom stand ring */}
    <path d="M22 52V56H42V52" stroke={color} strokeWidth="2.5" />
    {/* Flame / Pressure icon inside */}
    <path d="M32 28C32 28 37 33 37 37C37 39.76 34.76 42 32 42C29.24 42 27 39.76 27 37C27 33 32 28 32 28Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M32 35C32 35 34 37 34 38.5C34 39.6 33.1 40.5 32 40.5C30.9 40.5 30 39.6 30 38.5C30 37 32 35 32 35Z" fill={color} />
  </svg>
)

export const NaphthaIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Erlenmeyer Flask */}
    <path d="M27 12H37" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M29 12V24L16 48C14.5 50.5 16.5 54 19.5 54H44.5C47.5 54 49.5 50.5 48 48L35 24V12" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    {/* Liquid and bubbles */}
    <path d="M20 42C24 40 28 44 32 42C36 40 40 44 44 42" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="26" cy="47" r="2" fill={color} />
    <circle cx="35" cy="46" r="1.5" fill={color} />
    <circle cx="31" cy="36" r="1.5" stroke={color} strokeWidth="1.5" />
  </svg>
)

export const HydrowaxIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Jerrycan / Container */}
    <rect x="18" y="18" width="28" height="36" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M24 18V12H34V18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M38 14H42V18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    {/* Reinforcing ribs */}
    <rect x="24" y="26" width="16" height="20" rx="3" stroke={color} strokeWidth="2" />
    <line x1="32" y1="26" x2="32" y2="46" stroke={color} strokeWidth="1.5" />
  </svg>
)

export const GasOilIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Gas pump dispenser */}
    <rect x="14" y="14" width="26" height="40" rx="4" stroke={color} strokeWidth="2.5" />
    <rect x="19" y="20" width="16" height="10" rx="2" stroke={color} strokeWidth="2" />
    <line x1="14" y1="36" x2="40" y2="36" stroke={color} strokeWidth="2" />
    {/* Hose & Nozzle */}
    <path d="M40 22H44C47 22 49 24 49 27V42C49 45 46 47 43 47H40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M48 20L52 16V22L48 20Z" fill={color} />
  </svg>
)

export const MogasIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Motor oil can / bottle */}
    <path d="M24 16L32 10L40 16V20L44 26V52C44 54.2 42.2 56 40 56H24C21.8 56 20 54.2 20 52V20L24 16Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M24 20H40" stroke={color} strokeWidth="2" />
    {/* Angled handle & fill mark */}
    <path d="M20 28H16V46H20" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M30 34C30 34 35 38 35 41C35 43.2 33.2 45 31 45C28.8 45 27 43.2 27 41C27 38 30 34 30 34Z" stroke={color} strokeWidth="2" />
  </svg>
)

export const JetFuelIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fuel Drum */}
    <rect x="16" y="16" width="22" height="36" rx="4" stroke={color} strokeWidth="2.5" />
    <line x1="16" y1="26" x2="38" y2="26" stroke={color} strokeWidth="2" />
    <line x1="16" y1="42" x2="38" y2="42" stroke={color} strokeWidth="2" />
    {/* Fuel Droplet */}
    <path d="M47 24C47 24 53 32 53 37C53 40.3 50.3 43 47 43C43.7 43 41 40.3 41 37C41 32 47 24 47 24Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M47 32C47 32 49 35 49 37C49 38.1 48.1 39 47 39" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const BaseOilIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Lubricant bottle with measurement gauge */}
    <path d="M26 12H38V18L44 24V52C44 54.2 42.2 56 40 56H24C21.8 56 20 54.2 20 52V24L26 18V12Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="24" y="28" width="6" height="20" rx="1.5" stroke={color} strokeWidth="1.5" />
    <line x1="34" y1="32" x2="38" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="38" x2="38" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="44" x2="38" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const BitumenIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bitumen drum with flame / highway road mark */}
    <rect x="18" y="16" width="28" height="36" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M24 16V12H40V16" stroke={color} strokeWidth="2" />
    <circle cx="32" cy="34" r="9" stroke={color} strokeWidth="2" />
    <path d="M32 29C32 29 35 32 35 34.5C35 36.1 33.6 37.5 32 37.5C30.4 37.5 29 36.1 29 34.5C29 32 32 29 32 29Z" fill={color} />
  </svg>
)

export const CrackerIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ethylene Cracker Furnace & Columns */}
    <path d="M12 50V30H24V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M15 30V16H21V30" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 50V22C24 18 34 18 34 22V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M34 50V34H48V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M38 34V18H44V34" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 50H56" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="29" cy="28" r="2" fill={color} />
    <circle cx="29" cy="36" r="2" fill={color} />
  </svg>
)

export const MegPlantIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* MEG Chemical Production Plant with Test Tube */}
    <path d="M14 50V30L22 22V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M22 50V26H42V50" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M28 26V16H36V26" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 50H56" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Test cylinder on side */}
    <rect x="46" y="24" width="8" height="26" rx="4" stroke={color} strokeWidth="2" />
    <line x1="47" y1="32" x2="51" y2="32" stroke={color} strokeWidth="1.5" />
    <line x1="47" y1="38" x2="51" y2="38" stroke={color} strokeWidth="1.5" />
    <line x1="47" y1="44" x2="51" y2="44" stroke={color} strokeWidth="1.5" />
  </svg>
)

export const SmpoPlantIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* SMPO Plant with flask and graduated beaker */}
    <path d="M20 18H28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M22 18V26L14 42C13 44 14.5 47 17 47H31C33.5 47 35 44 34 42L26 26V18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <rect x="36" y="22" width="16" height="25" rx="3" stroke={color} strokeWidth="2" />
    <path d="M36 26H32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="38" r="1.5" fill={color} />
    <circle cx="28" cy="42" r="1.5" fill={color} />
    <line x1="40" y1="30" x2="46" y2="30" stroke={color} strokeWidth="1.5" />
    <line x1="40" y1="36" x2="46" y2="36" stroke={color} strokeWidth="1.5" />
  </svg>
)

export const ChemicalIcon: React.FC<IconProps> = ({ className = "w-8 h-8", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Monomer / Molecule / Flask icon */}
    <circle cx="32" cy="18" r="6" stroke={color} strokeWidth="2.5" />
    <circle cx="18" cy="42" r="6" stroke={color} strokeWidth="2.5" />
    <circle cx="46" cy="42" r="6" stroke={color} strokeWidth="2.5" />
    <line x1="28" y1="23" x2="22" y2="37" stroke={color} strokeWidth="2.5" />
    <line x1="36" y1="23" x2="42" y2="37" stroke={color} strokeWidth="2.5" />
    <line x1="24" y1="42" x2="40" y2="42" stroke={color} strokeWidth="2.5" />
  </svg>
)

export const CustomersIcon: React.FC<IconProps> = ({ className = "w-10 h-10", color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Central Customer Figure */}
    <circle cx="32" cy="22" r="7" fill={color} />
    <path d="M20 48C20 41.4 25.4 36 32 36C38.6 36 44 41.4 44 48" stroke={color} strokeWidth="3" strokeLinecap="round" fill={color} />
    {/* Left Customer Figure */}
    <circle cx="18" cy="26" r="5" fill={color} />
    <path d="M10 48C10 43.6 13.6 40 18 40C20.5 40 22.7 41.1 24.2 43" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Customer Figure */}
    <circle cx="46" cy="26" r="5" fill={color} />
    <path d="M39.8 43C41.3 41.1 43.5 40 46 40C50.4 40 54 43.6 54 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const FlowNodeIcon: React.FC<{ icon: string; className?: string; color?: string }> = ({
  icon,
  className = "w-8 h-8",
  color = "currentColor",
}) => {
  switch (icon) {
    case "crude-oil":
      return <CrudeOilIcon className={className} color={color} />
    case "refinery":
      return <RefineryIcon className={className} color={color} />
    case "lpg":
      return <LpgIcon className={className} color={color} />
    case "naphtha":
      return <NaphthaIcon className={className} color={color} />
    case "hydrowax":
      return <HydrowaxIcon className={className} color={color} />
    case "gas-oil":
      return <GasOilIcon className={className} color={color} />
    case "mogas":
      return <MogasIcon className={className} color={color} />
    case "jet-fuel":
      return <JetFuelIcon className={className} color={color} />
    case "base-oil":
      return <BaseOilIcon className={className} color={color} />
    case "bitumen":
      return <BitumenIcon className={className} color={color} />
    case "cracker":
      return <CrackerIcon className={className} color={color} />
    case "meg-plant":
      return <MegPlantIcon className={className} color={color} />
    case "smpo-plant":
      return <SmpoPlantIcon className={className} color={color} />
    case "customers":
      return <CustomersIcon className={className} color={color} />
    case "chemical":
    default:
      return <ChemicalIcon className={className} color={color} />
  }
}
