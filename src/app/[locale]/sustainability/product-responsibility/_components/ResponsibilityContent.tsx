import React from "react"
import { ImageContentBlock } from "@/components/block/ContentLeftRightBlock"
import { getLocalizedContent, isContentActive, assetUrl } from "@/lib/utils"
import { useLocale } from "next-intl"
import { MetaContentLeftRight } from "@/lib/fragment"

export default function ResponsibilityContent({
  status_en,
  status_id,
  list_id,
  list_en,
}: MetaContentLeftRight) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const listing = getLocalizedContent(locale, list_en, list_id)
  return (
    <div className="pb-9">
      {listing.map((res, i) => {
        return (
          <>
            {res.status === "active" && (
              <ImageContentBlock
                img={assetUrl(res.image)}
                title={res?.title || ""}
                text={res.description}
                key={i}
                reverse={res?.image_position === "right"}
                className="lg:py-16"
              />
            )}
          </>
        )
      })}
    </div>
  )
}
