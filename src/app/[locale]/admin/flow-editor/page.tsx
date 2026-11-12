"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import {
  XyflowDiagram,
  DEFAULT_FLOW_2_POSITIONS,
} from "../../test/product-flow-2/_components/XyflowDiagram"
import { ProductFlow2Modal } from "../../test/product-flow-2/_components/ProductFlow2Modal"
import {
  Flow2Zone,
  PRODUCT_FLOW_2_DATA,
  Flow2Node,
  DEFAULT_FLOW_LEGENDS,
  FlowLegendItem,
  FlowNodeColorPreset,
} from "../../test/product-flow-2/_data/productFlow2Data"
import {
  AVAILABLE_FLOW_ICONS,
  Flow2Icon,
} from "../../test/product-flow-2/_components/Flow2Icons"
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
  Palette,
  Image as ImageIcon,
  Plus,
  Trash2,
  List,
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
  const [customLegend, setCustomLegend] = useState<FlowLegendItem[]>(DEFAULT_FLOW_LEGENDS)
  const [isLegendModalOpen, setIsLegendModalOpen] = useState<boolean>(false)

  const [drawerSection, setDrawerSection] = useState<"text" | "style" | "icon">("text")
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
          if (json?.data?.legend && Array.isArray(json.data.legend) && json.data.legend.length > 0) {
            setCustomLegend(json.data.legend)
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

    const isExcludedDefault = [
      "crude-oil",
      "natural-gas",
      "refinery-plant",
      "gas-separation-unit",
      "lpg",
      "naphtha",
      "condensate",
    ].includes(selectedNodeId)

    const defaultPreset: FlowNodeColorPreset = isExcludedDefault
      ? "exclude"
      : baseNode.category === "facility"
      ? "facility"
      : "product"

    return {
      id: selectedNodeId,
      category: baseNode.category,
      zone: baseNode.zone,
      iconType: custom.iconType || baseNode.iconType || "flask",
      customIconUrl: custom.customIconUrl || "",
      colorPreset: (custom.colorPreset || defaultPreset) as FlowNodeColorPreset,
      customBgColor: custom.customBgColor || "",
      customTextColor: custom.customTextColor || "",
      customBorderColor: custom.customBorderColor || "",
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
  const handleUpdateNodeField = (path: string, value: any) => {
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
      } else if (path === "colorPreset") {
        updated.colorPreset = value
      } else if (path === "customBgColor") {
        updated.customBgColor = value
      } else if (path === "customTextColor") {
        updated.customTextColor = value
      } else if (path === "customBorderColor") {
        updated.customBorderColor = value
      } else if (path === "iconType") {
        updated.iconType = value
      } else if (path === "customIconUrl") {
        updated.customIconUrl = value
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
          ? `Kembalikan pengaturan & teks "${baseNode.name}" ke pengaturan bawaan default?`
          : `Revert all settings and texts for "${baseNode.name}" to standard default?`
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

  // Save coordinates, customized nodes & legends to CMS
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
          legend: customLegend,
        }),
      })

      const json = await res.json()

      if (res.ok && json.status) {
        setIsDirty(false)
        setSaveMessage({
          type: "success",
          text: currentLocale === "id"
            ? "Tata letak, warna simpul, ikon, dan legend berhasil disimpan ke CMS!"
            : "Layout, node colors, icons, and legends successfully saved to CMS!",
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
                ? "Atur tata letak, warna node, ikon/logo, teks, dan legend alur produksi."
                : "Configure layout positions, node colors, icons/logos, texts, and legends."}
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
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{saveMessage.text}</span>
            </div>
          ) : isDirty ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {currentLocale === "id" ? "Perubahan belum disimpan" : "Unsaved changes"}
            </span>
          ) : null}

          {/* Manage Legend Button */}
          <button
            onClick={() => setIsLegendModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <List className="w-4 h-4 text-[#0082C8]" />
            <span>{currentLocale === "id" ? "Kelola Legend" : "Manage Legend"}</span>
          </button>

          {/* Revert Coordinates Button */}
          <button
            onClick={handleResetCoordinates}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition-colors"
            title="Reset semua koordinat ke bawaan slide"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">
              {currentLocale === "id" ? "Reset Posisi" : "Reset Positions"}
            </span>
          </button>

          {/* Live Visitor Preview Link */}
          <a
            href={`/${currentLocale}/our-business/chemical-solutions`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0082C8] border border-slate-300 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {currentLocale === "id" ? "Lihat Live" : "View Live"}
            </span>
          </a>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm transition-all ${
              isSaving || !isDirty
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-[#0082C8] hover:bg-[#0070ad] hover:shadow-md cursor-pointer active:scale-95"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>
              {isSaving
                ? currentLocale === "id"
                  ? "Menyimpan..."
                  : "Saving..."
                : currentLocale === "id"
                ? "Simpan Perubahan"
                : "Save Changes"}
            </span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-[1920px] mx-auto w-full gap-4">
        {/* Filter Bar & Quick Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Zona Filter:</span>
            </span>
            {(["all", "upstream", "intermediate"] as const).map((z) => (
              <button
                key={z}
                onClick={() => setActiveZone(z)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeZone === z
                    ? "bg-[#0082C8] text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {z === "all"
                  ? "Semua Zona"
                  : z === "upstream"
                  ? "Upstream Industry"
                  : "Intermediate Industry"}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            💡 Tips: Geser simpul untuk mengatur posisi. <strong>Klik pada simpul</strong> untuk mengedit warna, logo, dan teks.
          </div>
        </div>

        {/* Visual Canvas and Sliding Edit Drawer */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative flex min-h-[750px]">
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
              customLegendData={customLegend}
              showLegend={true}
              onCoordinatesChange={handleCoordinatesChange}
            />
          </div>

          {/* Side Drawer: Edit Selected Node Content, Colors & Icons */}
          {activeNodeDetails && (
            <aside className="w-[440px] max-w-full bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col h-full animate-in slide-in-from-right duration-200">
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

              {/* Drawer Section Navigation Tabs */}
              <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1 text-xs font-bold">
                <button
                  onClick={() => setDrawerSection("text")}
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    drawerSection === "text"
                      ? "bg-white text-[#0082C8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>Teks</span>
                </button>
                <button
                  onClick={() => setDrawerSection("style")}
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    drawerSection === "style"
                      ? "bg-white text-[#0082C8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Warna Node</span>
                </button>
                <button
                  onClick={() => setDrawerSection("icon")}
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    drawerSection === "icon"
                      ? "bg-white text-[#0082C8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Ikon / Logo</span>
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-5">
                {/* 1. TEXT SECTION */}
                {drawerSection === "text" && (
                  <div className="space-y-4">
                    {/* Language Switcher Tabs */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 gap-1">
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
                )}

                {/* 2. STYLE / COLOR SECTION */}
                {drawerSection === "style" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Preset Warna & Kategori Node
                      </label>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Pilih preset kategori yang otomatis terhubung dengan Legend di kiri bawah, atau gunakan warna kustom.
                      </p>

                      <div className="space-y-2">
                        {/* Preset 1: Chandra Asri Product */}
                        <button
                          type="button"
                          onClick={() => handleUpdateNodeField("colorPreset", "product")}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            activeNodeDetails.colorPreset === "product"
                              ? "border-[#0082C8] bg-sky-50/60 ring-2 ring-sky-200"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#0082C8] border border-[#0070ad] shadow-2xs shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-[#062C48]">
                                Chandra Asri Product
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Solid Biru (#0082C8), teks putih
                              </div>
                            </div>
                          </div>
                          {activeNodeDetails.colorPreset === "product" && (
                            <CheckCircle2 className="w-4 h-4 text-[#0082C8]" />
                          )}
                        </button>

                        {/* Preset 2: Chandra Asri Facility */}
                        <button
                          type="button"
                          onClick={() => handleUpdateNodeField("colorPreset", "facility")}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            activeNodeDetails.colorPreset === "facility"
                              ? "border-[#0082C8] bg-sky-50/60 ring-2 ring-sky-200"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white border-2 border-[#0082C8] shadow-2xs shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-[#062C48]">
                                Chandra Asri Facility
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Putih outline biru (#0082C8), teks biru
                              </div>
                            </div>
                          </div>
                          {activeNodeDetails.colorPreset === "facility" && (
                            <CheckCircle2 className="w-4 h-4 text-[#0082C8]" />
                          )}
                        </button>

                        {/* Preset 3: Exclude Chandra Asri Owned Ecosystem */}
                        <button
                          type="button"
                          onClick={() => handleUpdateNodeField("colorPreset", "exclude")}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            activeNodeDetails.colorPreset === "exclude"
                              ? "border-[#0082C8] bg-sky-50/60 ring-2 ring-sky-200"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#1B2B5A] border border-[#131f42] shadow-2xs shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-[#062C48]">
                                Exclude Chandra Asri Owned Ecosystem
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Solid Navy Gelap (#1B2B5A), teks putih
                              </div>
                            </div>
                          </div>
                          {activeNodeDetails.colorPreset === "exclude" && (
                            <CheckCircle2 className="w-4 h-4 text-[#0082C8]" />
                          )}
                        </button>

                        {/* Preset 4: Custom Color */}
                        <button
                          type="button"
                          onClick={() => handleUpdateNodeField("colorPreset", "custom")}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            activeNodeDetails.colorPreset === "custom"
                              ? "border-[#0082C8] bg-sky-50/60 ring-2 ring-sky-200"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 shadow-2xs shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-[#062C48]">
                                Kustom Bebas (Custom Color)
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Atur kode warna background, teks, & border sendiri
                              </div>
                            </div>
                          </div>
                          {activeNodeDetails.colorPreset === "custom" && (
                            <CheckCircle2 className="w-4 h-4 text-[#0082C8]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Custom Color Pickers (Shown if preset is custom or overriding) */}
                    {activeNodeDetails.colorPreset === "custom" && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
                        <div className="text-xs font-bold text-[#062C48] flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-[#0082C8]" />
                          <span>Pilihan Warna Kustom</span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Warna Latar (Background Color)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeNodeDetails.customBgColor || "#0082C8"}
                              onChange={(e) => handleUpdateNodeField("customBgColor", e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                            />
                            <input
                              type="text"
                              value={activeNodeDetails.customBgColor || ""}
                              onChange={(e) => handleUpdateNodeField("customBgColor", e.target.value)}
                              placeholder="#0082C8"
                              className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Warna Teks & Ikon (Text & Icon Color)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeNodeDetails.customTextColor || "#ffffff"}
                              onChange={(e) => handleUpdateNodeField("customTextColor", e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                            />
                            <input
                              type="text"
                              value={activeNodeDetails.customTextColor || ""}
                              onChange={(e) => handleUpdateNodeField("customTextColor", e.target.value)}
                              placeholder="#ffffff"
                              className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Warna Garis Tepi (Border Color)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeNodeDetails.customBorderColor || "#0070ad"}
                              onChange={(e) => handleUpdateNodeField("customBorderColor", e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                            />
                            <input
                              type="text"
                              value={activeNodeDetails.customBorderColor || ""}
                              onChange={(e) => handleUpdateNodeField("customBorderColor", e.target.value)}
                              placeholder="#0070ad"
                              className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ICON / LOGO SECTION */}
                {drawerSection === "icon" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Pilih Ikon Bawaan (Preset Icons)
                      </label>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Klik salah satu ikon vektor untuk diterapkan ke simpul ini:
                      </p>

                      <div className="grid grid-cols-3 gap-2.5">
                        {AVAILABLE_FLOW_ICONS.map((item) => {
                          const isSelected = activeNodeDetails.iconType === item.id
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                handleUpdateNodeField("iconType", item.id)
                                handleUpdateNodeField("customIconUrl", "")
                              }}
                              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                                isSelected && !activeNodeDetails.customIconUrl
                                  ? "border-[#0082C8] bg-sky-50 text-[#0082C8] ring-2 ring-sky-200"
                                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
                              }`}
                            >
                              <item.component className="w-5 h-5" color={isSelected ? "#0082C8" : "currentColor"} />
                              <span className="text-[10px] font-bold line-clamp-1">
                                {item.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Custom Logo Image URL */}
                    <div className="pt-2 border-t border-slate-200">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Atau Gunakan Logo / Gambar Kustom (Image URL)
                      </label>
                      <p className="text-[11px] text-slate-500 mb-2">
                        Masukkan URL gambar (PNG/SVG/WebP) untuk menampilkan logo khusus menggantikan ikon di atas:
                      </p>
                      <input
                        type="url"
                        value={activeNodeDetails.customIconUrl}
                        onChange={(e) => handleUpdateNodeField("customIconUrl", e.target.value)}
                        placeholder="https://domain.com/path-to-logo.png"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0082C8] font-mono"
                      />

                      {activeNodeDetails.customIconUrl && (
                        <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={activeNodeDetails.customIconUrl}
                            alt="Preview Logo"
                            className="w-10 h-10 object-contain p-1 bg-white border border-slate-200 rounded-lg shadow-2xs"
                          />
                          <div className="flex-1 text-[11px] text-slate-600">
                            <span className="font-bold text-emerald-700 block">✓ Logo siap digunakan</span>
                            Ikon kustom ini akan tampil di bagian atas kartu node.
                          </div>
                          <button
                            type="button"
                            onClick={() => handleUpdateNodeField("customIconUrl", "")}
                            className="text-[11px] text-red-600 hover:underline font-bold"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
                    title="Kembalikan simpul ini ke default"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Selesai / Tutup Panel
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Legend Customization Modal */}
      {isLegendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0082C8] text-white flex items-center justify-center">
                  <List className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#062C48]">
                    Kustomisasi Legend Diagram
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atur teks (ID/EN) dan warna kotak penanda di pojok kiri bawah diagram.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLegendModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: List of Legend Items */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {customLegend.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{
                          backgroundColor: item.type === "outline" ? "#ffffff" : item.color,
                          borderColor: item.borderColor || item.color,
                          borderWidth: item.type === "outline" ? "2px" : "1.5px",
                          borderStyle: "solid",
                        }}
                        className="w-7 h-4 rounded-md inline-block shadow-2xs"
                      />
                      <span className="text-xs font-bold text-[#062C48]">
                        Item #{idx + 1}
                      </span>
                    </div>

                    {customLegend.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomLegend((prev) => prev.filter((_, i) => i !== idx))
                          setIsDirty(true)
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Label Indonesia (ID)
                      </label>
                      <input
                        type="text"
                        value={item.labelId}
                        onChange={(e) => {
                          const val = e.target.value
                          setCustomLegend((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, labelId: val } : it))
                          )
                          setIsDirty(true)
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0082C8] font-medium"
                        placeholder="Contoh: Produk Chandra Asri"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Label English (EN)
                      </label>
                      <input
                        type="text"
                        value={item.labelEn}
                        onChange={(e) => {
                          const val = e.target.value
                          setCustomLegend((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, labelEn: val } : it))
                          )
                          setIsDirty(true)
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0082C8] font-medium"
                        placeholder="Example: Chandra Asri Product"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Tipe Kotak
                      </label>
                      <select
                        value={item.type}
                        onChange={(e) => {
                          const val = e.target.value as "solid" | "outline"
                          setCustomLegend((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, type: val } : it))
                          )
                          setIsDirty(true)
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="solid">Solid Fill</option>
                        <option value="outline">Outline (Latar Putih)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Warna Utama (Fill / Border)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={item.color}
                          onChange={(e) => {
                            const val = e.target.value
                            setCustomLegend((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, color: val } : it))
                            )
                            setIsDirty(true)
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                        />
                        <input
                          type="text"
                          value={item.color}
                          onChange={(e) => {
                            const val = e.target.value
                            setCustomLegend((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, color: val } : it))
                            )
                            setIsDirty(true)
                          }}
                          className="flex-1 px-2 py-1 text-xs font-mono border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Warna Border Khusus (opsional)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={item.borderColor || item.color}
                          onChange={(e) => {
                            const val = e.target.value
                            setCustomLegend((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, borderColor: val } : it))
                            )
                            setIsDirty(true)
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                        />
                        <input
                          type="text"
                          value={item.borderColor || ""}
                          onChange={(e) => {
                            const val = e.target.value
                            setCustomLegend((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, borderColor: val } : it))
                            )
                            setIsDirty(true)
                          }}
                          placeholder={item.color}
                          className="flex-1 px-2 py-1 text-xs font-mono border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Legend Item Button */}
              <button
                type="button"
                onClick={() => {
                  const newItem: FlowLegendItem = {
                    id: `legend-${Date.now()}`,
                    labelEn: "New Category",
                    labelId: "Kategori Baru",
                    color: "#0082C8",
                    type: "solid",
                    borderColor: "#0070ad",
                  }
                  setCustomLegend((prev) => [...prev, newItem])
                  setIsDirty(true)
                }}
                className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-[#0082C8] hover:bg-sky-50/50 rounded-2xl text-xs font-bold text-slate-600 hover:text-[#0082C8] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Item Legend Baru</span>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Kembalikan daftar legend ke standar bawaan?")) {
                    setCustomLegend(DEFAULT_FLOW_LEGENDS)
                    setIsDirty(true)
                  }
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Reset Legend ke Default
              </button>

              <button
                type="button"
                onClick={() => setIsLegendModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#0082C8] hover:bg-[#0070ad] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Terapkan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

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
