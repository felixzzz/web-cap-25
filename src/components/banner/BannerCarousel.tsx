"use client"

import * as React from "react"
import { Banner } from "@/lib/types"
import Autoplay from "embla-carousel-autoplay"
import { BannerCard } from "./BannerCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface BannerCarouselProps {
  banners: Banner[]
  className?: string
}

export function BannerCarousel({ banners, className }: BannerCarouselProps) {
  if (!banners || banners.length === 0) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className={`w-full ${className}`}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <BannerCard banner={banner} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
