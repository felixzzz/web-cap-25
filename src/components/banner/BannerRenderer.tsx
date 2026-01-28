"use client"

import { Banner } from "@/lib/types"
import { BannerCard } from "./BannerCard"
import { BannerCarousel } from "./BannerCarousel"

interface BannerRendererProps {
  banners: Banner[]
  position: "left" | "right" | "center" | "bottom"
  className?: string
  aspectRatio?: "16/9" | "4/3" | "9/16" | "3/4" | "1/1" | "21/5" | "21/4"
}

export function BannerRenderer({
  banners,
  position,
  aspectRatio,
  className,
}: BannerRendererProps) {
  if (!banners || banners.length === 0) return null

  if (banners.length === 1) {
    return (
      <BannerCard
        banner={banners[0]}
        className={className}
        aspectRatio={aspectRatio}
      />
    )
  }

  return (
    <BannerCarousel
      banners={banners}
      className={className}
      aspectRatio={aspectRatio}
    />
  )
}
