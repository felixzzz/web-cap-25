import { MetaImageText2 } from "@/lib/types"
import { assetUrl, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function GovernancePerformance({
  image_text2,
}: {
  image_text2: MetaImageText2
}) {
  const locale = useLocale()

  return (
    <section id="sc-performance" className="container grid grid-cols-2 items-center py-20">
      <Image
        src={
          assetUrl(
            getLocalizedContent(
              locale,
              image_text2.image_id,
              image_text2.image_id
            )
          ) || ""
        }
        width={519}
        height={497}
        alt="governance performance"
      />
      <div>
        <h3 className="font-bold mb-4 text-4xl">
          {getLocalizedContent(
            locale,
            image_text2.title_en,
            image_text2.title_id
          )}
        </h3>
        <div
          className="[&>p]:text-base" 
          dangerouslySetInnerHTML={{
            __html: getLocalizedContent(
              locale,
              image_text2.description_en,
              image_text2.description_id
            ),
          }}
       />
      </div>
    </section>
  )
}
