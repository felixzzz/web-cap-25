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

  const PLACEHOLDER_IMAGE = "images/post/temp-card-item.jpg"

  const getLocalizedImage = (locale: string, en: string | null, id: string | null) => {
    if (locale === "en") {
      return en && en !== PLACEHOLDER_IMAGE ? en : id
    }
    return id && id !== PLACEHOLDER_IMAGE ? id : en
  }

  const getLocalizedAlt = (locale: string, en: string | null, id: string | null) => {
    if (locale === "en") {
      return en || id
    }
    return id || en
  }

  return (
    <>
      <Jumbotron
        bg={assetUrl(getLocalizedImage(locale, image_desktop_en, image_desktop_id))}
        bgMobile={assetUrl(
          getLocalizedImage(locale, image_mobile_en, image_mobile_id)
        )}
        className={className}
        hideLoadingVertical={hideLoadingVertical}
        alt={getLocalizedAlt(
          locale,
          alt_text_image_desktop_en,
          alt_text_image_desktop_id
        )}
        altMobile={getLocalizedAlt(
          locale,
          alt_text_image_mobile_en,
          alt_text_image_mobile_id
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
