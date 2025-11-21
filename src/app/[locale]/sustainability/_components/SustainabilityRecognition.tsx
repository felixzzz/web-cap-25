import { IntroBlock } from "@/components/block/IntroBlock"
import { MockMetaIntro } from "@/components/block/mock"
import { Card } from "@/components/ui/card"
import { logoChandraAsri } from "@/data/images"
import { MetaEvaluation, MetaIntro } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function SustainabilityRecognition({
  description_en,
  description_id,
  rating_en,
  rating_id,
  eecognition_en,
  eecognition_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaEvaluation & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()
  const MetaIntroData = {
    description_en,
    description_id,
    status_en,
    status_id,
    title_en,
    title_id,
  } as MetaIntro

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <IntroBlock {...MetaIntroData} />

      <div className="relative py-12">
        <div className="container mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Rating & Recognition</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {getLocalizedContent(locale, rating_en, rating_id)?.map(
              (item, i) => (
                <div key={i}>
                  <Card className="rounded-xl bg-slate-50 p-6">
                    <div className="relative mb-4 h-[54px]">
                      <Image
                        src={assetUrl(item.logo)!}
                        alt="logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="mb-3 text-center font-bold">{item.title}</h3>
                    <div className="mb-5 flex flex-col items-center justify-center rounded-xl border border-blue-tint bg-slate-200 p-2 text-blue-tint">
                      <div className="text-3xl font-bold">{item.score}</div>
                      <div className="text-xs font-semibold">
                        {item.score_description}
                      </div>
                    </div>
                    <p className="text-center text-xs lg:px-4">
                      {item.short_description}
                    </p>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {getLocalizedContent(locale, eecognition_en, eecognition_id)?.map(
              (item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="relative aspect-square w-96">
                    <Image
                      src={assetUrl(item.logo)!}
                      fill
                      alt={`${item.title}`}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[18px] font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
