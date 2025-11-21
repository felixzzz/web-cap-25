import { MetaEmbeddedVideo, MetaIntro } from "@/lib/fragment"
import { cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import React from "react"
import Anim from "../global/Anim"

export function IntroBlock({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  className,
  children,
  video_url_en,
  video_url_id,
  ...props
}: MetaIntro & MetaEmbeddedVideo & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className={cn(`relative py-12 lg:py-16`, className)} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mb-6">
          <Anim>
            <h3
              className="prose text-balance text-2xl font-bold lg:text-4xl"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(locale, title_en, title_id),
              }}
            />
          </Anim>
          <Anim>
            <div className="space-y-5">
              <div
                className="prose mb-2"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(
                    locale,
                    description_en,
                    description_id
                  ),
                }}
              />
              {children}
            </div>
          </Anim>
        </div>
        <Anim>
          {getLocalizedContent(locale, video_url_en, video_url_id) && (
            <iframe
              src={getLocalizedContent(locale, video_url_en, video_url_id)}
              title={getLocalizedContent(locale, title_en, title_id)}
              width="100%"
              height="480"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-3xl border-0"
            />
          )}
        </Anim>
      </div>
    </div>
  )
}
