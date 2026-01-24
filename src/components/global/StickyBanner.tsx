"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { Banner } from "@/lib/types"
import { assetUrl } from "@/lib/utils"
import { FastAverageColor } from "fast-average-color"

const BANNER_STORAGE_KEY = "sticky-banner-closed"

interface StickyBannerProps {
  banner?: Banner | null
}

export default function StickyBanner({ banner }: StickyBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [textColor, setTextColor] = useState("white")

  useEffect(() => {
    // Only show if banner data exists and wasn't previously closed
    if (banner) {
      const isClosed = localStorage.getItem(BANNER_STORAGE_KEY)
      if (!isClosed) {
        setIsVisible(true)
      }
    }
  }, [banner])

  const imageUrl =
    banner?.image && banner.image !== "null" ? assetUrl(banner.image)! : null

  useEffect(() => {
    if (imageUrl) {
      const fac = new FastAverageColor()
      const proxiedUrl = `/_next/image?url=${encodeURIComponent(imageUrl)}&w=640&q=75`

      fac
        .getColorAsync(proxiedUrl)
        .then((color) => {
          setTextColor(color.isDark ? "white" : "black")
        })
        .catch(() => {
          setTextColor("white")
        })
    }
  }, [imageUrl])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(BANNER_STORAGE_KEY, "true")
  }

  if (!isVisible || !banner) return null

  return (
    <div
      className="fixed top-16 z-[999] w-full shadow-md"
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : "linear-gradient(to right, rgb(239, 246, 255), rgb(219, 234, 254))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container relative flex items-center justify-between gap-4 py-3">
        {/* Banner Content */}
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-1">
            {banner.title && (
              <p
                className="text-sm font-semibold lg:text-base"
                style={{
                  color: textColor,
                  textShadow:
                    textColor === "white"
                      ? "0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)"
                      : "0 2px 4px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(255, 255, 255, 0.3)",
                }}
              >
                {banner.title}
              </p>
            )}
            {banner.description && (
              <p
                className="text-xs lg:text-sm"
                style={{
                  color: textColor,
                  textShadow:
                    textColor === "white"
                      ? "0 1px 3px rgba(0, 0, 0, 0.5)"
                      : "0 1px 3px rgba(255, 255, 255, 0.5)",
                }}
              >
                {banner.description}
              </p>
            )}
          </div>
          {banner.cta_url && banner.cta_label && (
            <Link
              href={banner.cta_url}
              className="flex-shrink-0 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 lg:text-sm"
            >
              {banner.cta_label}
            </Link>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
          aria-label="Close banner"
        >
          <X className="h-5 w-5" style={{ color: textColor }} />
        </button>
      </div>
    </div>
  )
}
