"use client"

import { useCustomNavSwiper } from "@/hooks/useCustomNavSwiper"
import { assetUrl, cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import "swiper/css"

interface ItemImageGalleryProps {
    mainImage: string
    supportingImages?: Array<{
        image: string
        alt: string
    }>
    title: string
    className?: string
}

export default function ItemImageGallery({
    mainImage,
    supportingImages,
    title,
    className,
}: ItemImageGalleryProps) {
    const swiperRef = useRef<SwiperRef>(null)
    const { handleNext, handlePrev, allowSlidePrev, allowSlideNext, index } =
        useCustomNavSwiper(swiperRef)

    const allImages = [
        { image: mainImage, alt: title },
        ...(supportingImages || []).map((img) => ({
            image: img.image,
            alt: img.alt || title,
        })),
    ]

    // If only 1 image, just render it directly (no slider overhead)
    if (allImages.length <= 1) {
        return (
            <div className={cn("relative rounded-3xl overflow-hidden aspect-[4/3] xl:aspect-[4/3] w-full flex items-center justify-center bg-gray-100", className)}>
                {/* Main Image Layer */}
                <Image
                    src={assetUrl(allImages[0].image) || ""}
                    alt={allImages[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        )
    }

    return (
        <div className={cn("relative group rounded-3xl overflow-hidden aspect-[4/3] xl:aspect-[4/3] w-full bg-gray-100", className)}>
            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                className="absolute inset-0 w-full h-full"
                loop={false}
            >
                {allImages.map((img, idx) => (
                    <SwiperSlide key={idx} className="!w-full !h-full">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                            {/* Main Image Layer */}
                            <Image
                                src={assetUrl(img.image) || ""}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Arrows (Floating) - Always visible for better UX */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePrev()
                    }}
                    disabled={!allowSlidePrev}
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg pointer-events-auto transition-all transform hover:scale-110 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed hover:bg-white/50 text-white",
                        !allowSlidePrev && "hidden"
                    )}
                    aria-label="Previous Image"
                >
                    <ArrowLeft className="w-5 h-5 drop-shadow-md" />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                    }}
                    disabled={!allowSlideNext}
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg pointer-events-auto transition-all transform hover:scale-110 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed hover:bg-white/50 text-white",
                        !allowSlideNext && "hidden"
                    )}
                    aria-label="Next Image"
                >
                    <ArrowRight className="w-5 h-5 drop-shadow-md" />
                </button>
            </div>

            {/* Pagination Container with Gradient for Contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
                {allImages.map((_, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm",
                            index === idx ? "bg-white w-6" : "bg-white/50 w-2 hover:bg-white/80"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
