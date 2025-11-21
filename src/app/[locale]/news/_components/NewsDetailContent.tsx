"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SITE_URL } from "@/lib/constant"
import { PostNews } from "@/lib/fragment"
import { assetUrl, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function NewsDetailContent({
  data,
  path,
}: {
  data: PostNews
  path: string
}) {
  const locale = useLocale()
  const router = useRouter()

  useEffect(() => {
    if (locale === "en" && data.slug_en !== null) {
      router.push(`/en/${path}/${data.slug_en}`)
    } else if (locale === "en" && data.slug_en === null) {
      router.push(`/en/${path}/${data.slug}`)
    } else {
      router.push(`/id/${path}/${data.slug}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className="relative">
      <div className="container pb-8 pt-6 lg:pb-[126px]">
        <CustomBreadcrumb
          data={[
            {
              url: `${SITE_URL}/${locale}`,
              label: "Home",
              isPrimary: true,
            },
            {
              url: `${SITE_URL}/${locale}/news`,
              label: data.type === "news" ? "News" : "Blog",
              isPrimary: true,
            },
            {
              label: `${getLocalizedContent(locale, data?.title_en, data?.title)}`,
              isPrimary: true,
            },
          ]}
          className="mb-5 lg:mb-[40px]"
        />
        <div className="lg:px-[217px]">
          {data?.image && (
            <AspectRatio ratio={16 / 9} className="mb-6">
              <Image
                src={
                  data?.image
                    ? assetUrl(data?.image)!
                    : "/img/common/img_default-news.jpg"
                }
                alt={
                  getLocalizedContent(
                    locale,
                    data.alt_image_en,
                    data.alt_image
                  ) || ""
                }
                fill
                className="rounded-3xl object-cover"
                onError={(event: any) => {
                  event.target.id = "/img/common/img_default-news.jpg"
                  event.target.srcset = "/img/common/img_default-news.jpg"
                }}
              />
            </AspectRatio>
          )}
          {data?.published_at && (
            <p className="mb-1 text-xs font-semibold tracking-[0.8px] text-gray lg:text-md">
              {dateFormater(data?.published_at)}
            </p>
          )}
          <h1 className="text-xl font-bold lg:text-4xl">
            {getLocalizedContent(locale, data?.title_en, data?.title)}
          </h1>
          <div className="mt-4 text-sm tracking-[0.16px] lg:mt-8 lg:text-md">
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  data?.meta.news_content?.content_en ||
                    data?.meta?.blog_content?.content_en,
                  data?.meta.news_content?.content_id ||
                    data?.meta?.blog_content?.content_id
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
