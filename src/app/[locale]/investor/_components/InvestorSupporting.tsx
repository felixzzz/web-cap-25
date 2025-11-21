import { iconPhone, iconPrint } from "@/data/images"
import { MetaInvestorCard } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function InvestorSupporting({
  title_en,
  title_id,
  list_en,
  list_id,
  status_en,
  status_id,
}: MetaInvestorCard) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="container relative my-8 lg:my-[85px]">
        <div className="text-xl font-bold lg:text-4xl">
          {getLocalizedContent(locale, title_en, title_id)}
        </div>
        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
          {getLocalizedContent(locale, list_en, list_id)?.map((office) => (
            <div
              key={office?.title}
              className="w-full rounded-3xl border bg-white p-6"
            >
              <div className="text-lg font-bold">{office?.title}</div>
              {office?.subtitle && (
                <div className="mt-2 text-md font-bold text-gray/80">
                  {office?.subtitle}
                </div>
              )}
              {office?.address && (
                <div className="mt-4 max-w-[400px] text-sm tracking-[0.14px]">
                  {office?.address}
                </div>
              )}
              <div className="mt-4 flex flex-col gap-2 text-sm tracking-[0.14px] lg:mt-2 lg:gap-2">
                {office?.contact1 && (
                  <div className="flex flex-row gap-2">
                    <Image width={20} height={20} src={iconPhone} alt="" />
                    <div className="my-auto">{office?.contact1}</div>
                  </div>
                )}
                {office?.contact2 && (
                  <div className="flex flex-row gap-2">
                    <Image width={20} height={20} src={iconPrint} alt="" />
                    <div className="my-auto">{office?.contact2}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
