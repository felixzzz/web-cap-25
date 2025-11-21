import Anim from "@/components/global/Anim"
import { CardItem } from "@/components/global/CardItem"
import { imgTempCardItem2 } from "@/data/images"
import { MetaProduct, MetaProducts } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import { MetaEmbeddedVideo } from "@/lib/fragment"

export function ChemicalSolutionsProduct({
  dataProducts,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: {
  dataProducts: MetaProduct[];
} & MetaProducts &
  React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className="relative py-12">
      <div className="container">
        <Anim>
          <h2 className="mb-8 text-xl font-bold lg:text-3xl">
            {getLocalizedContent(locale, title_en, title_id)}
          </h2>
        </Anim>

        <div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <Anim>
              {dataProducts?.map((item, i) => (
                <div key={i}>
                  <CardItem
                    title={getLocalizedContent(
                      locale,
                      item.title_en,
                      item.title
                    )}
                    desc={getLocalizedContent(
                      locale,
                      item.meta.banner.thumbnail_desc_en,
                      item.meta.banner.thumbnail_desc_id
                    )}
                    bg={assetUrl(item.meta.banner.thumbnail_image_id)}
                    href={`chemical-solutions/${item.slug}`}
                    cta_label="Lihat Detail"
                    alt={getLocalizedContent(
                      locale,
                      item.meta.banner.alt_text_thumbnail_image_en,
                      item.meta.banner.alt_text_thumbnail_image_id
                    )}
                  />
                </div>
              ))}
            </Anim>
          </div>
        </div>
      </div>
    </div>
  )
}
