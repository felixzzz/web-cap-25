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
          <div className="flex flex-col justify-center gap-6 lg:flex-row">
            <div className="flex-1 lg:max-w-[33%]">
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
                  className="flex min-h-60 flex-1 flex-col justify-between rounded-xl bg-blue-950 p-6 lg:max-w-[33%]"
                >
                  <div>
                    {item.icon && (
                      <Image
                        src={assetUrl(item?.icon || "") || ""}
                        width={40}
                        height={40}
                        alt={item.title}
                      />
                    )}
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
