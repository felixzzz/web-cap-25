import DownloadItem from "@/components/global/DownloadItem"
import { iconNextBlue } from "@/data/images"
import { MetaDocumentItem, MetaGovernancePolicy } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function GovernancePolicy({
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
  dataDocumentsPolicy,
}: MetaGovernancePolicy & { dataDocumentsPolicy: MetaDocumentItem[] }) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="bg-surface py-8 lg:pb-[80px] lg:pt-[64px]">
        <div className="container">
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
            {dataDocumentsPolicy?.map((item) => (
              <div
                key={item.id}
                className="mt-6 rounded-xl border bg-white px-6"
              >
                <DownloadItem className="border-none" {...item} />
              </div>
            ))}
            <Link
              href="/governance/policy"
              className="mt-5 flex max-w-min gap-2 text-nowrap text-sm font-bold text-primary"
            >
              View All <Image className="my-auto" src={iconNextBlue} alt="" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
