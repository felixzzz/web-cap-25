"use client"

import * as React from "react"
import { Banner } from "@/lib/types"
import Autoplay from "embla-carousel-autoplay"
import { BannerCard } from "./BannerCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface BannerCarouselProps {
  banners: Banner[]
  className?: string
  aspectRatio?: "16/9" | "4/3" | "9/16" | "3/4" | "1/1" | "21/5" | "21/4"
}

export function BannerCarousel({
  banners,
  className,
  aspectRatio,
}: BannerCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!banners || banners.length === 0) return null

  return (
    <div className={cn("relative", className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <BannerCard banner={banner} aspectRatio={aspectRatio} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              current === index + 1 ? "w-6 bg-white" : "bg-white/50"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
