"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { Banner } from "@/lib/types"
import { assetUrl } from "@/lib/utils"
import Link from "next/link"
import { FastAverageColor } from "fast-average-color"
import { getHomeBannersReactQuery } from "@/lib/api"

export default function FooterBanner() {
  const locale = useLocale()
  const [textColor, setTextColor] = useState("white")

  const { data: homeBanners, isLoading } = useQuery({
    queryKey: ["home-banners", locale],
    queryFn: () => getHomeBannersReactQuery(locale),
  })

  const banner: Banner | null = homeBanners?.navbar?.[0] || null

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

  if (isLoading || !banner) return null

  return (
    <div
      className="h-16 w-full shadow-md lg:h-24"
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : "linear-gradient(to right, rgb(239, 246, 255), rgb(219, 234, 254))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
              className="hidden flex-shrink-0 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:inline-flex lg:text-sm"
            >
              {banner.cta_label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
