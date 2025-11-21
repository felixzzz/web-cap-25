"use client"

import { assetUrl, cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import { useWindowSize } from "usehooks-ts"

type BackgroundProp = {
  bg: StaticImageData | string
  bgMobile: StaticImageData | string
  bgGradient?: StaticImageData | string
  bgGradientMobile?: StaticImageData | string
  priority?: boolean
  video?: string | null
  alt: string
  altMobile: string
} & React.HTMLAttributes<HTMLDivElement>

export function Background({
  bg,
  bgMobile,
  priority,
  bgGradient,
  bgGradientMobile,
  video,
  className,
  alt,
  altMobile
}: BackgroundProp) {
  return (
    <>
      <div
        className={cn(
          `pointer-events-none absolute left-0 top-0 -z-10 h-full w-full`,
          className
        )}
      >
        {video ? (
          <>
            <video
              height="100%"
              width="100%"
              className="pointer-events-none h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              loop
            >
              <source
                className="pointer-events-none"
                src={assetUrl(video)!}
                type="video/mp4"
              />
            </video>
          </>
        ) : (
          <>
            <Image
              src={bg}
              alt={alt}
              fill
              className="hidden object-cover lg:block"
              priority={priority}
            />
            <Image
              src={bgMobile}
              alt={altMobile}
              fill
              className="block object-cover lg:hidden"
              priority={priority}
            />
          </>
        )}
      </div>

      {/* temporary, will remove this after migration all the components */}
      {bgGradient && (
        <Image
          src={bgGradient}
          className=" absolute bottom-0 hidden lg:block"
          alt=""
        />
      )}
      {bgGradientMobile && (
        <Image
          src={bgGradientMobile}
          className=" absolute bottom-0 block w-full lg:hidden"
          alt=""
        />
      )}
    </>
  )
}
