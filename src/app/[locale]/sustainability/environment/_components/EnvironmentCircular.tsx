import { MetaPointImage } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export function EnvironmentCircular({
  description_en,
  description_id,
  list_poin_en,
  list_poin_id,
  small_title_en,
  small_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
  image_en,
  image_id,
}: MetaPointImage) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="pb-10 pt-24 lg:pb-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden lg:rounded-tr-3xl">
            {getLocalizedContent(locale, image_id, image_id) && (
              <Image
                src={assetUrl(getLocalizedContent(locale, image_id, image_id))!}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="lg:p-4">
            <div className="container pb-6">
              <div className="max-w-xl">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                  {getLocalizedContent(locale, title_en, title_id)}
                </h2>
                <div
                  className="mb-10"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                ></div>

                <div>
                  <p className="mb-6 font-bold uppercase text-neutral-500">
                    {getLocalizedContent(
                      locale,
                      small_title_en,
                      small_title_id
                    )}
                  </p>

                  <div className="space-y-6">
                    {getLocalizedContent(
                      locale,
                      list_poin_en,
                      list_poin_id
                    )?.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-6">
                          <div className="relative aspect-square w-14 min-w-14 lg:top-2">
                            <Image
                              src={assetUrl(item.icon)!}
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="mb-2 text-xl font-bold">
                              {item.title}
                            </h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
