"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { getBannerPage } from "@/lib/api"
import { BannerRenderer } from "../banner/BannerRenderer"
import { usePageId } from "../providers/query-provider"

export default function FooterBanner() {
  const locale = useLocale()
  const { pageId } = usePageId()

  const { data: homeBanners } = useQuery({
    queryKey: ["pages-banner", pageId, locale],
    queryFn: () => getBannerPage(pageId as string, locale),
    enabled: !!pageId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const banners = homeBanners?.footer || []

  if (!banners || banners.length === 0) return null

  return (
    <div className="min-h-[45px] w-full py-10 shadow-md lg:min-h-[80px]">
      <div className="container">
        <BannerRenderer banners={banners} position="bottom" />
      </div>
    </div>
  )
}
