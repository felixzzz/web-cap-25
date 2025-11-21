import { icTempPowerGeneration } from "@/data/images"
import { MetaImageText, MetaImageTextSocial } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function SocialHuman({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  list_en,
  list_id,
}: MetaImageTextSocial) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <section className="relative py-10 lg:py-14">
        <div className="container">
          <div className="mb-10 space-y-4">
            <h2 className="text-xl font-bold">
              {getLocalizedContent(locale, title_en, title_id)}
            </h2>
            <div
              className="prose text-balance"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {getLocalizedContent(locale, list_en, list_id)?.map((item, i) => (
              <div key={i} className="border-b-gray-200 border-b pb-10">
                <div className="flex items-start gap-6">
                  <div className="relative aspect-square min-w-[56px] lg:top-2">
                    <Image
                      src={assetUrl(item.icon)!}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                    <div
                      className="prose text-sm"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
