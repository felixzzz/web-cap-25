"use client"

import React, { useEffect } from "react"
import { FlowNode, PRODUCT_FLOW_DATA } from "../_data/productFlowData"
import { FlowNodeIcon } from "./FlowIcons"
import { X, ArrowRight, ArrowLeft, MapPin, Tag, Layers } from "lucide-react"

interface NodeDetailModalProps {
  nodeId: string | null
  locale: "id" | "en"
  onClose: () => void
  onSelectNode: (nodeId: string) => void
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  nodeId,
  locale,
  onClose,
  onSelectNode,
}) => {
  const node: FlowNode | undefined = nodeId ? PRODUCT_FLOW_DATA.nodes[nodeId] : undefined

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

  if (!node) return null

  const categoryMeta = PRODUCT_FLOW_DATA.categories.find((c) => c.id === node.category)
  const zoneMeta = PRODUCT_FLOW_DATA.zones.find((z) => z.id === node.zone)

  const isFacility = node.category === "facility"
  const isCustomer = node.category === "customer"

  const iconColor = isFacility ? "#ffffff" : isCustomer ? "#ffffff" : "#0082C8"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon / Color bar */}
        <div
          className={`h-3 w-full ${
            isFacility
              ? "bg-[#0082C8]"
              : isCustomer
              ? "bg-[#0F172A]"
              : "bg-gradient-to-r from-[#00A3E0] to-[#0082C8]"
          }`}
        />

        {/* Header content */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                isFacility
                  ? "bg-[#0082C8] border-[#0082C8] text-white shadow-md shadow-[#0082C8]/20"
                  : isCustomer
                  ? "bg-[#0F172A] border-[#0F172A] text-white shadow-md shadow-slate-900/20"
                  : "bg-sky-50/70 border-[#00A3E0] text-[#0082C8]"
              }`}
            >
              <FlowNodeIcon icon={node.icon} className="w-8 h-8" color={iconColor} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                    isFacility
                      ? "bg-[#0082C8]/10 text-[#0082C8] border-[#0082C8]/20"
                      : isCustomer
                      ? "bg-slate-100 text-slate-800 border-slate-200"
                      : "bg-sky-50 text-[#0082C8] border-[#00A3E0]/30"
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {categoryMeta?.label[locale]}
                </span>

                {zoneMeta && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    <MapPin className="w-3 h-3 text-[#0082C8]" />
                    {zoneMeta.name[locale]}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">{node.name}</h3>
              {node.fullName && (
                <p className="text-xs text-slate-500 font-medium">{node.fullName}</p>
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

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {locale === "id" ? "Deskripsi" : "Description"}
            </h4>
            <p className="text-slate-800 leading-relaxed text-sm bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {node.description[locale]}
            </p>
          </div>

          {/* Footnote if any */}
          {node.footnote && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-center gap-2">
              <span className="font-semibold text-amber-700">ℹ️ Note:</span>
              <span>{node.footnote[locale]}</span>
            </div>
          )}

          {/* Applications / Key uses */}
          {node.applications && node.applications.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {locale === "id" ? "Aplikasi & Penggunaan Utama" : "Key Applications & Uses"}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {node.applications.map((app, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0] shrink-0" />
                    <span>{app[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Flow connections: Inputs & Outputs */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0082C8]" />
              {locale === "id" ? "Koneksi Alur Proses" : "Process Flow Connectivity"}
            </h4>

            {/* Inputs / Upstream */}
            {node.inputs && node.inputs.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0082C8]" />
                  {locale === "id" ? "Bahan Masuk / Dari Fasilitas:" : "Inputs / Feed From:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {node.inputs.map((inpId) => {
                    const inpNode = PRODUCT_FLOW_DATA.nodes[inpId]
                    if (!inpNode) return null
                    return (
                      <button
                        key={inpId}
                        onClick={() => onSelectNode(inpId)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-[#0082C8] hover:text-white text-slate-700 border border-slate-200 hover:border-[#0082C8] transition-all flex items-center gap-1.5 group shadow-sm"
                      >
                        <span>{inpNode.name}</span>
                        <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Outputs / Downstream */}
            {node.outputs && node.outputs.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0082C8]" />
                  {locale === "id" ? "Hasil Output / Menuju Ke:" : "Outputs / Flowing To:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {node.outputs.map((outId) => {
                    const outNode = PRODUCT_FLOW_DATA.nodes[outId]
                    if (!outNode) return null
                    return (
                      <button
                        key={outId}
                        onClick={() => onSelectNode(outId)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-50/70 hover:bg-[#0082C8] hover:text-white text-[#0082C8] border border-[#00A3E0]/40 hover:border-[#0082C8] transition-all flex items-center gap-1.5 group shadow-sm"
                      >
                        <span>{outNode.name}</span>
                        <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{locale === "id" ? "Klik simpul untuk menelusuri alur" : "Click connected chips to trace flow"}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            {locale === "id" ? "Tutup" : "Close"}
          </button>
        </div>
      </div>
    </div>
  )
}
