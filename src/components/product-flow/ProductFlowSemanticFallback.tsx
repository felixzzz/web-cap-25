import React from "react"
import { PRODUCT_FLOW_2_DATA, Flow2Node } from "./data/productFlowData"

interface ProductFlowSemanticFallbackProps {
  locale: "id" | "en"
  className?: string
  defaultOpen?: boolean
}

interface ProcessSection {
  id: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  nodeIds: string[]
}

const PROCESS_SECTIONS: ProcessSection[] = [
  {
    id: "upstream-feed",
    title: {
      id: "1. Bahan Baku Hulu (Upstream Feedstocks)",
      en: "1. Primary Upstream Feedstocks",
    },
    description: {
      id: "Bahan mentah hidrokarbon alami sebelum proses pengilangan.",
      en: "Natural raw hydrocarbons prior to refining operations.",
    },
    nodeIds: ["crude-oil", "natural-gas"],
  },
  {
    id: "upstream-pretreatment",
    title: {
      id: "2. Pemurnian & Pemisahan Gas (Refining & Gas Separation)",
      en: "2. Refining & Gas Separation",
    },
    description: {
      id: "Fasilitas pemisahan hidrokarbon awal yang menghasilkan nafta, LPG, dan kondensat.",
      en: "Pre-treatment and separation facilities producing naphtha, LPG, and condensate.",
    },
    nodeIds: ["refinery-plant", "gas-separation-unit", "lpg", "naphtha", "condensate"],
  },
  {
    id: "upstream-cracker",
    title: {
      id: "3. Fasilitas Cracker & Monomer Dasar (Ethylene Cracker & Base Chemicals)",
      en: "3. Cracker Facilities & Base Chemicals",
    },
    description: {
      id: "Pemecahan molekul hidrokarbon pada suhu tinggi menjadi monomer dasar kimia.",
      en: "Thermal cracking of feedstocks at high temperatures into fundamental monomer molecules.",
    },
    nodeIds: ["ethylene-cracker-plant", "ethylene", "propylene", "raw-c4", "pygas", "pfo"],
  },
  {
    id: "intermediate-facilities",
    title: {
      id: "4. Pabrik Polimerisasi & Pengolahan Antara (Intermediate Plants)",
      en: "4. Polymerization & Intermediate Processing Plants",
    },
    description: {
      id: "Fasilitas manufaktur lanjutan milik Chandra Asri untuk polimerisasi dan distilasi.",
      en: "Chandra Asri downstream facilities for polymerization and fine distillation.",
    },
    nodeIds: ["polyethylene-plant", "styrene-monomer-plant", "polypropylene-plant", "butadiene-plant"],
  },
  {
    id: "intermediate-products",
    title: {
      id: "5. Produk Polimer & Kimia Bernilai Tambah (Polymers & Downstream Chemicals)",
      en: "5. Polymers & High-Value Downstream Chemicals",
    },
    description: {
      id: "Produk kimia dan plastik bernilai tambah untuk industri kemasan, otomotif, infrastruktur, dan manufaktur.",
      en: "Value-added polymers and specialty chemicals serving packaging, automotive, infrastructure, and consumer goods.",
    },
    nodeIds: ["hdpe", "lldpe", "styrene-monomer", "toluene", "homo-pp", "random-pp", "impact-pp", "butadiene", "raff-1"],
  },
]

