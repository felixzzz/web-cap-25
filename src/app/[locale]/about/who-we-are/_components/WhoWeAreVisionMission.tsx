"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { imgTempAboutChandraAsri, imgTempAboutVision } from "@/data/images"
import { MetaAboutVissionMission } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function WhoWeAreVisionMission({
  mision_description_en,
  mision_description_id,
  mision_image_en,
  mision_image_id,
  mision_title_en,
  mision_title_id,
  status_en,
  status_id,
  vision_description_en,
  vision_description_id,
  vission_title_en,
  vission_title_id,
  visson_image_en,
  visson_image_id,
  alt_text_mission_en,
  alt_text_mission_id,
  alt_text_vission_en,
  alt_text_vission_id,
}: MetaAboutVissionMission) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }
  return (
    <>
      <section className="bg-white py-8 lg:pb-[100px] lg:pt-20">
        <div className="container">
          <Anim>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
              <div className="my-auto w-full lg:w-5/12">
                <div className="text-md font-bold uppercase text-gray lg:text-lg">
                  {getLocalizedContent(
                    locale,
                    vission_title_en,
                    vission_title_id
                  )}
                </div>
                <div
                  className="prose mt-4 max-w-[503px] text-lg !leading-[140%] lg:text-3xl"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      vision_description_en,
                      vision_description_id
                    ),
                  }}
                />
              </div>
              <div className="w-full lg:w-2/12"></div>
              <div className="w-full lg:w-3/12">
                <AspectRatio ratio={1 / 1} className="mb-4">
                  <Image
                    src={
                      assetUrl(
                        getLocalizedContent(
                          locale,
                          visson_image_id,
                          visson_image_id
                        )
                      ) || ""
                    }
                    alt={getLocalizedContent(locale, alt_text_vission_en, alt_text_vission_id)}
                    fill
                    className="rounded-3xl object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </Anim>
          <Anim>
            <div className="mt-8 flex flex-col gap-4 lg:mt-20 lg:flex-row-reverse lg:gap-0">
              <div className="my-auto w-full lg:w-6/12">
                <div className="text-md font-bold uppercase text-gray lg:text-lg">
                  {getLocalizedContent(
                    locale,
                    mision_title_en,
                    mision_title_id
                  )}
                </div>
                <div
                  className="prose mt-4 max-w-[628px] text-lg !leading-[140%] lg:text-3xl"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      mision_description_en,
                      mision_description_id
                    ),
                  }}
                />
              </div>
              <div className="w-full lg:w-1/12"></div>
              <div className="w-full lg:w-5/12">
                <AspectRatio ratio={1 / 1} className="mb-4">
                  <Image
                    src={
                      assetUrl(
                        getLocalizedContent(
                          locale,
                          mision_image_id,
                          mision_image_id
                        )
                      ) || ""
                    }
                    alt={getLocalizedContent(locale, alt_text_mission_en, alt_text_mission_id)}
                    fill
                    className="rounded-3xl object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </Anim>
        </div>
      </section>
    </>
  )
}
