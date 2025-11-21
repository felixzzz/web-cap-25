"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type CardProp = React.HTMLAttributes<HTMLDivElement> & {
  href?: string
}

export function Card({ href, children, className, ...props }: CardProp) {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <>{children}</>
  return (
    <div className={cn(`group relative`, className)} {...props}>
      {href ? (
        <Link href={href} className="cursor-pointer">
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

type CardImageProp = {
  img: StaticImageData | string
  alt?: string
} & React.HTMLAttributes<HTMLDivElement>

export function CardImage({ img, className, alt, ...props }: CardImageProp) {
  return (
    <>
      <div
        className={cn(
          `relative aspect-[16/9] overflow-hidden rounded-md`,
          className
        )}
        {...props}
      >
        <Image
          src={img}
          alt={alt || ""}
          onError={(event: any) => {
            event.target.id = "/img/common/img_default-news.jpg"
            event.target.srcset = "/img/common/img_default-news.jpg"
          }}
          fill
          className="object-cover"
        />
      </div>
    </>
  )
}

type CardContentProp = {
  label?: string | null
  title?: string | null
  text?: string | null
} & React.HTMLAttributes<HTMLDivElement>

export function CardContent({
  className,
  children,
  label,
  title,
  text,
  ...props
}: CardContentProp) {
  return (
    <div className={cn(`py-4`, className)} {...props}>
      {label && (
        <div className="mb-1 text-xs font-bold uppercase text-neutral-500">
          {label}
        </div>
      )}
      {title && (
        <h3 className="mb-2 text-base font-bold lg:text-lg">{title}</h3>
      )}
      {text && <p>{text}</p>}

      {children}
    </div>
  )
}

export function CardSkeleton() {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <></>

  return (
    <>
      <div className="relative">
        <Card>
          <div
            className={cn(
              `relative mb-4 aspect-[16/9] overflow-hidden rounded-md`
            )}
          >
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="mb-2 h-[20px] w-[100px]" />
          <Skeleton className="mb-2 h-[30px] w-full" />
          <Skeleton className="h-[30px] w-[150px]" />
        </Card>
      </div>
    </>
  )
}
