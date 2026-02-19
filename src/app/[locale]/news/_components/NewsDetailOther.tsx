"use client"

import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { Button } from "@/components/ui/button"
import { PostNews } from "@/lib/fragment"
import { assetUrl, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { Swiper, SwiperSlide } from "swiper/react"

export default function NewsDetailOther({ data }: { data?: PostNews[] }) {
  const locale = useLocale()
  const t = useTranslations("global")

  return (
    <section className="bg-surface">
      <div className="clip-r mx-auto w-full max-w-[1600px] overflow-clip px-4 py-6 lg:py-[80px]">
        <div className="text-xl font-bold">{t("read_other_news")}</div>
        <Swiper
          direction="horizontal"
          breakpoints={{
            320: {
              slidesPerView: 1.15,
              spaceBetween: 16,
            },
            368: {
              slidesPerView: 1.15,
              spaceBetween: 16,
            },
            420: {
              slidesPerView: 1.15,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.1,
              spaceBetween: 16,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          spaceBetween={8}
          slidesPerView={"auto"}
          className="mt-6 !overflow-visible"
        >
          {data?.map((item, i) => {
            const en_slug = item?.slug_en !== null ? item?.slug_en : item?.slug
            return (
              <SwiperSlide key={i}>
                <div key={i}>
                  <Card
                    href={`/${locale}/news/${getLocalizedContent(locale, en_slug, item.slug)}`}
                  >
                    <CardImage
                      className="rounded-2xl"
                      img={assetUrl(item.image)!}
                      alt={getLocalizedContent(
                        locale,
                        item.alt_image_en,
                        item.alt_image
                      )}
                    />
                    <CardContent
                      label={
                        item.published_at && dateFormater(item.published_at)
                      }
                      title={getLocalizedContent(
                        locale,
                        item.title_en,
                        item.title
                      )}
                    >
                      <Button
                        variant={"link"}
                        className="min-w-0 px-0 group-hover:underline"
                      >
                        {t("read_more")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
