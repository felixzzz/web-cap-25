"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import { useRef } from "react"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import clsx from "clsx"
import { imgBgGrowth1, imgBgGrowth2 } from "@/data/images"
import Image from "next/image"
import Anim from "@/components/global/Anim"
import { MetaAboutMilestone } from "@/lib/fragment"
import { useLocale } from "next-intl"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
const milestones: any = [
  {
    year: "1992",
  },
  { year: "1993" },
  { year: "1995" },
  { year: "2003" },
  { year: "2006" },
  { year: "2009" },
  { year: "2012" },
  { year: "2013" },
]

export default function WhoWeAreMilestone({
  list_en,
  list_id,
  small_title_en,
  small_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaAboutMilestone) {
  const locale = useLocale()
  const navigationNextRef = useRef(null)
  const navigationPrevRef = useRef(null)

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">
            <div class="text-white lg:pl-8 lg:text-3xl font-bold pt-[11px] pl-0 lg:pt-[10px]">${getLocalizedContent(locale, list_en, list_id)[index]?.year}</div>
        </span>`
    },
  }

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="clip-r relative overflow-clip pt-[30px] lg:pt-[114px]">
        <div className="container">
          <Anim>
            <div className="text-xs font-semibold uppercase tracking-[0.96px] text-gray">
              {getLocalizedContent(locale, small_title_en, small_title_id)}
            </div>
            <div className="mb-6 text-lg font-bold lg:mb-8 lg:text-3xl">
              {getLocalizedContent(locale, title_en, title_id)}
            </div>
          </Anim>
        </div>
        <div className="relative hidden lg:block">
          <Anim>
            <Swiper
              direction={"vertical"}
              pagination={pagination}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper: any) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current
                swiper.params.navigation.nextEl = navigationNextRef.current
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper max-h-[583px]"
            >
              {getLocalizedContent(locale, list_en, list_id)?.map(
                (item, indexItem) => (
                  <SwiperSlide
                    className="relative overflow-hidden"
                    key={item.year}
                  >
                    <div className="container pt-[114px] lg:pl-20 lg:pt-[56px]">
                      <div className="text-xl font-bold lg:text-5xl">
                        {item?.year}
                      </div>
                      <div
                        className="prose mt-4 max-w-[542px]"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute -right-4 top-[220px] rounded-3xl object-cover lg:-right-[40px] lg:top-[370px] xl:top-[0px]",
                        indexItem % 2 === 0 &&
                          "right-[40px] lg:bottom-[-30px] lg:right-[100px] lg:top-[unset] xl:top-[unset]"
                      )}
                    >
                      {item?.image1 && (
                        <Anim delay={200}>
                          <Image
                            className="rounded-3xl object-cover max-xl:ml-auto max-xl:max-w-[55%]"
                            src={assetUrl(item?.image1) || ""}
                            width={413}
                            height={275}
                            alt={item?.alt_text1}
                          />
                        </Anim>
                      )}
                    </div>

                    {item?.image2 && (
                      <Anim delay={500}>
                        <Image
                          className={cn(
                            "absolute -bottom-[300px] left-[42px] aspect-[3/2] max-w-[100px] rounded-2xl object-cover lg:bottom-[-300px] lg:left-auto lg:right-[400px] lg:aspect-auto lg:max-w-full lg:rounded-3xl",
                            indexItem % 2 === 0 &&
                              "!left-[unset] !right-[-20px] top-[-100px]"
                          )}
                          src={assetUrl(item?.image2) || ""}
                          width={255}
                          height={170}
                          alt={item?.alt_text2}
                        />
                      </Anim>
                    )}
                  </SwiperSlide>
                )
              )}
              <ChevronLeftCircle
                color="white"
                size={48}
                className={clsx("swiper-button-prev")}
                ref={navigationPrevRef}
              />
              <ChevronRightCircle
                color="white"
                size={48}
                className="swiper-button-next"
                ref={navigationNextRef}
              />
            </Swiper>
          </Anim>
        </div>
        <div className="relative block lg:hidden">
          <Anim>
            <Swiper
              direction={"horizontal"}
              pagination={pagination}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper: any) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current
                swiper.params.navigation.nextEl = navigationNextRef.current
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {getLocalizedContent(locale, list_en, list_id)?.map(
                (item, indexItem) => (
                  <SwiperSlide
                    className="relative overflow-hidden"
                    key={item.year}
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`container py-8 ${isActive ? 'block' : 'hidden'}`}>
                          <div className="text-xl font-bold lg:text-5xl">
                            {item?.year}
                          </div>
                          <div
                            className="prose mt-4 max-w-[542px]"
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute -right-4 top-[220px] rounded-3xl object-cover lg:-right-[40px] lg:top-[370px] xl:top-[0px]",
                            indexItem % 2 === 0 &&
                              "right-[40px] lg:bottom-[-30px] lg:right-[100px] lg:top-[unset] xl:top-[unset]"
                          )}
                        >
                          {item?.image1 && (
                            <Anim delay={200}>
                              <Image
                                className="rounded-3xl object-cover max-xl:ml-auto max-xl:max-w-[55%]"
                                src={assetUrl(item?.image1) || ""}
                                width={413}
                                height={275}
                                alt=""
                              />
                            </Anim>
                          )}
                        </div>
    
                        {item?.image2 && (
                          <Anim delay={500}>
                            <Image
                              className={cn(
                                "absolute -bottom-[300px] left-[42px] aspect-[3/2] max-w-[100px] rounded-2xl object-cover lg:bottom-[-300px] lg:left-auto lg:right-[400px] lg:aspect-auto lg:max-w-full lg:rounded-3xl",
                                indexItem % 2 === 0 &&
                                  "!left-[unset] !right-[-20px] top-[-100px]"
                              )}
                              src={assetUrl(item?.image2) || ""}
                              width={255}
                              height={170}
                              alt=""
                            />
                          </Anim>
                        )}
                      </>
                    )}
                  </SwiperSlide>
                )
              )}
              <ChevronLeftCircle
                color="white"
                size={48}
                className={clsx("swiper-button-prev")}
                ref={navigationPrevRef}
              />
              <ChevronRightCircle
                color="white"
                size={48}
                className="swiper-button-next"
                ref={navigationNextRef}
              />
            </Swiper>
          </Anim>
        </div>
      </section>
    </>
  )
}
