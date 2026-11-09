"use client"

import React, { useState } from "react"
import { PRODUCT_FLOW_2_DATA, Flow2Node, Flow2Zone } from "../_data/productFlow2Data"
import { Flow2Icon } from "./Flow2Icons"
import { ChevronRight, ArrowRight, BookOpen, Target, Sparkles, Building2, Beaker } from "lucide-react"

interface ProductFlow2MobileViewProps {
  locale: "id" | "en"
  activeZone: Flow2Zone | "all"
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
}

export const ProductFlow2MobileView: React.FC<ProductFlow2MobileViewProps> = ({
  locale,
  activeZone,
  selectedNodeId,
  onSelectNode,
}) => {
  const [expandedSection, setExpandedSection] = useState<string>("upstream-feed")
  const nodes = PRODUCT_FLOW_2_DATA.nodes

  const sections = [
    {
      id: "upstream-feed",
      zone: "upstream" as Flow2Zone,
      title: {
        id: "1. Bahan Baku Utama Hulu (Upstream Feedstocks)",
        en: "1. Primary Upstream Feedstocks",
      },
      description: {
        id: "Bahan mentah yang diekstraksi dari alam sebelum proses pengilangan",
        en: "Natural raw materials before refining operations",
      },
      nodeIds: ["crude-oil", "natural-gas"],
    },
    {
      id: "upstream-pretreatment",
      zone: "upstream" as Flow2Zone,
      title: {
        id: "2. Pemurnian & Pemisahan Gas (Refining & Separation)",
        en: "2. Refining & Gas Separation",
      },
      description: {
        id: "Fasilitas pemisahan hidrokarbon awal dan produk nafta, LPG & kondensat",
        en: "Pre-treatment facilities producing naphtha, LPG & condensate",
      },
      nodeIds: ["refinery-plant", "gas-separation-unit", "lpg", "naphtha", "condensate"],
    },
    {
      id: "upstream-cracker",
      zone: "upstream" as Flow2Zone,
      title: {
        id: "3. Pabrik Cracker & Bahan Kimia Dasar (Ethylene Cracker)",
        en: "3. Cracker Plant & Base Chemicals",
      },
      description: {
        id: "Thermal Cracking pada suhu tinggi memecah molekul menjadi monomer berharga",
        en: "High-temperature cracking breaking feeds into monomer molecules",
      },
      nodeIds: ["ethylene-cracker-plant", "ethylene", "propylene", "raw-c4", "pygas", "pfo"],
    },
    {
      id: "intermediate-facilities",
      zone: "intermediate" as Flow2Zone,
      title: {
        id: "4. Pabrik Pengolahan Antara (Intermediate Plants)",
        en: "4. Intermediate Processing Plants",
      },
      description: {
        id: "Fasilitas polimerisasi & distilasi lanjut Chandra Asri",
        en: "Chandra Asri polymerization and downstream facilities",
      },
      nodeIds: ["polyethylene-plant", "styrene-monomer-plant", "polypropylene-plant", "butadiene-plant"],
    },
    {
      id: "intermediate-products",
      zone: "intermediate" as Flow2Zone,
      title: {
        id: "5. Produk Polimer & Kimia Hilir (Polymers & Chemicals)",
        en: "5. Polymers & Downstream Products",
      },
      description: {
        id: "Produk bernilai tambah untuk industri manufaktur, otomotif, dan kemasan",
        en: "High-value products for manufacturing, automotive, and packaging",
      },
      nodeIds: ["hdpe", "lldpe", "styrene-monomer", "toluene", "homo-pp", "random-pp", "impact-pp", "butadiene", "raff-1"],
    },
  ]

  const filteredSections = sections.filter(
    (sec) => activeZone === "all" || sec.zone === activeZone
  )

  return (
    <div className="space-y-4">
      {filteredSections.map((sec) => {
        const isExpanded = expandedSection === sec.id

        return (
          <div
            key={sec.id}
            className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all"
          >
            {/* Section Header */}
            <button
              onClick={() => setExpandedSection(isExpanded ? "" : sec.id)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-50 text-[#0082C8] border border-sky-200">
                    {sec.zone === "upstream" ? "Upstream" : "Intermediate"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#062C48]">
                  {sec.title[locale]}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {sec.description[locale]}
                </p>
              </div>

              <div
                className={`p-2 rounded-xl text-slate-400 transition-transform duration-200 ${
                  isExpanded ? "rotate-90 text-[#0082C8]" : ""
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            {/* Section Content */}
            {isExpanded && (
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 divide-y divide-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                  {sec.nodeIds.map((nodeId) => {
                    const node = nodes[nodeId]
                    if (!node) return null

                    const isSelected = selectedNodeId === node.id
                    const isFacility = node.category === "facility"

                    return (
                      <div
                        key={node.id}
                        onClick={() => onSelectNode(node.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                          isSelected
                            ? "border-[#0082C8] bg-sky-50/50 ring-2 ring-[#0082C8]/30 shadow-sm"
                            : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                              isFacility
                                ? "bg-white border-2 border-[#0082C8] text-[#0082C8]"
                                : "bg-[#0082C8] border border-[#0070ad] text-white"
                            }`}
                          >
                            <Flow2Icon
                              type={node.iconType}
                              className="w-5 h-5"
                              color={isFacility ? "#0082C8" : "#ffffff"}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {node.category}
                            </span>
                            <h4 className="text-sm font-bold text-[#062C48] truncate">
                              {node.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {node.definition
                                ? node.definition[locale]
                                : node.mainFunction[locale]}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-[11px] font-semibold text-[#0082C8] flex items-center gap-1 group-hover:underline">
                            {locale === "id" ? "Lihat Detail Modal" : "View Details"}
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

