"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import { getBannerPage } from "@/lib/api"
import StickyBanner from "./StickyBanner"
import { usePageId } from "../providers/query-provider"

export default function StickyBannerWrapper() {
  const locale = useLocale()
  const pathname = usePathname()
  const { pageId } = usePageId()

  const { data: homeBanners } = useQuery({
    queryKey: ["pages-banner", pageId, locale],
    queryFn: () => getBannerPage(pageId as string, locale),
    enabled: !!pageId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  if (pathname && pathname.includes("/admin/")) {
    return null
  }

  const banner = homeBanners?.navbar?.[0] || null

  return <StickyBanner banner={banner} />
}
