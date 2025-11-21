"use client"

import { Jumbotron, JumbotronContent } from "@/components/global/Jumbotron"
import { MetaCover } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function GovernanceJumbotron({
  status_en,
  status_id,
  image_desktop_en,
  image_desktop_id,
  image_mobile_en,
  image_mobile_id,
  title_en,
  title_id,
  alt_text_image_desktop_en,
  alt_text_image_desktop_id,
  alt_text_image_mobile_en,
  alt_text_image_mobile_id
}: MetaCover) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <Jumbotron
        bg={assetUrl(
          getLocalizedContent(locale, image_desktop_id, image_desktop_id)
        )}
        bgMobile={assetUrl(
          getLocalizedContent(locale, image_mobile_id, image_mobile_id)
        )}
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
          title={getLocalizedContent(locale, title_en, title_id)!}
          shadowClassName="bg-[#195A6F]"
        />
      </Jumbotron>
    </>
  )
}
