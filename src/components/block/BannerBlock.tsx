"use client"
import { Jumbotron, JumbotronContent } from "@/components/global/Jumbotron"
import { MetaCover } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

type BannerBlockProps = {
  hideLoadingVertical?: boolean
}

export function BannerBlock({
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
  children,
  hideLoadingVertical,
  alt_text_image_desktop_en,
  alt_text_image_desktop_id,
  alt_text_image_mobile_en,
  alt_text_image_mobile_id
}: MetaCover & React.HTMLAttributes<HTMLDivElement> & BannerBlockProps) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <div className="py-8"></div>
  }

  return (
    <>
      <Jumbotron
        bg={assetUrl(
          getLocalizedContent(locale, image_desktop_en, image_desktop_id)
        )}
        bgMobile={assetUrl(
          getLocalizedContent(locale, image_mobile_id, image_mobile_id)
        )}
        className={className}
        hideLoadingVertical={hideLoadingVertical}
        alt={getLocalizedContent(
          locale,
          alt_text_image_desktop_id,
          alt_text_image_desktop_en
        )}
        altMobile={getLocalizedContent(
          locale,
          alt_text_image_mobile_id,
          alt_text_image_mobile_en
        )}
      >
        <JumbotronContent
          label={getLocalizedContent(locale, small_title_en, small_title_id)}
          title={getLocalizedContent(locale, title_en, title_id)}
          text={getLocalizedContent(locale, description_en, description_id)}
          shadowClassName="bg-black"
        />
        {children}
      </Jumbotron>
    </>
  )
}
