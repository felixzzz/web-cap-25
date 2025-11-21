import { icTempPowerGeneration } from "@/data/images"
import { MetaPoint } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function EnvironmentDecarbonation({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  list_poin_en,
  list_poin_id,
  small_title_en,
  small_title_id,
}: MetaPoint) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative bg-slate-50 py-12 lg:py-24">
        <div className="container">
          <h2 className="mb-12 text-2xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {getLocalizedContent(locale, list_poin_en, list_poin_id)?.map(
              (item, i) => (
                <div key={i}>
                  <h3 className="relative mb-3 flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-light-blue text-xl font-bold text-white">
                    {item.title.substring(0, 1)}
                  </h3>

                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
