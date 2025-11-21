import { Background } from "@/components/anti/background"
import { ScrambleText } from "@/components/block/InNumbers"
import { bgTertiaryVector, imgDefaultNews } from "@/data/images"
import { MetaInNumbers } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function EnvironmentPerformance({
  description_en,
  description_id,
  numbers_en,
  numbers_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaInNumbers) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }
  return (
    <>
      <div className="relative bg-tertiary py-12 lg:py-28">
        <Background
          bg={bgTertiaryVector}
          bgMobile={bgTertiaryVector}
          className="z-0"
          alt=""
          altMobile=""
        />

        <div className="container relative z-10 text-white">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="relative lg:bottom-10">
              <h2 className="mb-3 text-balance text-xl font-bold">
                {getLocalizedContent(locale, title_en, title_id)}
              </h2>
              <div
                className="opacity-70"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(
                    locale,
                    description_en,
                    description_id
                  ),
                }}
              ></div>
            </div>
            {getLocalizedContent(locale, numbers_en, numbers_id)?.map(
              (item, i) => (
                <div
                  key={i}
                  className="flex min-h-60 flex-col justify-between rounded-xl bg-blue-950 p-6"
                >
                  <div>
                    <Image
                      src={assetUrl(item?.icon || "") || ""}
                      width={40}
                      height={40}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <ScrambleText text={item.number} />
                    <div className="mb-1 text-lg font-bold">{item.title}</div>
                    <div className="opacity-70">{item.small_title}</div>
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
