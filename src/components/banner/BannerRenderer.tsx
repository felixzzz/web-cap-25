"use client"

import { Banner } from "@/lib/types"
import { BannerCard } from "./BannerCard"
import { BannerCarousel } from "./BannerCarousel"

interface BannerRendererProps {
  banners: Banner[]
  position: "left" | "right" | "center" | "bottom"
  className?: string
}

export function BannerRenderer({
  banners,
  position,
  className,
}: BannerRendererProps) {
  console.log(
    `BannerRenderer [${position}] received:`,
    banners?.length,
    "banners"
  )
  if (!banners || banners.length === 0) return null

  if (banners.length === 1) {
    return <BannerCard banner={banners[0]} className={className} />
  }

  return <BannerCarousel banners={banners} className={className} />
}
