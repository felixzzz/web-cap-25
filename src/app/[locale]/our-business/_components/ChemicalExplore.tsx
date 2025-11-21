import Anim from "@/components/global/Anim"
import { imgExplorePetrochemical } from "@/data/images"
import { MetaProductionFlow } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function ChemicalExplore({
  big_image_en,
  big_image_id,
  big_image2_en,
  big_image2_id,
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  alt_text_big_image2_en,
  alt_text_big_image2_id,
  alt_text_big_image_en,
  alt_text_big_image_id
}: MetaProductionFlow) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative py-16">
        <div className="container relative">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <Anim>
              <div>
                <h3 className="text-balance text-3xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </h3>
              </div>
              <div className="space-y-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                ></div>
              </div>
            </Anim>
          </div>
          <Anim>
            <div className="relative">
              {big_image_id && (
                <div className="relative aspect-[7/5]">
                  <Image
                    src={assetUrl(big_image_id)!}
                    fill
                    className="object-contain"
                    alt={getLocalizedContent(
                      locale,
                      alt_text_big_image_en,
                      alt_text_big_image_id
                    )}
                  />
                </div>
              )}

              {big_image2_id && (
                <div className="relative aspect-[7/5]">
                  <Image
                    src={assetUrl(big_image2_id)!}
                    fill
                    className="object-contain"
                    alt={getLocalizedContent(
                      locale,
                      alt_text_big_image2_en,
                      alt_text_big_image2_id
                    )}
                  />
                </div>
              )}
            </div>
          </Anim>
        </div>
      </div>
    </>
  )
}
