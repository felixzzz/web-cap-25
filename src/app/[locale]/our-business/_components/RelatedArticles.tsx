import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { Button } from "@/components/ui/button"
import { MetaNews, Post } from "@/lib/fragment"
import {
  assetUrl,
  dateFormater,
  getLocalizedContent,
  isContentActive,
} from "@/lib/utils"
import { useLocale } from "next-intl"
import React from "react"

type Prop = {
  posts: Post[]
} & MetaNews

export default function RelatedArticles({
  posts,
  section_title_en,
  section_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: Prop) {
  const locale = useLocale()
  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div>
          <h2 className="mb-8 text-xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {posts.map((item, i) => (
              <div key={i}>
                <Card href={`/${locale}/news/${item.slug}`}>
                  <CardImage
                    className="rounded-2xl"
                    img={assetUrl(item.image)!}
                  />
                  <CardContent
                    label={dateFormater(item.created_at)}
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
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
