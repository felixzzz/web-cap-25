import React from "react"
import { ImageContentBlock } from "./ContentLeftRightBlock"
import { MetaIntro } from "@/lib/fragment"
import { useLocale } from "next-intl"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"

export function IntroContentImageBlock({
  description_en,
  description_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
  className,
  children,
  reverse,
  ...props
}: MetaIntro &
  React.HTMLAttributes<HTMLDivElement> & {
    reverse?: boolean
  }) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className={cn(`py-10 lg:py-20`, className)} {...props}>
      <ImageContentBlock
        img={assetUrl(image_id)}
        text={`${getLocalizedContent(locale, description_en, description_id)}`}
        reverse={reverse}
        className="lg:py-24"
      />

      {children}
    </div>
  )
}
