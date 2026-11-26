import React from "react"
import { Locale, VideoSectionData } from "../types"
import { pickText } from "../utils"

interface VideoSectionBlockProps {
  data: VideoSectionData
  locale: Locale
}

export const VideoSectionBlock: React.FC<VideoSectionBlockProps> = ({
  data,
  locale,
}) => {
  const title = pickText(locale, data.title_en, data.title_id)

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {title && (
          <h2 className="mb-6 max-w-xl whitespace-pre-line text-2xl font-bold leading-snug text-slate-900 md:text-[30px]">
            {title}
          </h2>
        )}

        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
          <iframe
            src={data.youtube_url}
            title={title || "Chandra Asri Video"}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
