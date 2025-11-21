"use client"

import { Jumbotron, JumbotronContent } from "@/components/global/Jumbotron"
import { MetaCover } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function SectionJumbotron({
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
  cta_label_id,
  cta_label_en,
  cta_url_en,
  cta_url_id,
  vide_en,
  vide_id,
  alt_text_image_desktop_id,
  alt_text_image_desktop_en,
  alt_text_image_mobile_en,
  alt_text_image_mobile_id,
  logo_en,
  logo_id,
  alt_text_logo_en,
  alt_text_logo_id,
}: MetaCover &
  React.HTMLAttributes<HTMLDivElement> & {
    cta_label_id?: string
    cta_label_en?: string
    cta_url_en?: string
    cta_url_id?: string
  }) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <Jumbotron
      bg={assetUrl(
        getLocalizedContent(locale, image_desktop_id, image_desktop_id)
      )}
      bgMobile={assetUrl(
        getLocalizedContent(locale, image_mobile_id, image_mobile_id)
      )}
      video={getLocalizedContent(locale, vide_id?.path, vide_id?.path)}
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
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-[90px]">
        <JumbotronContent
          label={getLocalizedContent(locale, small_title_en, small_title_id)!}
          title={getLocalizedContent(locale, title_en, title_id)!}
          text={getLocalizedContent(locale, description_en, description_id)!}
          cta_label={getLocalizedContent(locale, cta_label_en, cta_label_id)}
          cta_url={getLocalizedContent(locale, cta_url_en, cta_url_id)}
          shadowClassName="bg-dark-blue"
          className="lg:col-start-1 lg:col-end-8 col-start-1 col-end-12"
        />
        { getLocalizedContent(locale, logo_en, logo_id) &&
          <div className="flex justify-center lg:col-start-8 lg:col-end-12 col-start-1 col-end-12">
            <div className="relative aspect-square size-52 lg:size-64 xl:size-[298px]">
              <Image
                src={
                  assetUrl(
                    getLocalizedContent(locale, logo_en, logo_id) || ""
                  ) || ""
                }
                alt={getLocalizedContent(
                  locale,
                  alt_text_image_desktop_en,
                  alt_text_image_desktop_id
                )}
                fill
                objectFit="contain"
                sizes="100vw"
              />
            </div>
          </div>
        }
      </div>
    </Jumbotron>
  )
}
