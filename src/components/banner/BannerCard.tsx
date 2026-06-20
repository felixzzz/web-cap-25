"use client"

import { Banner } from "@/lib/types"
import { assetUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { FastAverageColor } from "fast-average-color"
import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface BannerCardProps {
  banner: Banner
  title?: string
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

export function BannerCard({
  banner,
  title,
  className,
  aspectRatio,
}: BannerCardProps) {
  const [textColor, setTextColor] = useState("white")
  const isMobile = useMediaQuery("(max-width: 1023.98px)", { defaultValue: false, initializeWithValue: false })

  const activeAspectRatio = (isMobile && banner?.aspect_ratio_mobile && banner.aspect_ratio_mobile !== "null" && banner.aspect_ratio_mobile.trim() !== "")
    ? banner.aspect_ratio_mobile.replace(":", "/")
    : (aspectRatio
        ? aspectRatio.replace(":", "/")
        : (banner?.aspect_ratio && banner.aspect_ratio !== "null" && banner.aspect_ratio.trim() !== ""
            ? banner.aspect_ratio.replace(":", "/")
            : "4/3"));

  const isPortrait = activeAspectRatio === "3/4" || activeAspectRatio === "9/16";

  const imageUrl =
    (isMobile && banner?.image_mobile && banner.image_mobile !== "null" && banner.image_mobile.trim() !== "")
      ? assetUrl(banner.image_mobile)!
      : (banner?.image && banner.image !== "null" && banner.image.trim() !== ""
          ? assetUrl(banner.image)!
          : (() => {
              if (!banner) return ""
              switch (activeAspectRatio.replace("/", ":")) {
                case "1:1":
                  return "/img/bg/default-1/1.webp"
                case "3:4":
                  return "/img/bg/default-3/4.webp"
                case "9:16":
                  return "/img/bg/default-9/16.webp"
                default:
                  return "/img/bg/default-bg.webp"
              }
            })())

  useEffect(() => {
    if (imageUrl) {
      const fac = new FastAverageColor()
      // Use Next.js image optimization endpoint as a proxy to avoid CORS
      // This works because the Next.js server fetches the image (s2s) and serves it back to us (same origin)
      const proxiedUrl = `/_next/image?url=${encodeURIComponent(imageUrl)}&w=640&q=75`

      fac
        .getColorAsync(proxiedUrl)
        .then((color) => {
          setTextColor(color.isDark ? "white" : "black")
        })
        .catch((e) => {
          // Default to white on error (e.g. CORS)
          setTextColor("white")
        })
    }
  }, [imageUrl])

  if (!banner) return null

  // Ensure URL is valid or handle external/internal links
  const href = banner.cta_url || "#"
  const isExternal = href.startsWith("http")

  return (
    <div
      className={`bg-gray-900 group relative block w-full overflow-hidden rounded-xl ${isPortrait && isMobile ? "mx-auto" : ""} ${className}`}
      style={{
        aspectRatio: activeAspectRatio,
        maxHeight: isPortrait && isMobile ? "350px" : undefined,
        maxWidth: isPortrait && isMobile ? `calc(350px * (${activeAspectRatio}))` : undefined,
      }}
    >
      {banner.html ? (
        <div
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: banner.html }}
        />
      ) : (
        <>
          {/* Background Media */}
          <div className="absolute inset-0 h-full w-full">
            {(() => {
              const videoUrl = (isMobile && banner?.video_mobile && banner.video_mobile !== "null" && banner.video_mobile.trim() !== "") 
                ? banner.video_mobile 
                : (banner?.video && banner.video !== "null" && banner.video.trim() !== "" ? banner.video : null);
              
              if (videoUrl) {
                return (
                  <video
                    src={assetUrl(videoUrl)!}
                    poster={imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                )
              }

              return (
                <Image
                  src={imageUrl}
                  alt={banner.title || title || "Banner"}
                  fill
                  onError={(event: any) => {
                    event.target.id = "/img/bg/default-bg.webp"
                    event.target.srcset = "/img/bg/default-bg.webp"
                  }}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              )
            })()}
            {!banner.title && !banner.description && (
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
          </div>

          {/* Content Overlay */}
          <div
            className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center p-3 text-center lg:p-6"
            style={{ color: textColor }}
          >
            {banner.title && (
              <h3 className="mb-0 text-base font-bold leading-tight md:mb-2 lg:text-2xl">
                {banner.title}
              </h3>
            )}

            {banner.description && (
              <p
                className="mb-3 line-clamp-1 text-[10px] text-xs md:mb-2 md:text-xs lg:line-clamp-3 lg:text-sm"
                style={{ color: textColor }}
              >
                {banner.description}
              </p>
            )}

            {banner.cta_label && (
              <div
                className={`mt-1 lg:mt-2 ${!banner.title && !banner.description ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""}`}
              >
                <Link
                  href={href}
                  className={banner.cta_gtm}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className="hover:bg-gray-100 inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black transition-colors lg:px-6 lg:py-2 lg:text-sm">
                    {banner.cta_label}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
