"use client"

import { Post } from "@/lib/fragment"
import { Swiper, SwiperSlide } from "swiper/react"
import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { useLocale, useTranslations } from "next-intl"
import { assetUrl, dateFormater } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Prop = {
  data: Post[]
}

export default function EsgDetailOther({ data }: Prop) {
  const locale = useLocale()
  const t = useTranslations("global")

  return (
    <section className="bg-surface">
      <div className="clip-r container overflow-clip py-6 lg:py-[80px]">
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
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              <div key={i}>
                <Card
                  href={`/${locale}/sustainability/sustainability-in-action/${item?.slug}`}
                >
                  <CardImage
                    className="rounded-2xl"
                    img={assetUrl(item?.image)!}
                  />
                  <CardContent
                    label={
                      item?.published_at && dateFormater(item?.published_at)
                    }
                    title={item?.title}
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
          ))}
        </Swiper>
      </div>
    </section>
  )
}
