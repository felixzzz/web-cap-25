"use client"

import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { iconNextBlue, imgDefaultNews } from "@/data/images"
import { MetaHomeNews, MetaNewsDetail, NewsCategory } from "@/lib/fragment"
import {
  assetUrl,
  dateFormater,
  getLocalizedContent,
  isContentActive,
} from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function HomeDiscovery({
  section_title_en,
  section_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
  categories,
  news,
}: MetaHomeNews & { categories: NewsCategory[]; news: MetaNewsDetail[] }) {
  const locale = useLocale()
  const t = useTranslations("global")

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <section className="relative bg-white">
      <div className="clip-r container overflow-clip pb-2 pt-6 lg:pb-[108px]">
        <div className="flex flex-col lg:justify-between">
          <Anim>
            <div className="text-xs font-medium uppercase tracking-[0.9px] text-gray lg:text-xs">
              {getLocalizedContent(locale, section_title_en, section_title_id)}
            </div>
            <div className="mt-2 flex flex-col justify-between lg:flex-row">
              <div className="my-auto max-w-[420px] text-xl font-bold lg:text-3xl">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
              <Link
                className="mt-3 lg:ml-auto lg:mt-0"
                href={`/${locale}/news`}
                target="_self"
              >
                <div className="flex ">
                  <div className="my-auto text-nowrap text-sm font-bold text-primary lg:text-md">
                    {t("see_all")}
                  </div>
                  <Image className="my-auto ml-3" src={iconNextBlue} alt="" />
                </div>
              </Link>
            </div>
            <div className="no-scrollbar -mr-4 mt-6 flex flex-row overflow-scroll lg:mr-0 lg:mt-12">
              {news?.[0] && (
                <div className="w-[301px] flex-shrink-0 pr-2 lg:w-6/12 lg:pr-4">
                  <Link href={`/${locale}/news/${news?.[0].slug}`}>
                    <div className="relative flex h-[421px] flex-col justify-end rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/70 px-5 py-8 lg:h-[741px] lg:rounded-3xl lg:p-10">
                      <div className="flex w-full justify-start text-left text-xs font-semibold uppercase tracking-[1.4px] text-white/70 lg:text-sm">
                        {dateFormater(news?.[0]?.created_at, "dd-MMM-yyyy")}
                      </div>
                      <div className="mt-2 text-lg font-bold text-white lg:text-2xl">
                        {getLocalizedContent(
                          locale,
                          news?.[0].title_en,
                          news?.[0].title
                        )}
                      </div>
                      <Image
                        className="absolute left-0 top-0 -z-10 h-full w-full rounded-2xl object-cover lg:rounded-3xl"
                        src={assetUrl(news?.[0].image) || imgDefaultNews}
                        alt={
                          getLocalizedContent(
                            locale,
                            news?.[0].title_en,
                            news?.[0].title
                          ) || ""
                        }
                        onError={(event: any) => {
                          event.target.id = "/img/common/img_default-news.jpg"
                          event.target.srcset =
                            "/img/common/img_default-news.jpg"
                        }}
                        width={627}
                        height={741}
                      />
                    </div>
                  </Link>
                </div>
              )}
              <div className="mr-4 mt-auto flex w-[301px] flex-shrink-0 flex-col pl-2 md:mt-0 lg:mr-0 lg:w-6/12 lg:pl-4">
                {news?.[1] && (
                  <Link href={`/${locale}/news/${news?.[1].slug}`}>
                    <div className="relative flex h-[301px] flex-col justify-end rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/70 px-5 py-8 lg:h-[551px] lg:rounded-3xl lg:p-10">
                      <div className="flex w-full justify-start text-left text-xs font-semibold uppercase tracking-[1.4px] text-white/70 lg:text-sm">
                        {dateFormater(news?.[1]?.created_at, "dd-MMM-yyyy")}
                      </div>
                      <div className="mt-2 text-lg font-bold text-white lg:text-2xl">
                        {getLocalizedContent(
                          locale,
                          news?.[1].title_en,
                          news?.[1].title
                        )}
                      </div>
                      <Image
                        className="absolute left-0 top-0 -z-10 h-full w-full rounded-3xl object-cover"
                        src={assetUrl(news?.[1].image) || imgDefaultNews}
                        width={613}
                        height={551}
                        alt={
                          getLocalizedContent(
                            locale,
                            news?.[1].title_en,
                            news?.[1].title
                          ) || ""
                        }
                        onError={(event: any) => {
                          event.target.id = "/img/common/img_default-news.jpg"
                          event.target.srcset =
                            "/img/common/img_default-news.jpg"
                        }}
                      />
                    </div>
                  </Link>
                )}
                {categories?.length > 0 && (
                  <div className="mt-10 hidden lg:block">
                    <div className="text-xl font-bold">
                      {t("browse_selected_topics")}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                      {categories?.map((category) => (
                        <Button
                          key={category.id}
                          className="capitalize"
                          variant="outline-blue"
                        >
                          <Link
                            href={`/${locale}/news?categories[]=${category.id}`}
                          >
                            {getLocalizedContent(
                              locale,
                              category.name_en,
                              category.name
                            )}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {categories?.length > 0 && (
              <div className="mt-6 block lg:hidden">
                <div className="text-[18px] font-bold">
                  {t("browse_selected_topics")}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {categories?.map((category) => (
                    <Button
                      key={category.id}
                      className="capitalize"
                      variant="outline-blue"
                    >
                      <Link
                        href={`/${locale}/news?category=${getLocalizedContent(locale, category.slug_en, category.slug)}`}
                      >
                        {getLocalizedContent(
                          locale,
                          category.name_en,
                          category.name
                        )}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Anim>
        </div>
      </div>
    </section>
  )
}
