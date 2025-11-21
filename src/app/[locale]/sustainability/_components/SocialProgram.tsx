import React from "react"
import { ImageContentBlock } from "@/components/block/ContentLeftRightBlock"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function SocialProgram({
  status_id,
  title_id,
  description_id,
  image_id,
  status_en,
  title_en,
  description_en,
  image_en,
}: {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
}) {
  const locale = useLocale()
  if (!isContentActive(locale, status_en, status_id)) return <></>
  const imageSrc = image_id

  return (
    <ImageContentBlock
      className="bg-surface lg:py-20"
      img={assetUrl(imageSrc)}
      title={getLocalizedContent(locale, title_en, title_id)}
      text={getLocalizedContent(locale, description_en, description_id)}
      reverse={true}
    />
  )
}
