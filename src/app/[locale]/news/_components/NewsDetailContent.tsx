"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { BannerRenderer } from "@/components/banner/BannerRenderer"
import { EmbeddedBanner } from "./EmbeddedBanner"
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SITE_URL } from "@/lib/constant"
import { PostNews } from "@/lib/fragment"
import { BannerResponse } from "@/lib/types"
import { assetUrl, cn, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

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
  const middleIndex = Math.floor((pEndIndices.length - 1) / 2)
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
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("global")
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  useEffect(() => {
    if (locale === "en" && data.slug_en !== null) {
      router.push(`/en/${path}/${data.slug_en}`)
    } else if (locale === "en" && data.slug_en === null) {
      router.push(`/en/${path}/${data.slug}`)
    } else {
      router.push(`/id/${path}/${data.slug}`)
    }
  }, [locale, data.slug, data.slug_en, path, router])

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

  const hasLeft = banners?.left && banners.left.length > 0
  const hasRight = banners?.right && banners.right.length > 0
  const hasAnyBanner = hasLeft || hasRight

  return (
    <section className="relative">
      <div className="mx-auto w-full px-4 pb-8 pt-6 lg:max-w-[1680px] lg:pb-[126px]">
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
          className="container mx-auto mb-5 lg:mb-[40px]"
        />
        <div
          className={`grid grid-cols-1 ${
            hasAnyBanner
              ? "lg:grid-cols-[230px_minmax(0,1fr)_230px] xl:grid-cols-[230px_minmax(0,1fr)_230px]"
              : "lg:grid-cols-12"
          } ${hasLeft || hasRight ? "gap-4" : "gap-8"}`}
        >
          {hasLeft ? (
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <BannerRenderer banners={banners!.left} position="left" />
              </div>
            </div>
          ) : hasAnyBanner ? (
            <div className="hidden lg:block" />
          ) : null}

          <div
            className={`col-span-1 mx-auto max-w-[850px] lg:mx-0 lg:max-w-none ${
              !hasAnyBanner ? "lg:col-span-8 lg:col-start-3" : ""
            }`}
          >
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
            {hasLeft ? (
              <div
                className={cn(
                  banners?.left[0].is_hide_in_mobile
                    ? "hidden lg:col-span-2"
                    : "mb-6 lg:col-span-3 lg:hidden"
                )}
              >
                <div className="w-full">
                  <BannerRenderer
                    banners={banners!.left}
                    aspectRatio="21/9"
                    position="left"
                  />
                </div>
              </div>
            ) : hasAnyBanner ? (
              <div className="hidden lg:block" />
            ) : null}
            <h1 className="text-xl font-bold lg:text-4xl">
              {getLocalizedContent(locale, data?.title_en, data?.title)}
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray lg:text-sm">
              <p>
                {locale === "id" ? "Oleh" : "By"}{" "}
                <span className="text-oxford-blue">Chandra Asri Group Editorial Team</span>
              </p>
              {data?.published_at && (
                <p className="tracking-[0.8px]">
                  {dateFormater(data?.published_at)}
                </p>
              )}
            </div>
            <div className="mt-4 text-sm tracking-[0.16px] lg:mt-8 lg:text-md">
              {(() => {
                const regex = /###banner###(\d+)###banner###/g
                type Part =
                  | { type: "html"; content: string }
                  | { type: "banner"; id: string }
                  | { type: "center-banner" }

                let parts: Part[] = []

                if (rawContent) {
                  let lastIndex = 0
                  let match
                  regex.lastIndex = 0

                  while ((match = regex.exec(rawContent)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push({
                        type: "html",
                        content: rawContent.substring(lastIndex, match.index),
                      })
                    }
                    parts.push({
                      type: "banner",
                      id: match[1],
                    })
                    lastIndex = regex.lastIndex
                  }

                  if (lastIndex < rawContent.length) {
                    parts.push({
                      type: "html",
                      content: rawContent.substring(lastIndex),
                    })
                  }
                }

                // Inject center banner if available
                if (banners?.center && banners.center.length > 0) {
                  // Find longest text part
                  let longestIndex = -1
                  let maxLength = 0

                  parts.forEach((part, index) => {
                    if (
                      part.type === "html" &&
                      part.content.length > maxLength
                    ) {
                      maxLength = part.content.length
                      longestIndex = index
                    }
                  })

                  if (longestIndex !== -1) {
                    const targetPart = parts[longestIndex] as {
                      type: "html"
                      content: string
                    }
                    const { part1, part2 } = splitContent(targetPart.content)

                    if (part2) {
                      parts.splice(
                        longestIndex,
                        1,
                        { type: "html", content: part1 },
                        { type: "center-banner" },
                        { type: "html", content: part2 }
                      )
                    } else {
                      // If no split possible (no paragraphs), append banner after
                      parts.splice(
                        longestIndex,
                        1,
                        { type: "html", content: part1 },
                        { type: "center-banner" }
                      )
                    }
                  }
                }

                return parts.map((part, index) => {
                  if (part.type === "banner") {
                    return (
                      <EmbeddedBanner key={`manual-${index}`} id={part.id} />
                    )
                  }
                  if (part.type === "center-banner") {
                    return (
                      <BannerRenderer
                        key={`center-${index}`}
                        banners={banners!.center}
                        position="center"
                        className="my-8"
                      />
                    )
                  }
                  if (part.type === "html" && part.content) {
                    return (
                      <div
                        key={`html-${index}`}
                        className="prose"
                        dangerouslySetInnerHTML={{
                          __html: part.content,
                        }}
                      />
                    )
                  }
                  return null
                })
              })()}
            </div>

            {/* Share Section */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <span className="text-md font-semibold text-oxford-blue">
                {t("share")}
              </span>
              <div className="flex items-center gap-3">
                {/* WhatsApp Share Button */}
                <button
                  onClick={() => {
                    const articleTitle = getLocalizedContent(locale, data?.title_en, data?.title) || ""
                    const shareHeader = locale === "id"
                      ? "Baca artikel ini dari Chandra Asri Group"
                      : "Read this article from Chandra Asri Group"
                    const shareText = `${shareHeader}\n\n${articleTitle}\n${shareUrl}`
                    window.open(
                      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
                      "_blank"
                    )
                  }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                </button>

                {/* Facebook Share Button */}
                <button
                  onClick={() => {
                    const articleTitle = getLocalizedContent(locale, data?.title_en, data?.title) || ""
                    const shareHeader = locale === "id"
                      ? "Baca artikel ini dari Chandra Asri Group"
                      : "Read this article from Chandra Asri Group"
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareHeader + ": " + articleTitle)}`,
                      "_blank"
                    )
                  }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 12.25V9.25C17.5 8.422 18.172 7.75 19 7.75H20.5V4H17.5C15.0145 4 13 6.0145 13 8.5V12.25H10V16H13V28H17.5V16H20.5L22 12.25H17.5Z"/>
                  </svg>
                </button>

                {/* X Share Button */}
                <button
                  onClick={() => {
                    const articleTitle = getLocalizedContent(locale, data?.title_en, data?.title) || ""
                    const shareHeader = locale === "id"
                      ? "Baca artikel ini dari Chandra Asri Group"
                      : "Read this article from Chandra Asri Group"
                    const shareText = `${shareHeader}: ${articleTitle}`
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                      "_blank"
                    )
                  }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95"
                  title="Share on X"
                  aria-label="Share on X"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.9512 25L18.2295 13.9688L26 5H24.2512L17.4481 12.8523L11.9514 5H6L14.1562 16.6517L6.92348 25H8.67232L14.9376 17.7682L19.9999 25H25.9512ZM23.3794 23.6237H20.6454L8.5722 6.37655H11.3063L23.3794 23.6237Z"/>
                  </svg>
                </button>

                {/* Copy Link Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl).then(() => {
                      toast({
                        title: locale === "id" ? "Tautan berhasil disalin ke papan klip!" : "Link copied to clipboard!",
                        duration: 2000,
                      })
                    })
                  }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5cb85c] text-white shadow-md transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95"
                  title={locale === "id" ? "Salin tautan" : "Copy link"}
                  aria-label="Copy link"
                >
                  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>

            <BannerRenderer
              banners={banners?.bottom || []}
              position="bottom"
              className="mt-8"
            />
          </div>

          {hasRight ? (
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <BannerRenderer banners={banners!.right} position="right" />
              </div>
            </div>
          ) : hasAnyBanner ? (
            <div className="hidden lg:block" />
          ) : null}

          {hasRight ? (
            <div
              className={cn(
                banners!.right[0].is_hide_in_mobile
                  ? "hidden"
                  : "mb-6 block lg:hidden"
              )}
            >
              <div className="sticky top-24">
                <BannerRenderer
                  aspectRatio="21/9"
                  banners={banners!.right}
                  position="right"
                />
              </div>
            </div>
          ) : hasAnyBanner ? (
            <div className="hidden lg:block" />
          ) : null}
        </div>
      </div>
    </section>
  )
}
