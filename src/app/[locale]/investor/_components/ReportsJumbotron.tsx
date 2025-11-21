"use client"

import { Jumbotron, JumbotronContent } from "@/components/global/Jumbotron"
import { imgBgAboutManagement } from "@/data/images"
import { MetaCover } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export function ReportsJumbotron({
  description_en,
  description_id,
  image_desktop_en,
  image_desktop_id,
  image_mobile_en,
  image_mobile_id,
  small_title_en,
  small_title_id,
  status_en,
  status_id,
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
        bg={assetUrl(image_desktop_id)!}
        bgMobile={assetUrl(image_mobile_id)}
        className="aspect-[4/3] min-h-[210px] w-full lg:!aspect-[3/1] lg:!min-h-[480px]"
        hideLoadingVertical
        alt={
          getLocalizedContent(
            locale,
            alt_text_image_desktop_en,
            alt_text_image_desktop_id
        )}
        altMobile={
          getLocalizedContent(
            locale,
            alt_text_image_mobile_en,
            alt_text_image_mobile_id
        )}
      >
        <JumbotronContent
          title={getLocalizedContent(locale, title_en, title_id)!}
          shadowClassName="bg-[#113545]"
        ></JumbotronContent>
      </Jumbotron>
    </>
  )
}
