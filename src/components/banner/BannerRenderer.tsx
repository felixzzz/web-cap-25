"use client"

import { Banner } from "@/lib/types"
import { cn } from "@/lib/utils"
import { BannerCard } from "./BannerCard"
import { BannerCarousel } from "./BannerCarousel"

interface BannerRendererProps {
  banners: Banner[]
  position: "left" | "right" | "center" | "bottom"
  className?: string
  aspectRatio?:
    | "16/9"
    | "4/3"
    | "9/16"
    | "3/4"
    | "1/1"
    | "21/5"
    | "21/4"
    | "21/9"
}

export function BannerRenderer({
  banners,
  position,
  aspectRatio,
  className,
}: BannerRendererProps) {
  if (!banners || banners.length === 0) return null

  const sideBannerClassName =
    position === "left" || position === "right"
      ? "md:max-lg:mx-auto md:max-lg:w-3/4"
      : undefined
  const bannerClassName = cn(sideBannerClassName, className)

  if (banners.length === 1) {
    return (
      <BannerCard
        banner={banners[0]}
        className={bannerClassName}
        aspectRatio={aspectRatio}
      />
    )
  }

  return (
    <BannerCarousel
      banners={banners}
      className={bannerClassName}
      aspectRatio={aspectRatio}
    />
  )
}
