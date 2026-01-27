"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { getHomeBannersReactQuery } from "@/lib/api"
import StickyBanner from "./StickyBanner"

export default function StickyBannerWrapper() {
  const locale = useLocale()

  const { data: homeBanners } = useQuery({
    queryKey: ["home-banners", locale],
    queryFn: () => getHomeBannersReactQuery(locale),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const banner = homeBanners?.navbar?.[0] || null

  console.log(homeBanners)

  return <StickyBanner banner={banner} />
}
