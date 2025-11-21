"use client"

import LoadingVertical from "@/components/anti/LoadingVertical"
import { iconNextBlue, imgVectorExploreMore } from "@/data/images"
import { useCustomNavSwiper } from "@/hooks/useCustomNavSwiper"
import { Post } from "@/lib/fragment"
import { cn, dateFormater, getLocalizedContent } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

type NewsHeaderProps = {
  featuredPost: Post[]
  tab: string
}

export default function NewsHeader({ featuredPost }: NewsHeaderProps) {
  const locale = useLocale()
  const t = useTranslations("global")
  const swiperRef = useRef<SwiperRef>(null)
  const { handleNext, handlePrev, allowSlidePrev, allowSlideNext, index } =
    useCustomNavSwiper(swiperRef)

  return (
    <section className="relative bg-surface py-8 lg:min-h-[700px] lg:pb-[80px] lg:pt-[56px]">
      <div className="container">
        <Swiper ref={swiperRef} slidesPerView={1} className="mb-8 max-md:mb-6">
          {featuredPost.map(
            ({
              id,
              image,
              meta,
              slug,
              slug_en,
              title,
              title_en,
              published_at,
              type,
              alt_image,
              alt_image_en,
            }) => {
              const en_slug = slug_en !== null ? slug_en : slug
              return (
                <SwiperSlide key={id}>
                  <div className="text-xl font-bold lg:text-5xl">
                    {type === "news" ? t("news") : "Blog"}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-x-20">
                    <div className="relative flex aspect-[27/20] flex-shrink-0 rounded-3xl">
                      {image && (
                        <Image
                          src={image}
                          className="rounded-3xl object-cover"
                          alt={
                            getLocalizedContent(
                              locale,
                              alt_image_en,
                              alt_image
                            ) || ""
                          }
                          fill
                          onError={(event: any) => {
                            event.target.id = "/img/common/img_default-news.jpg"
                            event.target.srcset =
                              "/img/common/img_default-news.jpg"
                          }}
                        />
                      )}
                    </div>
                    <div className="my-auto flex max-w-[566px] flex-shrink-0 flex-col content-center">
                      {published_at && (
                        <div className="text-sm font-semibold uppercase tracking-[0.8px] text-gray lg:text-md">
                          {dateFormater(published_at)}
                        </div>
                      )}
                      <Link
                        href={`/${locale}/${type === "news" ? "news" : "blog"}/${getLocalizedContent(locale, en_slug, slug)}`}
                      >
                        <h3 className="mt-2 text-lg font-bold lg:text-xl">
                          {getLocalizedContent(locale, title_en, title)}
                        </h3>
                      </Link>
                      <div className="mt-4 line-clamp-3 overflow-ellipsis text-sm lg:text-md">
                        {getLocalizedContent(
                          locale,
                          meta?.seo_meta?.meta_desc_en || "",
                          meta?.seo_meta?.meta_desc_id || ""
                        )}
                      </div>
                      {slug && (
                        <Link
                          href={`/${locale}/${type === "news" ? "news" : "blog"}/${getLocalizedContent(locale, en_slug, slug)}`}
                          className="mt-4 flex gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline"
                        >
                          Read more{" "}
                          <Image
                            className="my-auto"
                            src={iconNextBlue}
                            alt=""
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              )
            }
          )}
        </Swiper>
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-y-6">
          <div className="flex gap-x-2">
            {featuredPost.map((_, key) => (
              <div
                key={key}
                className={cn("h-1 w-6 rounded-full", {
                  "bg-[#1A1A1A1A]": index !== key,
                  "bg-blue-tint": index === key,
                })}
              />
            ))}
          </div>
          <div className="mr-16 flex gap-x-4 max-md:mr-0">
            <button
              className={cn("h-10 w-10 rounded-full p-2", {
                "border border-blue-tint border-opacity-40": !allowSlidePrev,
                "bg-blue-tint": allowSlidePrev,
              })}
              onClick={handlePrev}
            >
              <ArrowLeft
                width={24}
                height={24}
                color={allowSlidePrev ? "#FFFFFF" : "#337ABC"}
                opacity={allowSlidePrev ? 1 : 0.4}
              />
            </button>
            <button
              className={cn("h-10 w-10 rounded-full p-2", {
                "bg-blue-tint": allowSlideNext,
                "border border-blue-tint border-opacity-40": !allowSlideNext,
              })}
              onClick={handleNext}
            >
              <ArrowRight
                width={24}
                height={24}
                color={allowSlideNext ? "#FFFFFF" : "#337ABC"}
                opacity={allowSlideNext ? 1 : 0.4}
              />
            </button>
          </div>
        </div>
      </div>
      <LoadingVertical
        containerClass="hidden lg:block"
        loadingLineClassName="bg-[#1A1A1A4D]"
        firstInnerClassName="bg-[#1A1A1A]"
        secondInnerClassName="bg-[#1A1A1A]"
      />
    </section>
  )
}
