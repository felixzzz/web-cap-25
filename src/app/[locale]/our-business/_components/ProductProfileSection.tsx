"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { MetaProductProfile } from "@/lib/types"
import { assetUrl, getLocalizedContent } from "@/lib/utils"

interface ProductProfileSectionProps {
  profile?: MetaProductProfile
}

export function ProductProfileSection({ profile }: ProductProfileSectionProps) {
  const locale = useLocale()

  if (!profile) return null

  // Status check (support single field status or localized status_en/status_id)
  const status = profile.status || (locale === "en" ? profile.status_en : profile.status_id)
  if (status === "inactive" || status === "Inactive") {
    return null
  }

  // Resolve localized fields with fallbacks
  const title =
    getLocalizedContent(locale, profile.title_en, profile.title_id) ||
    profile.title ||
    ""

  const description =
    getLocalizedContent(locale, profile.description_en, profile.description_id) ||
    profile.description ||
    ""

  const rawImage =
    getLocalizedContent(locale, profile.image_en, profile.image_id) ||
    (locale === "en" ? profile.image_en || profile.image_id : profile.image_id || profile.image_en) ||
    profile.image ||
    ""

  const imageUrl = assetUrl(rawImage) || ""

  const altText =
    getLocalizedContent(locale, profile.alt_text_image_en, profile.alt_text_image_id) ||
    profile.alt_text_image ||
    title ||
    "Product Profile"

  const rawImageUrl =
    getLocalizedContent(locale, profile.image_url_en, profile.image_url_id) ||
    profile.image_url ||
    ""

  const imageLink = rawImageUrl ? assetUrl(rawImageUrl) || rawImageUrl : ""

  const rawOpenNewTab =
    getLocalizedContent(locale, profile.open_new_tab_en, profile.open_new_tab_id) ||
    profile.open_new_tab ||
    "no"

  const isNewTab =
    rawOpenNewTab === "yes" ||
    rawOpenNewTab === "Yes" ||
    rawOpenNewTab === "_blank" ||
    rawOpenNewTab === "true"

  if (!title && !description && !imageUrl) {
    return null
  }

  const renderImageContent = () => (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md aspect-[8/3] bg-gray-100 group">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className={`object-cover ${imageLink ? "transition-transform duration-500 group-hover:scale-105" : ""}`}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  )

  return (
    <section className="container mx-auto px-4 py-8 lg:py-14">
      {/* Profile Title at the top */}
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
      )}

      {/* Under title: split into 2 sections (Left: Description top-aligned, Right: 8:3 Image) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Description (Top Vertically Aligned) */}
        <div className={`flex flex-col justify-start ${imageUrl ? "lg:col-span-6" : "lg:col-span-12"}`}>
          {description && (
            <div
              className="prose max-w-none text-base text-gray-700 sm:text-lg leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* Right Column: Image with 8:3 ratio */}
        {imageUrl && (
          <div className={`w-full ${description ? "lg:col-span-6" : "lg:col-span-12"}`}>
            {imageLink ? (
              <Link
                href={imageLink}
                target={isNewTab ? "_blank" : undefined}
                rel={isNewTab ? "noopener noreferrer" : undefined}
                className="block"
              >
                {renderImageContent()}
              </Link>
            ) : (
              renderImageContent()
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductProfileSection
