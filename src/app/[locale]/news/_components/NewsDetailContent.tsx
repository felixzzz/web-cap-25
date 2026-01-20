"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { BannerRenderer } from "@/components/banner/BannerRenderer"
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SITE_URL } from "@/lib/constant"
import { PostNews } from "@/lib/fragment"
import { BannerResponse } from "@/lib/types"
import { assetUrl, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

function splitContent(html: string) {
  if (!html) return { part1: "", part2: "" }

  // Get all indices of </p>
  const pEndIndices = []
  const regex = /<\/p>/g
  let match
  while ((match = regex.exec(html)) !== null) {
    pEndIndices.push(match.index + 4) // +4 to include the tag itself
  }

  if (pEndIndices.length === 0) {
    return { part1: html, part2: "" }
  }

  // Pick the middle one
  const middleIndex = Math.floor(pEndIndices.length / 2)
  const splitPoint = pEndIndices[middleIndex]

  return {
    part1: html.substring(0, splitPoint),
    part2: html.substring(splitPoint),
  }
}

export default function NewsDetailContent({
  data,
  path,
  banners,
}: {
  data: PostNews
  path: string
  banners?: BannerResponse | null
}) {
  console.log(
    "NewsDetailContent received banners:",
    JSON.stringify(banners, null, 2)
  )
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

  const rawContent = getLocalizedContent(
    locale,
    data?.meta.news_content?.content_en || data?.meta?.blog_content?.content_en,
    data?.meta.news_content?.content_id || data?.meta?.blog_content?.content_id
  )

  const { part1, part2 } = useMemo(() => {
    if (banners?.center && banners.center.length > 0) {
      return splitContent(rawContent || "")
    }
    return { part1: rawContent || "", part2: "" }
  }, [rawContent, banners])

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
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {banners?.left && banners.left.length > 0 && (
            <div className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24">
                <BannerRenderer banners={banners.left} position="left" />
              </div>
            </div>
          )}

          <div className="col-span-1 mx-auto max-w-[850px] lg:col-span-6 lg:mx-0 lg:max-w-none">
            {/* Removed top center banner renderer */}

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
                  __html: part1,
                }}
              ></div>

              {banners?.center && banners.center.length > 0 && (
                <BannerRenderer
                  banners={banners.center}
                  position="center"
                  className="my-8"
                />
              )}

              {part2 && (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: part2,
                  }}
                ></div>
              )}
            </div>

            <BannerRenderer
              banners={banners?.bottom || []}
              position="bottom"
              className="mt-8"
            />
          </div>

          {banners?.right && banners.right.length > 0 && (
            <div className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24">
                <BannerRenderer banners={banners.right} position="right" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
