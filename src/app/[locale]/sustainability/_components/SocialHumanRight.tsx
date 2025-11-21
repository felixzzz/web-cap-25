import { Button } from "@/components/ui/button"
import { MetaSmallBannerSocial } from "@/lib/fragment"
import { MetaHumanRight } from "@/lib/types"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Link from "next/link"
import React from "react"

export default function SocialHumanRight({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  file_en,
  file_id,
  file_title_en,
  file_title_id,
  small_description_en,
  small_description_id,
}: MetaHumanRight) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="container pb-14">
        <h2 className="mb-4 text-xl font-bold">
          {getLocalizedContent(locale, title_en, title_id)}
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div
              className="prose text-sm"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            ></div>

            {getLocalizedContent(locale, file_en.path, file_id.path) &&
              getLocalizedContent(locale, file_title_en, file_title_id) && (
                <>
                  <Link
                    className="block py-5"
                    href={`${assetUrl(getLocalizedContent(locale, file_en.path, file_id.path))}`}
                    target="_blank"
                  >
                    <Button>
                      {getLocalizedContent(
                        locale,
                        file_title_en,
                        file_title_id
                      )}
                    </Button>
                  </Link>
                </>
              )}
          </div>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                small_description_en,
                small_description_id
              ),
            }}
          ></div>
        </div>
      </div>
    </>
  )
}
