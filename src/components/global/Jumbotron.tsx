import { Background } from "../anti/background"
import Anim from "./Anim"
import { StaticImageData } from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"
import LoadingVertical from "../anti/LoadingVertical"

type Prop = {
  bg?: StaticImageData | string | null
  bgMobile?: StaticImageData | string | null
  video?: string | null
  className?: string
  hideLoadingVertical?: boolean
  alt?: string
  altMobile?: string
} & React.HTMLAttributes<HTMLDivElement>

export function Jumbotron({
  bg,
  bgMobile,
  video,
  children,
  className,
  hideLoadingVertical,
  alt,
  altMobile,
  ...props
}: Prop) {
  return (
    <>
      <div
        className={cn(
          "relative flex aspect-auto min-h-[640px] w-full overflow-hidden lg:aspect-[2/1] lg:min-h-[700px]",
          className
        )}
        {...props}
      >
        <div>
          {bg && (
            <Background
              video={video}
              bg={bg}
              bgMobile={bgMobile || bg}
              alt={alt || ""}
              altMobile={altMobile || ""}
            />
          )}
        </div>

        <div className="z-1 container relative mb-8 mt-auto flex flex-col items-start lg:mb-[132px]">
          <Anim>
            {children}
          </Anim>
        </div>
        {!hideLoadingVertical && (
          <LoadingVertical
            containerClass="hidden lg:block"
            labelClassName="text-white"
            loadingLineClassName="bg-[#FFFFFF4D]"
            secondInnerClassName="bg-white"
            showShadow
            loadingWrapperClassName="max-md:hidden"
          />
        )}
      </div>
    </>
  )
}

type JumbotronContentProp = {
  label?: string
  title?: string
  text?: string
  cta_label?: string
  cta_url?: string
  shadowClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

export function JumbotronContent({
  label,
  title,
  text,
  cta_label,
  cta_url,
  className,
  children,
  shadowClassName,
  ...props
}: JumbotronContentProp) {
  return (
    <div className={cn(`relative`, className)} {...props}>
      <div
        className={cn(
          `absolute left-0 top-0 h-[442px] w-[948px] scale-[1.25] rounded-[900px] bg-oxford-blue opacity-90 blur-[90px] lg:h-full lg:w-full`,
          shadowClassName
        )}
      ></div>

      <Anim>
        {label && (
          <div className="text-xs uppercase tracking-[0.96px] text-white/70">
            {label}
          </div>
        )}
        {title && (
          <h1 className="mt-2 line-clamp-4 max-w-[815px] text-3xl font-semibold text-white lg:mt-0 lg:text-6xl">
            {title}
          </h1>
        )}
        {text && (
          <div
            className="mt-4 max-w-[700px] text-xs leading-[150%] tracking-[0.18px] text-white/80 lg:text-[18px]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {cta_label && (
          <Button className="mt-6 max-w-[140px]" variant="outline" asChild>
            <Link href={cta_url || "/"}>{cta_label}</Link>
          </Button>
        )}

        {children}
      </Anim>
    </div>
  )
}
