import { MetaIntro, MetaInvestorOverviewContent } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"

export default function InvestorFinancialJourney({
  intro,
  overview_content,
}: {
  intro: MetaIntro
  overview_content: MetaInvestorOverviewContent
}) {
  const locale = useLocale()
  const t = useTranslations("global")

  return (
    <>
      <section className="my-8 lg:my-[85px]">
        <div className="container">
          {isContentActive(locale, intro.status_en, intro.status_id) && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="text-xl font-bold lg:text-4xl">
                {getLocalizedContent(locale, intro.title_en, intro.title_id)}
              </div>
              <div
                className="prose text-md"
                dangerouslySetInnerHTML={{
                  __html:
                    getLocalizedContent(
                      locale,
                      intro.description_en,
                      intro.description_id
                    ) || "",
                }}
              />
            </div>
          )}
          {isContentActive(
            locale,
            overview_content.status_en,
            overview_content.status_id
          ) && (
            <div className="mt-8 w-full lg:mt-[85px]">
              <div className="mb-5 flex justify-end text-[18px] font-bold text-blue-tint">
                {t("in_thousands")}
              </div>
              <div
                className="table-financial relative overflow-auto"
                dangerouslySetInnerHTML={{
                  __html: getLocalizedContent(
                    locale,
                    overview_content?.content_en,
                    overview_content?.content_id
                  ),
                }}
              ></div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
