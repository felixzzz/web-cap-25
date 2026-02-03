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

  // Set CSS variable for banner height
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.setProperty(
        "--sticky-banner-height",
        "64px"
      )
    } else {
      document.documentElement.style.setProperty(
        "--sticky-banner-height",
        "0px"
      )
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(BANNER_STORAGE_KEY, "true")
  }

  if (!isVisible || !banner) return null

  return (
    <div
      className="fixed top-0 z-[998] h-16 w-full shadow-md bg-primary overflow-hidden"
      style={{
        backgroundColor: "#09102B",
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={banner.title || "Banner"}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
      ) : (
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              "linear-gradient(to right, rgb(239, 246, 255), rgb(219, 234, 254))",
          }}
        />
      )}
      <div className="container relative flex h-full items-center justify-between gap-2 px-4 lg:gap-4">
        {/* Banner Content */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden lg:gap-4">
          <div className="min-w-0 flex-1 overflow-hidden">
            {banner.title && (
              <p
                className="line-clamp-1 text-xs font-semibold lg:text-base"
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
                className="line-clamp-1 text-xs lg:text-sm"
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
              className="flex-shrink-0 whitespace-nowrap rounded-full bg-blue-600 px-3 py-1 text-[10px] font-medium text-white transition-colors hover:bg-blue-700 sm:px-4 sm:py-1.5 sm:text-xs lg:text-sm"
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
