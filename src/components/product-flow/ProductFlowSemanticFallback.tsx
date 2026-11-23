import React from "react"
import { PRODUCT_FLOW_2_DATA, Flow2Node } from "./data/productFlowData"

interface ProductFlowSemanticFallbackProps {
  locale: "id" | "en"
  className?: string
  visuallyHidden?: boolean
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
  visuallyHidden = true,
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
          ? "Rincian Alur Produksi & Produk Petrokimia (Teks Semantik)"
          : "Production Flow & Product Catalog (Semantic Text)"
      }
      className={visuallyHidden ? `sr-only ${className}` : `w-full mt-6 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />

      {/* Semantic Content Tree: Fully readable by Search Engines & Screen Readers */}
      <div className={visuallyHidden ? "sr-only" : "space-y-6"}>
        <header>
          <h2 className="text-xl font-bold text-[#062C48]">
            {isId
              ? "Katalog & Alur Proses Produk Kimia Chandra Asri"
              : "Chandra Asri Petrochemical Process Flow & Products Catalog"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {isId
              ? PRODUCT_FLOW_2_DATA.meta.description.id
              : PRODUCT_FLOW_2_DATA.meta.description.en}
          </p>
        </header>

        {PROCESS_SECTIONS.map((sec) => (
          <div key={sec.id} className="border-t border-slate-200 pt-4">
            <h3 className="text-lg font-bold text-[#062C48]">
              {sec.title[locale]}
            </h3>
            <p className="text-xs text-slate-500 mb-3">{sec.description[locale]}</p>

            <ul className="space-y-3">
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
                  <li key={node.id} className="border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-sm text-[#0082C8]">
                      {node.fullName || node.name}
                    </h4>
                    <p className="text-xs text-slate-600">
                      <strong>{isId ? "Kategori: " : "Category: "}</strong>
                      {getCategoryLabel(node.category)}
                    </p>
                    {node.definition?.[locale] && (
                      <p className="text-xs text-slate-700 mt-1">
                        <strong>{isId ? "Definisi: " : "Definition: "}</strong>
                        {node.definition[locale]}
                      </p>
                    )}
                    {node.mainFunction?.[locale] && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        <strong>{isId ? "Fungsi Utama: " : "Main Function: "}</strong>
                        {node.mainFunction[locale]}
                      </p>
                    )}
                    {inputNodes && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        <strong>{isId ? "Bahan Input: " : "Inputs: "}</strong>
                        {inputNodes}
                      </p>
                    )}
                    {outputNodes && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        <strong>{isId ? "Hasil Turunan: " : "Outputs: "}</strong>
                        {outputNodes}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
