import Anim from "@/components/global/Anim"
import DownloadItem from "@/components/global/DownloadItem"
import { Button } from "@/components/ui/button"
import { iconEye, iconPdf, iconPlus } from "@/data/images"
import { MetaAboutDownload, MetaDocumentItem } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function AboutManagementDownload({
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  dataAboutDownload,
}: MetaAboutDownload & { dataAboutDownload: MetaDocumentItem[] }) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }
  return (
    <section className="relative bg-surface">
      <div className="container pb-6 pt-8 lg:py-[80px]">
        <div className="flex flex-col gap-6 lg:justify-between lg:gap-10">
          <Anim>
            <div className="flex flex-row justify-between">
              <div className="my-auto text-xl font-bold lg:text-3xl">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
            </div>
            <div>
              <div className="mt-0 grid grid-cols-1 gap-6 lg:grid-cols-4">
                {dataAboutDownload?.map((document) => (
                  <DownloadItem isCard key={document.id} {...document} />
                ))}
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </section>
  )
}
