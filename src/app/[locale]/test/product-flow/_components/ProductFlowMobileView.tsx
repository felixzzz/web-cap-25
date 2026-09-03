"use client"

import React from "react"
import { PRODUCT_FLOW_DATA, FlowNode, NodeCategory } from "../_data/productFlowData"
import { FlowNodeIcon } from "./FlowIcons"
import { ChevronRight, ArrowDown, MapPin, Tag, ArrowRight } from "lucide-react"

interface ProductFlowMobileViewProps {
  locale: "id" | "en"
  activeCategory: NodeCategory | "all"
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
}

export const ProductFlowMobileView: React.FC<ProductFlowMobileViewProps> = ({
  locale,
  activeCategory,
  selectedNodeId,
  onSelectNode,
}) => {
  // Mobile pipeline steps grouped by process logic
  const stages = [
    {
      id: "stage-1",
      title: {
        id: "1. Bahan Baku & Pengilangan (Bukom)",
        en: "1. Feedstocks & Refinery Complex (Bukom)",
      },
      zone: PRODUCT_FLOW_DATA.zones[0].name[locale],
      nodeIds: ["crude-oil", "refinery-complex"],
    },
    {
      id: "stage-2",
      title: {
        id: "2. Produk Minyak & Bahan Bakar (8 Produk)",
        en: "2. Fuel & Oil Products (8 Refined Products)",
      },
      zone: PRODUCT_FLOW_DATA.zones[0].name[locale],
      nodeIds: [
        "lpg",
        "naphtha",
        "hydrowax",
        "gas-oil",
        "mogas",
        "jet-fuel",
        "base-oil",
        "bitumen-fuel-oil",
      ],
    },
    {
      id: "stage-3",
      title: {
        id: "3. Ethylene Cracker & Pelanggan Domestik",
        en: "3. Ethylene Cracker Complex & Domestic Customers",
      },
      zone: PRODUCT_FLOW_DATA.zones[0].name[locale],
      nodeIds: ["ethylene-cracker", "customers-bukom"],
    },
    {
      id: "stage-4",
      title: {
        id: "4. Pipa Bawah Laut & Bahan Kimia Dasar (Jurong)",
        en: "4. Subsea Pipeline & Base Chemicals (Jurong)",
      },
      zone: PRODUCT_FLOW_DATA.zones[2].name[locale],
      nodeIds: ["ethylene", "propylene", "benzene", "butadiene"],
    },
    {
      id: "stage-5",
      title: {
        id: "5. Kompleks Fasilitas MEG & SMPO/PO",
        en: "5. MEG & SMPO/PO Production Facilities",
      },
      zone: PRODUCT_FLOW_DATA.zones[2].name[locale],
      nodeIds: ["meg-facility", "smpo-facility"],
    },
    {
      id: "stage-6",
      title: {
        id: "6. Produk Intermediat, HDPE & Pelanggan Global",
        en: "6. Intermediates, HDPE & Global Customers",
      },
      zone: PRODUCT_FLOW_DATA.zones[2].name[locale],
      nodeIds: [
        "ethoxylates",
        "hpeo",
        "meg-product",
        "po",
        "sm",
        "mpg",
        "polyols",
        "hdpe",
        "customers-jurong",
      ],
    },
  ]

  return (
    <div className="w-full space-y-8 pb-12">
      {stages.map((stage, sIdx) => {
        // Filter stage nodes according to activeCategory filter
        const visibleNodes = stage.nodeIds
          .map((id) => PRODUCT_FLOW_DATA.nodes[id])
          .filter((n): n is FlowNode => {
            if (!n) return false
            if (activeCategory === "all") return true
            return n.category === (activeCategory as NodeCategory)
          })

        if (visibleNodes.length === 0) return null

        return (
          <div key={stage.id} className="relative space-y-4">
            {/* Stage Header Card */}
            <div className="bg-[#062C48] text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {stage.zone}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {stage.title[locale]}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-sky-200">
                {visibleNodes.length} {locale === "id" ? "item" : "items"}
              </span>
            </div>

            {/* Grid of Nodes in this stage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibleNodes.map((node) => {
                const isFacility = node.category === "facility"
                const isCustomer = node.category === "customer"
                const isSelected = selectedNodeId === node.id

                return (
                  <div
                    key={node.id}
                    onClick={() => onSelectNode(node.id)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 shadow-sm active:scale-98 ${
                      isFacility
                        ? "bg-[#0082C8] text-white border-[#0082C8] shadow-md"
                        : isCustomer
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"
                        : "bg-white text-slate-800 border-[#00A3E0]/50 hover:border-[#0082C8]"
                    } ${
                      isSelected
                        ? "ring-4 ring-[#00A3E0] scale-102 shadow-lg z-20"
                        : ""
                    }`}
                  >
                    {/* Node Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isFacility
                          ? "bg-white/20 border-white/30 text-white"
                          : isCustomer
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-sky-50 border-sky-200 text-[#0082C8]"
                      }`}
                    >
                      <FlowNodeIcon
                        icon={node.icon}
                        className="w-7 h-7"
                        color={isFacility || isCustomer ? "#ffffff" : "#0082C8"}
                      />
                    </div>

                    {/* Node Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isFacility
                              ? "bg-white/20 text-white"
                              : isCustomer
                              ? "bg-slate-700 text-slate-200"
                              : "bg-sky-100 text-[#0082C8]"
                          }`}
                        >
                          {node.category}
                        </span>

                        <ChevronRight
                          className={`w-4 h-4 ${
                            isFacility || isCustomer
                              ? "text-white/60"
                              : "text-slate-400"
                          }`}
                        />
                      </div>

                      <h4 className="text-sm font-bold mt-1 tracking-tight truncate">
                        {node.name}
                      </h4>

                      <p
                        className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                          isFacility || isCustomer
                            ? "text-slate-200"
                            : "text-slate-500"
                        }`}
                      >
                        {node.description[locale]}
                      </p>

                      {/* Connections count tag */}
                      <div className="mt-2 flex items-center gap-2 text-[11px]">
                        {node.outputs && node.outputs.length > 0 && (
                          <span
                            className={`inline-flex items-center gap-1 font-medium ${
                              isFacility || isCustomer
                                ? "text-sky-200"
                                : "text-[#0082C8]"
                            }`}
                          >
                            <ArrowRight className="w-3 h-3" />
                            {node.outputs.length}{" "}
                            {locale === "id" ? "alur keluar" : "outputs"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Downward process flow indicator arrow between stages */}
            {sIdx < stages.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0082C8] flex items-center justify-center border border-sky-300 shadow-sm animate-bounce">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
