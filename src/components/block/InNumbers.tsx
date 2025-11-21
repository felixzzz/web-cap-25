"use client"

import { MetaInNumbers } from "@/lib/fragment"
import { cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useScramble } from "use-scramble"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export function InNumbersBlock({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  numbers_en,
  numbers_id,
}: MetaInNumbers) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="relative bg-tertiary py-10 text-white lg:py-20">
        <div className="container">
          <h2 className="mb-2 text-2xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>
          <div
            className="mb-10 text-white/70"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          ></div>

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {getLocalizedContent(locale, numbers_en, numbers_id)?.map(
              (item, i) => (
                <div key={i}>
                  <ScrambleText text={item.title} className="text-5xl" />
                  <p>{item.title}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export function ScrambleText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const { ref: refView, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })
  const { ref, replay } = useScramble({
    text: text,
    range: [65, 125],
    speed: 1,
    tick: 7,
    step: 1,
    scramble: 8,
    seed: 0,
    chance: 1,
    overdrive: false,
    overflow: true,
  })

  useEffect(() => {
    if (inView) {
      replay()
    }
  }, [inView, replay])

  return (
    <div ref={refView}>
      <div
        ref={ref}
        className={cn(
          "mb-1 text-3xl font-bold text-light-blue lg:text-4xl",
          className
        )}
      >
        {text}
      </div>
    </div>
  )
}
