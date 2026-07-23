"use client"

import React from "react"
import Image from "next/image"
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
    profile.image ||
    profile.image_id ||
    profile.image_en ||
    ""

  const imageUrl = assetUrl(rawImage)

  const altText =
    getLocalizedContent(locale, profile.alt_text_image_en, profile.alt_text_image_id) ||
    profile.alt_text_image ||
    title ||
    "Product Profile"

  if (!title && !description && !imageUrl) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-8 lg:py-14">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Text Column */}
        <div className="flex flex-col justify-center space-y-4 lg:col-span-7">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <div
              className="text-base text-gray-700 sm:text-lg leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* Right Image Column */}
        {imageUrl && (
          <div className="lg:col-span-5">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-md aspect-[16/9] sm:aspect-[2/1] lg:aspect-[4/3] bg-gray-100">
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductProfileSection
