"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import {
  XyflowDiagram,
  DEFAULT_FLOW_2_POSITIONS,
} from "../../test/product-flow-2/_components/XyflowDiagram"
import { ProductFlow2Modal } from "../../test/product-flow-2/_components/ProductFlow2Modal"
import { Flow2Zone, PRODUCT_FLOW_2_DATA, Flow2Node } from "../../test/product-flow-2/_data/productFlow2Data"
import {
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Move,
  Filter,
  Edit3,
  X,
  Eye,
  Languages,
  Layers,
  Sparkles,
} from "lucide-react"

export default function ProductFlowEditorPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = (locale === "id" ? "id" : "en") as "id" | "en"
  const [activeZone, setActiveZone] = useState<Flow2Zone | "all">("all")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [previewModalNodeId, setPreviewModalNodeId] = useState<string | null>(null)
  
  const [coordinates, setCoordinates] = useState<Record<string, { x: number; y: number }>>(
    DEFAULT_FLOW_2_POSITIONS
  )
  const [customNodes, setCustomNodes] = useState<Record<string, any>>({})
  const [activeEditTab, setActiveEditTab] = useState<"id" | "en">(currentLocale)

  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  )

  // Fetch current layout & customized texts from CMS API
  useEffect(() => {
    async function loadLayout() {
      try {
        const res = await fetch("/api/product-flow/layout", { cache: "no-store" })
        if (res.ok) {
          const json = await res.json()
          if (json?.data?.coordinates && Object.keys(json.data.coordinates).length > 0) {
            setCoordinates(json.data.coordinates)
          }
          if (json?.data?.nodes && Object.keys(json.data.nodes).length > 0) {
            setCustomNodes(json.data.nodes)
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial flow layout:", err)
      }
    }
    loadLayout()
  }, [])

  // Handle drag coordinates change
  const handleCoordinatesChange = useCallback(
    (newCoords: Record<string, { x: number; y: number }>) => {
      setCoordinates((prev) => ({
        ...prev,
        ...newCoords,
      }))
      setIsDirty(true)
      setSaveMessage(null)
    },
    []
  )

  // Get active editing node details (merging base data and custom edits)
  const activeNodeDetails = useMemo(() => {
    if (!selectedNodeId) return null
    const baseNode: Flow2Node | undefined = PRODUCT_FLOW_2_DATA.nodes[selectedNodeId]
    if (!baseNode) return null
    const custom = customNodes[selectedNodeId] || {}

    return {
      id: selectedNodeId,
      category: baseNode.category,
      zone: baseNode.zone,
      iconType: baseNode.iconType,
      name: custom.name !== undefined ? custom.name : baseNode.name,
      nameId: custom.nameId !== undefined ? custom.nameId : (baseNode.fullName || baseNode.name),
      definition: {
        en: custom.definition?.en !== undefined ? custom.definition.en : (baseNode.definition?.en || ""),
        id: custom.definition?.id !== undefined ? custom.definition.id : (baseNode.definition?.id || ""),
      },
      mainFunction: {
        en: custom.mainFunction?.en !== undefined ? custom.mainFunction.en : baseNode.mainFunction.en,
        id: custom.mainFunction?.id !== undefined ? custom.mainFunction.id : baseNode.mainFunction.id,
      },
    }
  }, [selectedNodeId, customNodes])

  // Update specific field for currently selected node
  const handleUpdateNodeField = (path: string, value: string) => {
    if (!selectedNodeId) return

    setCustomNodes((prev) => {
      const current = prev[selectedNodeId] || {}
      let updated = { ...current }

      if (path === "name") {
        updated.name = value
      } else if (path === "nameId") {
        updated.nameId = value
      } else if (path === "definition.en") {
        updated.definition = { ...(updated.definition || {}), en: value }
      } else if (path === "definition.id") {
        updated.definition = { ...(updated.definition || {}), id: value }
      } else if (path === "mainFunction.en") {
        updated.mainFunction = { ...(updated.mainFunction || {}), en: value }
      } else if (path === "mainFunction.id") {
        updated.mainFunction = { ...(updated.mainFunction || {}), id: value }
      }

      return {
        ...prev,
        [selectedNodeId]: updated,
      }
    })

    setIsDirty(true)
    setSaveMessage(null)
  }

  // Reset current node texts to default
  const handleResetNodeToDefault = () => {
    if (!selectedNodeId) return
    const baseNode = PRODUCT_FLOW_2_DATA.nodes[selectedNodeId]
    if (!baseNode) return

    if (
      window.confirm(
        currentLocale === "id"
          ? `Kembalikan teks "${baseNode.name}" ke teks bawaan default?`
          : `Revert texts for "${baseNode.name}" to standard default?`
      )
    ) {
      setCustomNodes((prev) => {
        const next = { ...prev }
        delete next[selectedNodeId]
        return next
      })
      setIsDirty(true)
      setSaveMessage(null)
    }
  }

  // Save both coordinates and customized texts to CMS
  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const res = await fetch("/api/product-flow/layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coordinates,
          nodes: customNodes,
        }),
      })

      const json = await res.json()

      if (res.ok && json.status) {
        setIsDirty(false)
        setSaveMessage({
          type: "success",
          text: currentLocale === "id"
            ? "Tata letak dan teks simpul berhasil disimpan ke CMS!"
            : "Layout coordinates & node texts successfully saved to CMS!",
        })
      } else {
        setSaveMessage({
          type: "error",
          text: json.message || "Failed to save data.",
        })
      }
    } catch (err: any) {
      setSaveMessage({
        type: "error",
        text: err?.message || "Network error when saving.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Reset coordinates to default
  const handleResetCoordinates = () => {
    if (
      window.confirm(
        currentLocale === "id"
          ? "Kembalikan posisi koordinat semua simpul ke tata letak default?"
          : "Revert all node positions to standard default layout?"
      )
    ) {
      setCoordinates(DEFAULT_FLOW_2_POSITIONS)
      setIsDirty(true)
      setSaveMessage(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      {/* Top Builder Navigation Toolbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0082C8] text-white flex items-center justify-center font-extrabold shadow-sm">
            <Move className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-[#062C48]">
                Product Flow Visual Builder
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#0082C8]">
                Admin Editor
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {currentLocale === "id"
                ? "Geser simpul alur produksi & klik simpul untuk mengedit teks Definisi/Fungsi."
                : "Drag nodes to adjust layout & click any node to edit its Definition/Function."}
            </p>
          </div>
        </div>

        {/* Status Badge & Actions */}
        <div className="flex items-center gap-3">
          {saveMessage ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                saveMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {saveMessage.type === "success" ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>{saveMessage.text}</span>
            </div>
          ) : isDirty ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              {currentLocale === "id" ? "Perubahan belum disimpan" : "Unsaved changes"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {currentLocale === "id" ? "Sinkron dengan CMS" : "Synced with CMS"}
            </span>
          )}

          {/* Action Buttons */}
          <button
            onClick={handleResetCoordinates}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            title="Reset to default coordinates"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{currentLocale === "id" ? "Reset Posisi" : "Reset Positions"}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0082C8] hover:bg-[#0070ad] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>
              {isSaving
                ? currentLocale === "id"
                  ? "Menyimpan..."
                  : "Saving..."
                : currentLocale === "id"
                ? "Simpan Semua ke CMS"
                : "Save All to CMS"}
            </span>
          </button>

          <a
            href={`/${currentLocale}/our-business/chemical-solutions`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#062C48] border border-slate-300 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0082C8]" />
            <span className="hidden sm:inline">
              {currentLocale === "id" ? "Lihat Live Halaman ↗" : "View Live Page ↗"}
            </span>
          </a>
        </div>
      </header>

      {/* Editor Main Canvas & Edit Drawer Area */}
      <main className="flex-1 p-4 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
        {/* Sector Filter Bar */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#0082C8]" />
              Filter Sektor:
            </span>
            {(
              [
                { id: "all", label: "Semua" },
                { id: "upstream", label: "Upstream Industry" },
                { id: "intermediate", label: "Intermediate Industry" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveZone(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeZone === tab.id
                    ? "bg-[#0082C8] text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            💡 Tips: Geser simpul untuk mengatur posisi. <strong>Klik pada simpul</strong> untuk membuka form edit teks.
          </div>
        </div>

        {/* Visual Canvas and Sliding Edit Drawer */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative flex">
          {/* Canvas */}
          <div className="flex-1 h-full relative">
            <XyflowDiagram
              locale={currentLocale}
              activeZone={activeZone}
              selectedNodeId={selectedNodeId}
              hoveredNodeId={hoveredNodeId}
              onHoverNode={setHoveredNodeId}
              onSelectNode={setSelectedNodeId}
              isLocked={false}
              customCoordinates={coordinates}
              customNodesData={customNodes}
              onCoordinatesChange={handleCoordinatesChange}
            />
          </div>

          {/* Side Drawer: Edit Selected Node Content */}
          {activeNodeDetails && (
            <aside className="w-[420px] max-w-full bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col h-full animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0082C8] text-white flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#062C48] leading-tight">
                      Edit Simpul: {activeNodeDetails.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-[#0082C8]">
                        {activeNodeDetails.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ID: {activeNodeDetails.id}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
                  title="Tutup panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1">
                <button
                  onClick={() => setActiveEditTab("id")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeEditTab === "id"
                      ? "bg-white text-[#0082C8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Bahasa Indonesia</span>
                </button>
                <button
                  onClick={() => setActiveEditTab("en")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeEditTab === "en"
                      ? "bg-white text-[#0082C8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {activeEditTab === "id" ? (
                  <>
                    {/* Indonesian Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Simpul (Bahasa Indonesia)
                      </label>
                      <input
                        type="text"
                        value={activeNodeDetails.nameId}
                        onChange={(e) => handleUpdateNodeField("nameId", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium"
                        placeholder="Contoh: Minyak Mentah"
                      />
                    </div>

                    {/* Indonesian Main Function */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Fungsi Utama (Main Function - ID)
                      </label>
                      <textarea
                        rows={4}
                        value={activeNodeDetails.mainFunction.id}
                        onChange={(e) => handleUpdateNodeField("mainFunction.id", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium leading-relaxed"
                        placeholder="Masukkan fungsi utama produk / fasilitas..."
                      />
                    </div>

                    {/* Indonesian Definition */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Definisi (Definition - ID)
                      </label>
                      <textarea
                        rows={5}
                        value={activeNodeDetails.definition.id}
                        onChange={(e) => handleUpdateNodeField("definition.id", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium leading-relaxed"
                        placeholder="Masukkan definisi lengkap produk..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* English Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Node Name (English)
                      </label>
                      <input
                        type="text"
                        value={activeNodeDetails.name}
                        onChange={(e) => handleUpdateNodeField("name", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium"
                        placeholder="Example: Crude Oil"
                      />
                    </div>

                    {/* English Main Function */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Main Function (EN)
                      </label>
                      <textarea
                        rows={4}
                        value={activeNodeDetails.mainFunction.en}
                        onChange={(e) => handleUpdateNodeField("mainFunction.en", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium leading-relaxed"
                        placeholder="Enter primary function..."
                      />
                    </div>

                    {/* English Definition */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Definition (EN)
                      </label>
                      <textarea
                        rows={5}
                        value={activeNodeDetails.definition.en}
                        onChange={(e) => handleUpdateNodeField("definition.en", e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-medium leading-relaxed"
                        placeholder="Enter comprehensive definition..."
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewModalNodeId(selectedNodeId)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-[#062C48] border border-slate-300 text-xs font-bold shadow-2xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0082C8]" />
                    <span>Pratinjau Modal</span>
                  </button>

                  <button
                    onClick={handleResetNodeToDefault}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-slate-300 hover:border-red-300 text-xs font-bold transition-colors"
                    title="Kembalikan teks simpul ini ke default"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                >
                  Selesai / Tutup Panel
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Visitor Modal Preview (Opened when clicking 'Pratinjau Modal') */}
      <ProductFlow2Modal
        nodeId={previewModalNodeId}
        locale={activeEditTab}
        onClose={() => setPreviewModalNodeId(null)}
        onSelectNode={(id) => {
          setPreviewModalNodeId(id)
          setSelectedNodeId(id)
        }}
        customNodesData={customNodes}
      />
    </div>
  )
}
