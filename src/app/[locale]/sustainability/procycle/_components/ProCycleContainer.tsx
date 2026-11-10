"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ChevronRight } from "lucide-react"
import { BannerBlock } from "@/components/block/BannerBlock"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn, getLocalizedContent } from "@/lib/utils"

export interface ProCycleCategoryItem {
  status?: string
  sidebarmenu_title?: string
  title?: string
  description?: string
  card_title?: string
  products?: Array<{
    name?: string
    url?: string
  }>
  [key: string]: any
}

interface ProCycleContainerProps {
  data: {
    banner?: any
    intro?: any
    our_approach?: any
    product_datasheet?: any
  }
}

export function ProCycleContainer({ data }: ProCycleContainerProps) {
  const locale = useLocale()

  const banner = data?.banner
  const intro = data?.intro
  const approach = data?.our_approach
  const productDatasheet = data?.product_datasheet

  // Extract categories list based on active locale
  const categories: ProCycleCategoryItem[] = useMemo(() => {
    if (!productDatasheet) return []
    const list = getLocalizedContent(
      locale,
      productDatasheet.datasheet_list_en,
      productDatasheet.datasheet_list_id
    )
    if (Array.isArray(list)) return list
    if (typeof list === "string") {
      try {
        return JSON.parse(list)
      } catch {
        return []
      }
    }
    return []
  }, [locale, productDatasheet])

  const [activeTab, setActiveTab] = useState<string>("")

  // Set default active tab
  const activeItem = useMemo(() => {
    if (!categories || categories.length === 0) return null
    if (activeTab) {
      const found = categories.find(
        (c) =>
          c.sidebarmenu_title === activeTab ||
          c.title === activeTab
      )
      if (found) return found
    }
    return categories[0]
  }, [categories, activeTab])

  // Localized section titles
  const approachTitle =
    getLocalizedContent(locale, approach?.title_en, approach?.title_id) ||
    approach?.title ||
    (locale === "id" ? "Pendekatan Kami" : "Our Approach")

  const approachDesc =
    getLocalizedContent(
      locale,
      approach?.description_en,
      approach?.description_id
    ) || approach?.description

  const introDesc =
    getLocalizedContent(locale, intro?.description_en, intro?.description_id) ||
    intro?.description

  const sectionTitle =
    getLocalizedContent(
      locale,
      productDatasheet?.title_en,
      productDatasheet?.title_id
    ) || (locale === "id" ? "Produk Berkelanjutan Kami" : "Our Sustainable Product")

  const sectionSubtitle =
    getLocalizedContent(
      locale,
      productDatasheet?.subtitle_en,
      productDatasheet?.subtitle_id
    ) ||
    (locale === "id"
      ? "Chandra Asri telah mulai mengembangkan pengelolaan produk berkelanjutan dengan mengelompokkan tindakan ke dalam 5 kategori:"
      : "Chandra Asri has started developing a sustainable product management by grouping actions into 5 categories:")

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Banner */}
      {banner && (
        <BannerBlock
          {...banner}
          hideLoadingVertical={true}
        />
      )}

      {/* 2. Intro Statement */}
      {introDesc && (
        <section className="container mx-auto px-4 py-8 lg:py-14">
          <div
            className="prose max-w-4xl text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: introDesc }}
          />
        </section>
      )}

      {/* 3. Our Approach Section */}
      {approachDesc && (
        <section className="container mx-auto px-4 py-10 lg:py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                {approachTitle}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div
                className="prose max-w-none text-base sm:text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: approachDesc }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. Our Sustainable Product (5 Categories) Section */}
      {categories && categories.length > 0 && (
        <section className="container mx-auto px-4 py-10 lg:py-16 border-t border-gray-100">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-3">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="text-base sm:text-lg text-gray-600">
                {sectionSubtitle}
              </p>
            )}
          </div>

          {/* Grid Layout: Left Tabs | Middle Content | Right Product List */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left Column: Vertical Tabs on desktop, scrollable on mobile */}
            <div className="lg:col-span-3">
              {/* Desktop Tabs */}
              <div className="hidden lg:flex lg:flex-col border-l border-[#E8E8E8]">
                {categories.map((cat, idx) => {
                  const label = cat.sidebarmenu_title || cat.title || `Category ${idx + 1}`
                  const isActive =
                    (activeItem &&
                      (activeItem.sidebarmenu_title === label ||
                        activeItem.title === label)) ||
                    (!activeTab && idx === 0)

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTab(label)}
                      className={cn(
                        "w-full text-left px-6 py-4 text-base transition-all duration-200 border-l-2 -ml-[2px]",
                        isActive
                          ? "border-primary font-bold text-primary bg-blue-50/30"
                          : "border-transparent text-gray-600 hover:text-primary hover:border-primary/50"
                      )}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Mobile Tabs */}
              <div className="flex lg:hidden overflow-x-auto pb-2 space-x-2 border-b border-gray-200 no-scrollbar">
                {categories.map((cat, idx) => {
                  const label = cat.sidebarmenu_title || cat.title || `Category ${idx + 1}`
                  const isActive =
                    (activeItem &&
                      (activeItem.sidebarmenu_title === label ||
                        activeItem.title === label)) ||
                    (!activeTab && idx === 0)

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTab(label)}
                      className={cn(
                        "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-colors",
                        isActive
                          ? "bg-primary text-white font-semibold shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Middle Column: Active Category Content */}
            <div className="lg:col-span-5">
              {activeItem && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {activeItem.title || activeItem.sidebarmenu_title}
                  </h3>
                  {activeItem.description && (
                    <div
                      className="prose max-w-none text-base text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: activeItem.description }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Product List Card */}
            <div className="lg:col-span-4">
              {activeItem && (
                <Card className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <CardHeader className="bg-[#1A3673] py-3.5 px-5">
                    <h4 className="text-base font-bold text-white tracking-wide">
                      {activeItem.card_title ||
                        (locale === "id" ? "Daftar Produk" : "Product List")}
                    </h4>
                  </CardHeader>
                  <CardContent className="p-0 divide-y divide-gray-100">
                    {activeItem.products && activeItem.products.length > 0 ? (
                      activeItem.products.map((prod: any, pIdx: number) => {
                        const prodName =
                          typeof prod === "string"
                            ? prod
                            : prod.name || prod.title || "Product Item"
                        const prodUrl =
                          typeof prod === "object" && prod.url ? prod.url : "#"

                        return (
                          <Link
                            key={pIdx}
                            href={prodUrl}
                            className="flex items-center justify-between p-4 text-sm font-medium text-gray-800 hover:bg-slate-50 hover:text-primary transition-colors group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {prodName}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                          </Link>
                        )
                      })
                    ) : (
                      <div className="p-4 text-sm text-gray-400 italic">
                        {locale === "id"
                          ? "Belum ada produk terdaftar"
                          : "No products listed yet"}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
