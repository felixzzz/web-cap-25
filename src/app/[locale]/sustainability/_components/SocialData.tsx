import { ScrambleText } from "@/components/block/InNumbers"
import { MetaInNumbersSocial } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export function SocialData({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  performance_en,
  performance_id,
}: MetaInNumbersSocial) {
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
            className="prose mb-10 text-white/70"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          ></div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {getLocalizedContent(locale, performance_en, performance_id)?.map(
              (item, i) => (
                <div key={i}>
                  <ScrambleText text={item.value} className="text-5xl" />
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
