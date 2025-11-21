import {
  ImageContentBlock,
  ImageContentLeft,
  ImageContentRight,
  ImageContentWrapper,
} from "@/components/block/ContentLeftRightBlock"
import { Button } from "@/components/ui/button"
import { imgTempCardItem } from "@/data/images"
import { MetaImageText } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Link from "next/link"
import React from "react"

export default function GrievanceMecanism({
  cta_label_en,
  cta_label_id,
  cta_url_en,
  cta_url_id,
  description_en,
  description_id,
  image_en,
  image_id,
  small_label_en,
  small_label_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaImageText) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="relative py-10 lg:py-14">
      <ImageContentBlock
        img={assetUrl(image_id)}
        title={getLocalizedContent(locale, title_en, title_id)}
        text={getLocalizedContent(locale, description_en, description_id)}
      >
        <div className="space-y-2">
          <p className="mb-4 text-neutral-500">
            {getLocalizedContent(locale, small_label_en, small_label_id)}
          </p>
          {getLocalizedContent(locale, cta_label_en, cta_label_id) && (
            <Link
              target="_blank"
              href={`${getLocalizedContent(locale, cta_url_en, cta_url_id)}`}
            >
              <Button>
                {getLocalizedContent(locale, cta_label_en, cta_label_id)}
              </Button>
            </Link>
          )}
        </div>
      </ImageContentBlock>
    </section>
  )
}
