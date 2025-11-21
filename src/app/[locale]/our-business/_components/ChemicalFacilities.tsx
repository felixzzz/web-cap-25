import Anim from "@/components/global/Anim"
import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { imgTempCardItem } from "@/data/images"
import { MetaProducts } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"

export function ChemicalFacilities({
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaProducts & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className="relative py-6 lg:py-20">
      <div className="container">
        <Anim>
          <h2 className="mb-10 text-2xl font-bold lg:text-4xl">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>
        </Anim>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <Anim>
            {getLocalizedContent(locale, list_en, list_id)
              ?.filter((item) => item.status === "active")
              ?.map((item, i) => (
                <Card key={i}>
                  <CardImage
                    img={assetUrl(item.image)!}
                    className="aspect-square"
                  />
                  <CardContent
                    title={item.title!}
                    text={item.description}
                  ></CardContent>
                </Card>
              ))}
          </Anim>
        </div>
      </div>
    </div>
  )
}
