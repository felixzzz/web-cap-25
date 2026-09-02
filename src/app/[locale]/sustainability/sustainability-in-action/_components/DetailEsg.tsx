"use client"

import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { imgTempNews } from "@/data/images"
import { Post } from "@/lib/fragment"
import { assetUrl, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

type Prop = {
  data: Post
}

export default function DetailEsg({ data }: Prop) {
  const locale = useLocale()

  return (
    <section className="relative">
      <div className="container pb-8 pt-6 lg:pb-[126px]">
        <CustomBreadcrumb
          data={[
            {
              url: `/${locale}/sustainability/sustainability-in-action`,
              label: "Sustainability In Action",
              isPrimary: true,
            },
            {
              label: `${data?.title}`,
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
                alt={data?.title}
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
                  data?.meta?.article_content?.content_en,
                  data?.meta?.article_content?.content_id
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
