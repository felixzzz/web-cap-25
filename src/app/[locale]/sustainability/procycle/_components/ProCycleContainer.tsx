"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "next-intl"
import { ChevronRight, ArrowUpRight } from "lucide-react"
import { BannerBlock } from "@/components/block/BannerBlock"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { logoChandraAsriWhite } from "@/data/images"
import { cn, getLocalizedContent, assetUrl } from "@/lib/utils"
import { DEFAULT_PROCYCLE_DATA } from "../_data/procycleData"

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
    bottom_banner?: any
  }
}

export function ProCycleContainer({ data }: ProCycleContainerProps) {
  const locale = useLocale()

  const banner = data?.banner
  const intro = data?.intro
  const approach = data?.our_approach
  const productDatasheet = data?.product_datasheet
  const bottomBanner = data?.bottom_banner

  // Fallback banner to ensure images resolve cleanly if empty or only uploaded in one language
  const bannerData = useMemo(() => {
    if (!banner) return null
    const defaultDesktop = DEFAULT_PROCYCLE_DATA.banner.image_desktop_en
    const defaultMobile = DEFAULT_PROCYCLE_DATA.banner.image_mobile_en
    return {
      ...banner,
      image_desktop_id: banner.image_desktop_id || defaultDesktop,
      image_desktop_en:
        banner.image_desktop_en || banner.image_desktop_id || defaultDesktop,
      image_mobile_id: banner.image_mobile_id || defaultMobile,
      image_mobile_en:
        banner.image_mobile_en || banner.image_mobile_id || defaultMobile,
    }
  }, [banner])

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

  // Bottom Banner CMS Data (Dedicated page section, not FooterBanner)
  const isBottomBannerActive =
    bottomBanner?.status === "active" ||
    bottomBanner?.status_id === "active" ||
    bottomBanner?.status_en === "active" ||
    (bottomBanner &&
      bottomBanner.status !== "inactive" &&
      bottomBanner.status_id !== "inactive" &&
      bottomBanner.status_en !== "inactive")

  const bottomBannerTitle =
    getLocalizedContent(
      locale,
      bottomBanner?.title_en,
      bottomBanner?.title_id
    ) ||
    bottomBanner?.title ||
    (locale === "id"
      ? "Mari Membangun Masa Depan, Bersama"
      : "Let's Build What's Next, Together")

  const bottomBannerDesc =
    getLocalizedContent(
      locale,
      bottomBanner?.description_en,
      bottomBanner?.description_id
    ) ||
    bottomBanner?.description ||
    (locale === "id"
      ? "Temukan bagaimana Chandra Asri Group dapat menjadi mitra pertumbuhan Anda dalam membangun bisnis yang lebih tangguh dan berkelanjutan."
      : "Discover how Chandra Asri Group can be your growth partner in building stronger businesses")

  const bottomBannerBtnLabel =
    getLocalizedContent(
      locale,
      bottomBanner?.button_label_en,
      bottomBanner?.button_label_id
    ) ||
    bottomBanner?.button_label ||
    (locale === "id" ? "Jelajahi Bisnis Kami" : "Discover Our Business")

  const bottomBannerBtnUrl =
    getLocalizedContent(
      locale,
      bottomBanner?.button_url_en,
      bottomBanner?.button_url_id
    ) ||
    bottomBanner?.button_url ||
    "/our-business"

  const bottomBannerBg =
    getLocalizedContent(
      locale,
      bottomBanner?.image_desktop_en,
      bottomBanner?.image_desktop_id
    ) ||
    bottomBanner?.image_desktop_id ||
    "/img/temp/bg-jumbotron.jpg"

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Banner */}
      {bannerData && (
        <BannerBlock
          {...bannerData}
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
              <div
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left Column: Vertical Category Tabs */}
            <div className="lg:col-span-3">
              {/* Desktop Tabs */}
              <div className="hidden lg:flex flex-col border-l-2 border-gray-200">
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

      {/* 5. Bottom CTA Banner (Managed via CMS, not FooterBanner) */}
      {isBottomBannerActive && (
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-[#0B1E3F] px-6 py-12 sm:px-12 sm:py-16 lg:py-20 text-center shadow-xl">
            {/* Background Image / Overlay */}
            {bottomBannerBg && (
              <div className="absolute inset-0 -z-0 pointer-events-none">
                <Image
                  src={assetUrl(bottomBannerBg)!}
                  alt={bottomBannerTitle}
                  fill
                  className="object-cover opacity-20 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3F] via-[#0B1E3F]/85 to-[#0B1E3F]/70" />
              </div>
            )}

            <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">
              {/* Logo Chandra Asri White */}
              <div className="mb-6">
                <Image
                  src={logoChandraAsriWhite}
                  alt="Chandra Asri Group"
                  width={160}
                  height={42}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                {bottomBannerTitle}
              </h2>

              {/* Subtitle / Description */}
              {bottomBannerDesc && (
                <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
                  {bottomBannerDesc}
                </p>
              )}

              {/* Button CTA */}
              {bottomBannerBtnLabel && (
                <Link
                  href={bottomBannerBtnUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0082CA] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-[#0070b0] hover:shadow-lg transition-all duration-200 group"
                >
                  <span>{bottomBannerBtnLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
