"use client"

import { ScrambleText } from "@/components/block/InNumbers"
import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { imgVectorJourney, imgVectorJourneyMobile } from "@/data/images"
import { MetaHomeInNumbers } from "@/lib/fragment"
import { getLocalizedContent, isContentActive, isFullUrl } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function HomeJourneyGrowth({
  title_en,
  title_id,
  cta_label2_en,
  cta_label2_id,
  cta_label_en,
  cta_label_id,
  cta_url2_en,
  cta_url2_id,
  cta_url_en,
  cta_url_id,
  description_en,
  description_id,
  numbers_en,
  numbers_id,
  status_en,
  status_id,
}: MetaHomeInNumbers) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="relative bg-tertiary">
        <div className="container z-10 py-8 lg:pb-[167px] lg:pt-[116px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <Anim>
              <div className="max-w-[517px]">
                <div className="mt-2 text-xl font-bold text-white lg:text-4xl">
                  {getLocalizedContent(locale, title_en, title_id)}
                </div>
                <div
                  className="prose mt-2 text-md text-white/70 lg:text-[18px] lg:leading-[27px]"
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
            <div className="relative z-[10] w-full max-w-[580px]">
              <Anim>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {getLocalizedContent(locale, numbers_en, numbers_id)?.map(
                    (item) => (
                      <div key={item.title} className="flex flex-col">
                        <ScrambleText text={item.title} />
                        <div className="mt-2 text-sm tracking-[0.16px] text-white lg:text-md">
                          {item.small_title}
                        </div>
                      </div>
                    )
                  )}
                  <div className="relative z-10 col-span-2 flex flex-row gap-x-4 lg:gap-x-6">
                    <Button
                      className="w-full lg:max-w-[148px]"
                      variant="outline"
                      asChild
                    >
                      <Link
                        href={
                          getLocalizedContent(locale, cta_url_en, cta_url_id) ||
                          ""
                        }
                        target={
                          isFullUrl(
                            getLocalizedContent(locale, cta_url_en, cta_url_id)
                          )
                            ? "_blank"
                            : "_self"
                        }
                      >
                        {getLocalizedContent(
                          locale,
                          cta_label_en,
                          cta_label_id
                        )}
                      </Link>
                    </Button>
                    <Button
                      className="w-full lg:max-w-[148px]"
                      variant="outline"
                      asChild
                    >
                      <Link
                        href={
                          getLocalizedContent(
                            locale,
                            cta_url2_en,
                            cta_url2_id
                          ) || ""
                        }
                        target={
                          isFullUrl(
                            getLocalizedContent(
                              locale,
                              cta_url2_en,
                              cta_url2_id
                            )
                          )
                            ? "_blank"
                            : "_self"
                        }
                      >
                        {getLocalizedContent(
                          locale,
                          cta_label2_en,
                          cta_label2_id
                        )}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Anim>
            </div>
          </div>
        </div>
        <Image
          src={imgVectorJourneyMobile}
          className="absolute bottom-0 z-0 block w-full lg:hidden"
          alt=""
        />
        <Image
          src={imgVectorJourney}
          className="absolute bottom-0 z-0 hidden w-full lg:block"
          alt=""
        />
      </section>
      {/* <section className="clip-r container relative block overflow-clip pb-[25px] pt-8 lg:hidden">
        <div className="my-auto max-w-[420px] text-xl font-bold lg:text-3xl">
          We recognize the profound impact businesses can have on society and
          the environment
        </div>
        <div className="mt-2 text-md tracking-[0.16px]">
          That&apos;s why we are proud to embrace Environmental, Social, and
          Governance (ESG) principles as a fundamental part of our corporate
          identity.
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button variant="outline-primary">
            <div className="flex flex-row gap-2">
              <Image src={iconNotebook} width={20} height={20} alt="" />
              <div className="my-auto">Our Infrastructure Solutions</div>
            </div>
          </Button>
          <Button variant="outline-primary">
            <div className="flex flex-row gap-2">
              <Image src={iconNotepad} width={20} height={20} alt="" />
              <div className="my-auto">Check Sustainability Publication</div>
            </div>
          </Button>
        </div>
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
          }}
          spaceBetween={8}
          slidesPerView={"auto"}
          className="mt-6 block !overflow-visible lg:!hidden"
        >
          {[...Array(4)].map((x, i) => (
            <SwiperSlide key={i}>
              <Link href="/" className="flex flex-col">
                <Image
                  src={imgTempCardMobile}
                  width={264}
                  height={272}
                  className="w-full"
                  alt=""
                />
                <div className="mt-4 text-md font-bold">
                  Environmental Stewardship
                </div>
                <div className="mt-2 text-xs">
                  We are committed to minimizing our ecological footprint and
                  driving positive environmental change.
                </div>
                <div className="mt-2 flex text-sm font-bold text-primary">
                  Read more
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}
    </>
  )
}
