"use client"

import { iconNext, imgCardItemGradient } from "@/data/images"
import { cn, isFullUrl } from "@/lib/utils"
import { useCursorStore } from "@/store"
import { useTranslations } from "next-intl"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function CardItem({
  title,
  href,
  desc,
  bg,
  cta_label,
  className,
  classNameDesc,
  alt
}: {
  title: string | null
  href: string
  desc?: string | null
  bg?: StaticImageData | string | null
  cta_label?: string
  className?: string
  classNameDesc?: string
  alt: string
}) {
  const t = useTranslations("global")
  const [isClient, setIsClient] = useState<boolean>(false)
  const { setIsHovered, setText } = useCursorStore((state) => state)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <>{title}</>

  return (
    <Link
      href={href}
      target={isFullUrl(href) ? "_blank" : "_self"}
      className="cursor-none"
      onMouseOver={() => {
        setIsHovered(true)
        setText(t("view_details"))
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setText("")
      }}
    >
      <div
        className={cn(
          "relative flex h-[421px] w-full flex-col px-6 py-8",
          className
        )}
      >
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <Image
            src={bg || ""}
            fill
            className="z-0 rounded-3xl object-cover"
            alt={alt || ""}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={imgCardItemGradient}
            className="absolute bottom-0 w-full rounded-b-3xl"
            alt=""
          />
        </div>
        <div className="z-1 relative mt-auto rounded-3xl">
          {title && (
            <div className="text-md font-bold text-white lg:text-xl max-md:text-[18px]">
              {title}
            </div>
          )}
          {desc && (
            <div
              className={cn(
                "prose mt-2 text-md leading-[150%] tracking-[0.18px] text-white/80 lg:text-[18px]",
                classNameDesc
              )}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
          {cta_label && (
            <div className="mt-[10px] flex gap-2 text-xs font-bold text-white lg:text-sm">
              <div className="my-auto">{cta_label}</div>{" "}
              <Image className="my-auto max-lg:size-5" src={iconNext} alt="" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
