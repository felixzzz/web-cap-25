"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { getHomeBannersReactQuery } from "@/lib/api"
import { BannerRenderer } from "../banner/BannerRenderer"

export default function FooterBanner() {
  const locale = useLocale()

  const { data: homeBanners } = useQuery({
    queryKey: ["home-banners", locale],
    queryFn: () => getHomeBannersReactQuery(locale),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  // Use navbar banners for footer as well, or we could look for a 'footer' key if added later
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
