import Anim from "@/components/global/Anim"
import DownloadItem from "@/components/global/DownloadItem"
import { MetaDocumentItem, MetaHomeFinancialReport } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"

export default function HomeFinancialReports({
  info_en,
  info_id,
  status_en,
  status_id,
  title_en,
  title_id,
  dataDocuments,
}: MetaHomeFinancialReport & { dataDocuments: MetaDocumentItem[] }) {
  const locale = useLocale()
  const t = useTranslations("global")

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container pb-6 pt-8 lg:py-[80px]">
        <div className="flex flex-col gap-6 lg:justify-between lg:gap-8">
          <Anim>
            <div className="flex flex-row justify-between">
              <div className="my-auto text-xl font-bold lg:text-3xl">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
              <Link
                href={`/${locale}/investor/reports`}
                className="flex items-center"
              >
                <div className="my-auto text-nowrap text-sm font-bold text-primary lg:text-md">
                  {t("see_all")}
                </div>
                <ArrowRight
                  size={22}
                  strokeWidth={2}
                  className="ml-1 text-primary"
                />
              </Link>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.9px] text-gray lg:text-[18px]">
                {getLocalizedContent(locale, info_en, info_id)}
              </div>
              <div className="mt-0 lg:mt-6"></div>
              {dataDocuments?.length > 0 &&
                dataDocuments?.map((document) => (
                  <DownloadItem
                    key={getLocalizedContent(
                      locale,
                      document.document_name_en,
                      document.document_name_id
                    )}
                    {...document}
                  />
                ))}
            </div>
          </Anim>
        </div>
      </div>
    </section>
  )
}
