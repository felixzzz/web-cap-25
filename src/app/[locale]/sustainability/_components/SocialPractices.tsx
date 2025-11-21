import { mockDescription } from "@/components/block/mock"
import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { imgTempCardItem } from "@/data/images"
import { MetaPoint, MetaSmallBanner } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import React from "react"

export function SocialPractices({
  status_en,
  status_id,
  title_en,
  title_id,
  list_poin_en,
  list_poin_id,
  description_en,
  description_id,
  small_description_id,
  small_description_en,
}: MetaPoint) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="bg-slate-50 py-10 lg:py-14">
      <div className="container">
        <h2 className="mb-4 max-w-lg text-balance text-2xl font-bold">
          {getLocalizedContent(locale, title_en, title_id)}
        </h2>

        <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          ></div>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {getLocalizedContent(locale, list_poin_en, list_poin_id)?.map(
            (item, i) => (
              <Card key={i}>
                <CardImage img={`${assetUrl(item.image)}`} />
                <CardContent title={item.title} text={item.description} />
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  )
}
