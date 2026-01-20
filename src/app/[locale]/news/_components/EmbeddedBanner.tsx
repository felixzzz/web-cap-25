"use client"

import { BannerRenderer } from "@/components/banner/BannerRenderer"
import { useEmbeddedBanner } from "@/lib/hooks"

export function EmbeddedBanner({ id }: { id: string }) {
  const { data: banners, isLoading } = useEmbeddedBanner(id)

  if (isLoading || !banners || banners.length === 0) return null

  return (
    <div className="my-8">
      <BannerRenderer banners={banners} position="center" />
    </div>
  )
}
