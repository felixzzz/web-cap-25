"use client"

import { Banner } from "@/lib/types"
import { assetUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { FastAverageColor } from "fast-average-color"
import { useEffect, useState } from "react"

interface BannerCardProps {
  banner: Banner
  title?: string
  className?: string
}

export function BannerCard({ banner, title, className }: BannerCardProps) {
  const [textColor, setTextColor] = useState("white")

  const imageUrl =
    banner?.image && banner?.image !== "null"
      ? assetUrl(banner.image)!
      : (() => {
          if (!banner) return ""
          switch (banner.aspect_ratio) {
            case "1:1":
              return "/img/bg/default-1/1.webp"
            case "3:4":
              return "/img/bg/default-3/4.webp"
            case "9:16":
              return "/img/bg/default-9/16.webp"
            default:
              return "/img/bg/default-bg.webp"
          }
        })()

  useEffect(() => {
    if (imageUrl) {
      const fac = new FastAverageColor()
      // Use proxy URL for analysis to avoid CORS
      const proxyUrl = imageUrl
        .replace(
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
          "/proxy"
        )
        .replace(
          process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000/storage",
          "/proxy/storage"
        )

      // Fallback: If replacements didn't work (e.g. different env var names), try strict replacement of common backend origin
      const finalUrl = proxyUrl.startsWith("http")
        ? proxyUrl.replace(/^https?:\/\/[^/]+\/storage/, "/proxy/storage")
        : proxyUrl

      fac
        .getColorAsync(finalUrl)
        .then((color) => {
          setTextColor(color.isDark ? "white" : "black")
        })
        .catch((e) => {
          // Default to white on error (e.g. CORS)
          setTextColor("white")
        })
    }
  }, [imageUrl])

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
      {/* Background Media */}
      <div className="absolute inset-0 h-full w-full">
        {(() => {
          if (banner.video) {
            return (
              <video
                src={assetUrl(banner.video)!}
                poster={imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            )
          }

          return (
            <Image
              src={imageUrl}
              alt={banner.title || title || "Banner"}
              fill
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )
        })()}
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center p-6 text-center"
        style={{ color: textColor }}
      >
        <h3 className="mb-2 text-xl font-bold leading-tight lg:text-2xl">
          {banner.title}
        </h3>

        {banner.description && (
          <p
            className="mb-4 line-clamp-3 text-sm lg:text-base"
            style={{ color: textColor }}
          >
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