export const ProductFlowSemanticFallback: React.FC<ProductFlowSemanticFallbackProps> = ({
  locale,
  className = "",
  defaultOpen = false,
}) => {
  const nodes = PRODUCT_FLOW_2_DATA.nodes
  const isId = locale === "id"

  // Prepare Schema.org ItemList for structured search indexing
  const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isId
      ? "Alur Proses & Katalog Produk Petrokimia Chandra Asri"
      : "Chandra Asri Petrochemical Process Flow & Product Catalog",
    "description": isId
      ? PRODUCT_FLOW_2_DATA.meta.description.id
      : PRODUCT_FLOW_2_DATA.meta.description.en,
    "numberOfItems": Object.keys(nodes).length,
    "itemListElement": Object.values(nodes).map((node, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": node.fullName || node.name,
        "description": node.definition?.[locale] || node.mainFunction?.[locale] || node.name,
        "category": node.category,
      },
    })),
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "feedstock":
        return isId ? "Bahan Baku (Feedstock)" : "Raw Feedstock"
      case "facility":
        return isId ? "Fasilitas Produksi" : "Production Facility"
      case "product":
        return isId ? "Produk Petrokimia" : "Petrochemical Product"
      default:
        return category
    }
  }

  return (
    <section
      aria-label={
        isId
          ? "Rincian Alur Produksi & Produk Petrokimia (Tampilan Teks Semantik)"
          : "Production Flow & Product Catalog (Semantic Text View)"
      }
      className={`w-full mt-6 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />

      {/* Accessible & SEO-friendly Accordion via native HTML <details> */}
      <details
        open={defaultOpen}
        className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xs transition-all duration-300"
      >
        <summary className="flex cursor-pointer items-center justify-between text-left font-semibold text-[#062C48] hover:text-[#0082C8] focus:outline-hidden">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-xs text-[#0082C8]">
              📋
            </span>
            <span className="text-sm sm:text-base">
              {isId
                ? "Daftar Rinci Alur Proses, Bahan Baku & Produk (Teks / Aksesibilitas)"
                : "Detailed Process Flow, Feedstocks & Products Directory (Text / Accessibility)"}
            </span>
          </div>
          <span className="text-xs text-slate-500 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>

        <div className="mt-5 space-y-6 border-t border-slate-100 pt-5 text-sm text-slate-700">
          <p className="text-xs text-slate-500 leading-relaxed">
            {isId
              ? PRODUCT_FLOW_2_DATA.meta.description.id
              : PRODUCT_FLOW_2_DATA.meta.description.en}
          </p>

          {PROCESS_SECTIONS.map((sec) => (
            <div key={sec.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <h4 className="text-base font-bold text-[#062C48]">
                {sec.title[locale]}
              </h4>
              <p className="mt-0.5 text-xs text-slate-600 mb-3">
                {sec.description[locale]}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sec.nodeIds.map((nodeId) => {
                  const node = nodes[nodeId]
                  if (!node) return null

                  const inputNodes = (node.inputs || [])
                    .map((id) => nodes[id]?.name || id)
                    .join(", ")
                  const outputNodes = (node.outputs || [])
                    .map((id) => nodes[id]?.name || id)
                    .join(", ")

                  return (
                    <article
                      key={node.id}
                      className="flex flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-3.5 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h5 className="font-bold text-xs uppercase tracking-wide text-[#0082C8]">
                            {node.name}
                          </h5>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {getCategoryLabel(node.category)}
                          </span>
                        </div>

                        {node.fullName && (
                          <p className="text-xs font-semibold text-slate-900 mb-2">
                            {node.fullName}
                          </p>
                        )}

                        {node.definition?.[locale] && (
                          <p className="text-xs text-slate-600 line-clamp-3 mb-2 leading-relaxed">
                            {node.definition[locale]}
                          </p>
                        )}

                        {node.mainFunction?.[locale] && (
                          <div className="text-[11px] text-slate-500 mb-2">
                            <strong className="text-slate-700">
                              {isId ? "Fungsi Utama: " : "Main Function: "}
                            </strong>
                            {node.mainFunction[locale]}
                          </div>
                        )}
                      </div>

                      <footer className="mt-2 border-t border-slate-100 pt-2 text-[10px] text-slate-500 space-y-1">
                        {inputNodes && (
                          <div>
                            <span className="font-semibold text-slate-700">
                              {isId ? "Sumber Input: " : "Inputs: "}
                            </span>
                            {inputNodes}
                          </div>
                        )}
                        {outputNodes && (
                          <div>
                            <span className="font-semibold text-slate-700">
                              {isId ? "Hasil Turunan: " : "Outputs: "}
                            </span>
                            {outputNodes}
                          </div>
                        )}
                      </footer>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}
