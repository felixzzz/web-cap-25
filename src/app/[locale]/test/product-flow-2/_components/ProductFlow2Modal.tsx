"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { PRODUCT_FLOW_2_DATA, Flow2Node } from "../_data/productFlow2Data"
import { Flow2Icon } from "./Flow2Icons"
import { X, ArrowRight, ArrowLeft, BookOpen, Target, Sparkles, Building2, Beaker } from "lucide-react"

interface ProductFlow2ModalProps {
  nodeId: string | null
  locale: "id" | "en"
  onClose: () => void
  onSelectNode: (nodeId: string) => void
}

export const ProductFlow2Modal: React.FC<ProductFlow2ModalProps> = ({
  nodeId,
  locale,
  onClose,
  onSelectNode,
}) => {
  const [mounted, setMounted] = useState(false)
  const node: Flow2Node | undefined = nodeId ? PRODUCT_FLOW_2_DATA.nodes[nodeId] : undefined

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (node) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [node, onClose])

  if (!node || !mounted) return null

  const isFacility = node.category === "facility"
  const isFeedstock = node.category === "feedstock"
  const isUpstream = node.zone === "upstream"

  const definitionText = node.definition ? node.definition[locale] || node.definition.en : null
  const mainFunctionText = node.mainFunction ? node.mainFunction[locale] || node.mainFunction.en : null

  const inputNodes = (node.inputs || [])
    .map((id) => PRODUCT_FLOW_2_DATA.nodes[id])
    .filter(Boolean) as Flow2Node[]

  const outputNodes = (node.outputs || [])
    .map((id) => PRODUCT_FLOW_2_DATA.nodes[id])
    .filter(Boolean) as Flow2Node[]

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 w-full h-full cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Top Accent Ribbon */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#0082C8] via-[#00A3E0] to-[#0082C8] shrink-0" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                isFacility
                  ? "bg-white border-2 border-[#0082C8] text-[#0082C8] shadow-sm"
                  : "bg-[#0082C8] border border-[#0070ad] text-white shadow-md shadow-[#0082C8]/25"
              }`}
            >
              <Flow2Icon
                type={node.iconType}
                className="w-7 h-7"
                color={isFacility ? "#0082C8" : "#ffffff"}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0082C8] border border-sky-200">
                  {isUpstream
                    ? locale === "id"
                      ? "Hulu (Upstream)"
                      : "Upstream Industry"
                    : locale === "id"
                    ? "Antara (Intermediate)"
                    : "Intermediate Industry"}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                    isFacility
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : isFeedstock
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  {isFacility ? (
                    <>
                      <Building2 className="w-3 h-3" />
                      {locale === "id" ? "Fasilitas Pabrik" : "Plant Facility"}
                    </>
                  ) : (
                    <>
                      <Beaker className="w-3 h-3" />
                      {isFeedstock
                        ? locale === "id"
                          ? "Bahan Baku"
                          : "Feedstock"
                        : locale === "id"
                        ? "Produk Kimia"
                        : "Chemical Product"}
                    </>
                  )}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#062C48] leading-tight">
                {node.name}
              </h2>
              {node.fullName && (
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {node.fullName}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Definition Section (if present) */}
          {definitionText && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50/70 to-blue-50/40 border border-sky-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0082C8]">
                <BookOpen className="w-4 h-4 text-[#0082C8]" />
                <span>{locale === "id" ? "Definisi" : "Definition"}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed pl-6">
                {definitionText}
              </p>
            </div>
          )}

          {/* Main Function Section */}
          {mainFunctionText && (
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#062C48]">
                <Target className="w-4 h-4 text-[#0082C8]" />
                <span>{locale === "id" ? "Fungsi Utama" : "Main Function"}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed pl-6">
                {mainFunctionText}
              </p>
            </div>
          )}

          {/* Interactive Pipeline Navigation (Inputs & Outputs) */}
          {(inputNodes.length > 0 || outputNodes.length > 0) && (
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {locale === "id" ? "Koneksi Alur Proses" : "Connected Process Flow"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inputs */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#0082C8]" />
                    {locale === "id" ? "Bahan / Input Masuk" : "Input Sources"}
                  </span>
                  {inputNodes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {inputNodes.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onSelectNode(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-50 text-[11px] font-bold text-[#0082C8] border border-slate-200 hover:border-sky-300 shadow-2xs transition-all flex items-center gap-1 group"
                        >
                          <Flow2Icon
                            type={item.iconType}
                            className="w-3 h-3 text-[#0082C8]"
                            color="#0082C8"
                          />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {locale === "id" ? "Sumber Utama" : "Primary Raw Feedstock"}
                    </span>
                  )}
                </div>

                {/* Outputs */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0082C8]" />
                    {locale === "id" ? "Hasil / Produk Turunan" : "Outputs & Derivatives"}
                  </span>
                  {outputNodes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {outputNodes.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onSelectNode(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-50 text-[11px] font-bold text-[#0082C8] border border-slate-200 hover:border-sky-300 shadow-2xs transition-all flex items-center gap-1 group"
                        >
                          <Flow2Icon
                            type={item.iconType}
                            className="w-3 h-3 text-[#0082C8]"
                            color="#0082C8"
                          />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {locale === "id" ? "Produk Akhir / Pasar" : "End Product / Regional Market"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0082C8]" />
            {locale === "id"
              ? "Klik simpul lain untuk mempelajari spesifikasi produk"
              : "Click any connected node to explore its specifications"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#062C48] font-semibold border border-slate-200 transition-colors"
          >
            {locale === "id" ? "Tutup" : "Close"}
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
