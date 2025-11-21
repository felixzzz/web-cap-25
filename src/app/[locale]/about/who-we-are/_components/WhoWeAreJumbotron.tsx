"use client"

import { Jumbotron, JumbotronContent } from "@/components/global/Jumbotron"
import { MetaCover } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function WhoWeAreJumbotron({
  status_en,
  status_id,
  description_en,
  description_id,
  image_desktop_en,
  image_desktop_id,
  image_mobile_en,
  image_mobile_id,
  small_title_en,
  small_title_id,
  title_en,
  title_id,
  className,
  alt_text_image_desktop_en,
  alt_text_image_desktop_id,
  alt_text_image_mobile_en,
  alt_text_image_mobile_id
}: MetaCover & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <Jumbotron
        bg={assetUrl(
          getLocalizedContent(locale, image_desktop_id, image_desktop_id)
        )}
        bgMobile={assetUrl(
          getLocalizedContent(locale, image_mobile_id, image_mobile_id)
        )}
        className={className}
        alt={getLocalizedContent(
          locale,
          alt_text_image_desktop_en,
          alt_text_image_desktop_id
        )}
        altMobile={getLocalizedContent(
          locale,
          alt_text_image_mobile_en,
          alt_text_image_mobile_id
        )}
      >
        <JumbotronContent
          label={getLocalizedContent(locale, small_title_en, small_title_id)!}
          title={getLocalizedContent(locale, title_en, title_id)!}
          text={getLocalizedContent(locale, description_en, description_id)!}
          shadowClassName="bg-oxford-blue"
        />
      </Jumbotron>
    </>
  )
}
