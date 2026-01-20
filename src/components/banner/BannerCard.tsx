"use client"

import { Banner } from "@/lib/types"
import { assetUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface BannerCardProps {
  banner: Banner
  title?: string
  className?: string
}

export function BannerCard({ banner, title, className }: BannerCardProps) {
  if (!banner) return null

  // Ensure URL is valid or handle external/internal links
  const href = banner.cta_url || "#"
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`bg-gray-900 group relative block w-full overflow-hidden rounded-xl ${className}`}
      style={{
        aspectRatio: banner.aspect_ratio
          ? banner.aspect_ratio.replace(":", "/")
          : "4/3",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        {banner.image && (
          <Image
            src={
              banner.image
                ? assetUrl(banner.image)!
                : "/img/common/img_default-news.jpg"
            }
            alt={banner.title || title || "Banner"}
            fill
            className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end p-6 text-white">
        <h3 className="mb-2 text-xl font-bold leading-tight lg:text-2xl">
          {banner.title}
        </h3>

        {banner.description && (
          <p className="text-gray-200 mb-4 line-clamp-3 text-sm lg:text-base">
            {banner.description}
          </p>
        )}

        {banner.cta_label && (
          <div className="mt-2">
            <span className="hover:bg-gray-100 inline-flex items-center rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-colors">
              {banner.cta_label}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
