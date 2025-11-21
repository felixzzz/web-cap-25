"use client"
import { MetaContentLeftRight } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image, { StaticImageData } from "next/image"
import React from "react"
import { Button } from "../ui/button"
import Anim from "../global/Anim"
import Link from "next/link"

type ImageContentProp = {} & React.HTMLAttributes<HTMLDivElement>
type ImageContentLeftProp = {
  reverse?: boolean
} & React.HTMLAttributes<HTMLDivElement>
type ImageContentRightProp = {
  reverse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function ImageContentWrapper({
  children,
  className,
  ...props
}: ImageContentProp) {
  return (
    <>
      <div
        className={cn(`grid grid-cols-1 lg:grid-cols-12 lg:gap-10`, className)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export function ImageContentLeft({
  reverse,
  className,
  children,
  ...props
}: ImageContentLeftProp) {
  return (
    <>
      <div
        className={cn(`col-span-6`, className, reverse && `lg:order-last`)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export function ImageContentRight({
  reverse,
  className,
  children,
  ...props
}: ImageContentRightProp) {
  return (
    <>
      <div
        className={cn(`col-span-6`, className, reverse && `lg:order-first`)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

type ImageContentBlockProps = {
  img?: StaticImageData | string | null
  title?: string | null
  text?: string | null
  reverse?: boolean
  isNeedContainer?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function ImageContentBlock({
  img,
  title,
  text,
  children,
  className,
  reverse = false,
  isNeedContainer = true,
  ...props
}: ImageContentBlockProps) {
  return (
    <div className={cn(`relative py-4 lg:py-12`, className)} {...props}>
      <div className={cn(isNeedContainer && "container")}>
        <div className={cn(`grid grid-cols-1 lg:grid-cols-12 lg:gap-10`)}>
          <div className={cn(`col-span-5`, reverse && `lg:order-last`)}>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              {img && (
                <Image src={img} alt="img-card" fill className="object-cover" />
              )}
            </div>
          </div>
          <div className="col-span-7 flex items-center justify-center py-5">
            <div className="space-y-4">
              {title && <h2 className="text-2xl font-bold">{title}</h2>}
              {text && <article dangerouslySetInnerHTML={{ __html: text }}></article>}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContentLeftRightBlock({
  list_en,
  list_id,
  status_en,
  status_id,
}: MetaContentLeftRight) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className="py-4 lg:py-12">
      <Anim>
        {getLocalizedContent(locale, list_en, list_id)
          ?.filter((item) => item.status === "active")
          ?.map((item, i) => (
            <div key={i}>
              <ImageContentBlock
                img={assetUrl(item.image)}
                title={item.title!}
                text={item.description}
                reverse={item.image_position == "right"}
              >
                {item.cta_label && item.cta_url && (
                  <Link href={`${item.cta_url}`} className="inline-block py-4">
                    <Button>{item.cta_label}</Button>
                  </Link>
                )}
              </ImageContentBlock>
            </div>
          ))}
      </Anim>
    </div>
  )
}
