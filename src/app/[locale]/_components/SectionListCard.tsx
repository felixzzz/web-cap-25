"use client"

import Anim from "@/components/global/Anim"
import { CardItem } from "@/components/global/CardItem"
import { MetaHomeIntro } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import { Swiper, SwiperSlide } from "swiper/react"

export default function SectionListCard({
  discover_en,
  discover_id,
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  label_discover_id,
  label_discover_en,
}: MetaHomeIntro) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className="container overflow-clip pb-5 pt-6 lg:py-20">
      <Anim>
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-6 max-md:mb-5">
          <div className="mb-auto font-bold lg:block lg:text-5xl max-md:text-xl">
            {getLocalizedContent(locale, title_en, title_id)}
          </div>
          {getLocalizedContent(
            locale,
            label_discover_en,
            label_discover_id
          ) && (
            <div className="text-xl font-bold hidden">
              {getLocalizedContent(
                locale,
                label_discover_en,
                label_discover_id
              )}
            </div>
          )}
          <div
            className="prose max-w-[691px] text-md tracking-[0.16px]"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          />
        </div>
      </Anim>
      <Anim delay={300}>
        <div className="mt-6 hidden grid-cols-1 gap-6 lg:mt-12 lg:grid lg:grid-cols-4">
          {getLocalizedContent(
            locale,
            label_discover_en,
            label_discover_id
          ) && (
            <div className="col-span-1 lg:col-span-4">
              <div className="text-xl font-bold text-gray">
                {getLocalizedContent(
                  locale,
                  label_discover_en,
                  label_discover_id
                )}
              </div>
            </div>
          )}
          {getLocalizedContent(locale, discover_en, discover_id)?.map(
            (item, indexItem) => (
              <div key={`discover-the-latest-card-${indexItem}`}>
                <CardItem
                  href={item.url}
                  title={item.title}
                  desc={item.subtitle}
                  classNameDesc="lg:text-sm"
                  bg={assetUrl(item.image)}
                  alt=""
                />
              </div>
            )
          )}
        </div>
      </Anim>
      <Anim delay={300}>
        <div className="text-xl font-bold text-gray lg:hidden">
          {getLocalizedContent(
            locale,
            label_discover_en,
            label_discover_id
          )}
        </div>
        <Swiper
          direction="horizontal"
          breakpoints={{
            320: {
              slidesPerView: 1.15,
              spaceBetween: 24,
            },
            368: {
              slidesPerView: 1.15,
              spaceBetween: 24,
            },
            420: {
              slidesPerView: 1.15,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.1,
              spaceBetween: 24,
            },
          }}
          spaceBetween={8}
          slidesPerView={"auto"}
          className="mt-6 block !overflow-visible lg:!hidden"
        >
          {getLocalizedContent(locale, discover_en, discover_id)?.map(
            (item, i) => (
              <SwiperSlide key={`discover-the-latest-card-mobile-${i}`}>
                <CardItem
                  href={item.url}
                  title={item.title}
                  desc={item.subtitle}
                  bg={assetUrl(item.image)}
                  cta_label="Lihat Detail"
                  alt=""
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Anim>
    </div>
  )
}
