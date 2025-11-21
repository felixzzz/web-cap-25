import {
  ImageContentLeft,
  ImageContentRight,
  ImageContentWrapper,
} from "@/components/block/ContentLeftRightBlock"
import { imgTempCardItem } from "@/data/images"
import { MetaIntro } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function EnvironmentClimate({
  description_en,
  description_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaIntro) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative py-12 lg:py-24">
        <div className="container">
          <ImageContentWrapper className="gap-6">
            <ImageContentLeft>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={
                    assetUrl(getLocalizedContent(locale, image_id, image_id))!
                  }
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </ImageContentLeft>
            <ImageContentRight>
              <div className="flex h-full items-center justify-center">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">
                    {getLocalizedContent(locale, title_en, title_id)}
                  </h3>
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
              </div>
            </ImageContentRight>
          </ImageContentWrapper>
        </div>
      </div>
    </>
  )
}
