import ShePdfCard from "@/components/global/ShePdfCard"
import { iconNextBlue } from "@/data/images"
import { MetaDocumentItem, MetaGovernanceRegulation } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function GovernanceSHERegulation({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  dataDocumentsSheRegulation,
}: MetaGovernanceRegulation & {
  dataDocumentsSheRegulation: MetaDocumentItem[]
}) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section>
        <div className="container py-8 lg:pb-[80px] lg:pt-[64px]">
          <div className="text-xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </div>
          <div
            className="prose mt-4 max-w-[844px] text-sm"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          />
          <div className="flex flex-col">
            {dataDocumentsSheRegulation?.map((item) => (
              <div
                key={item.id}
                className="mt-6 rounded-xl border bg-white px-6"
              >
                <ShePdfCard className="border-none" {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
