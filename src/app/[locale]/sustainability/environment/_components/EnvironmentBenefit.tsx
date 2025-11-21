"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IntroBlock } from "@/components/block/IntroBlock"
import { MetaIntro, ProgramItem } from "@/lib/fragment"
import { useLocale } from "next-intl"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"

export function EnvironmentBenefit({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  program_en,
  program_id,
  image_en,
  image_id,
}: MetaIntro & {
  program_id: ProgramItem[]
  program_en: ProgramItem[]
}) {
  const locale = useLocale()
  const MetaIntroData = {
    description_en,
    description_id,
    status_en,
    status_id,
    title_en,
    title_id,
  } as MetaIntro

  const emptyCells = Math.max(
    0,
    Math.floor(
      (4 - getLocalizedContent(locale, program_en, program_id).length) / 2
    )
  )

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <IntroBlock {...MetaIntroData} />

      <div className="relative py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {Array.from({ length: emptyCells })?.map((_, index) => (
              <div
                key={`empty-start-${index}`}
                className="hidden lg:block"
              ></div>
            ))}
            {getLocalizedContent(locale, program_en, program_id)?.map(
              (item, i) => (
                <div key={i}>
                  <Dialog>
                    <Card className="space-y-3 p-6 h-full">
                      <div className="relative mb-10 aspect-square w-12">
                        <Image
                          src={`${assetUrl(item.icon)}`}
                          alt="icon"
                          fill
                          className="object-contain"
                        />
                      </div>

                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p
                        className="line-clamp-5"
                        dangerouslySetInnerHTML={{ __html: item.subtitle }}
                      />

                      {item.cta_label && item.cta_url && (
                        <DialogTrigger>
                          <div
                            className={cn(
                              buttonVariants({
                                variant: "link",
                                className: "min-w-0 px-0",
                              })
                            )}
                          >
                            {item.cta_label}
                            <ArrowRight
                              size={20}
                              strokeWidth={2}
                              className="relative left-1 transition-all duration-300 group-hover:left-2"
                            />
                          </div>
                        </DialogTrigger>
                      )}
                    </Card>

                    <DialogContent className="max-h-dvh gap-0 overflow-y-scroll  p-0 sm:!rounded-[25px] lg:max-w-4xl">
                      <DialogHeader className="sticky top-0 z-10 border-b border-b-neutral-200 bg-white px-4 py-4 sm:rounded-t-3xl lg:px-8 lg:pt-8">
                        <DialogTitle className="bg-white">
                          {item.title}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="px-4 py-4 lg:p-8">
                        <div
                          className="prose"
                          dangerouslySetInnerHTML={{
                            __html: item.content_popup,
                          }}
                        ></div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
              )
            )}
            {Array.from({ length: emptyCells })?.map((_, index) => (
              <div key={`empty-end-${index}`} className="hidden lg:block"></div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
