import Anim from "@/components/global/Anim"
import { iconPhone, iconPrint } from "@/data/images"
import { MetaContactUsCompanyOffice } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function ContactOtherCompany({
  list_company_en,
  list_company_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaContactUsCompanyOffice) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <section className="bg-surface py-8 lg:py-20">
      <Anim>
        <div className="container">
          <div className="text-2xl font-bold lg:text-4xl">
            {getLocalizedContent(locale, title_en, title_id)}
          </div>
          <div className="mt-9 flex w-full flex-col gap-4">
            {getLocalizedContent(locale, list_company_en, list_company_id)?.map(
              (company) => (
                <div
                  key={company.company_name}
                  className="w-full rounded-3xl border bg-white p-6"
                >
                  <div className="text-lg font-bold">
                    {company.company_name}
                  </div>
                  {company.subtitle && (
                    <div className="mb-4 mt-2 font-bold text-gray/80">
                      {company.subtitle}
                    </div>
                  )}
                  {company.office?.map((office) => (
                    <div key={office.title}>
                      {office.title && (
                        <div className="mt-6 text-md font-bold">
                          {office.title}
                        </div>
                      )}
                      {office.address && (
                        <div className="mt-2 text-sm tracking-[0.14px]">
                          {office.address}
                        </div>
                      )}
                      <div className="mt-4 flex flex-col gap-2 text-sm tracking-[0.14px] lg:mt-2 lg:flex-row lg:gap-4">
                        {office.fax && (
                          <div className="flex flex-row gap-2">
                            <Image
                              width={20}
                              height={20}
                              src={iconPhone}
                              alt=""
                            />
                            <div className="my-auto">{office.phone}</div>
                          </div>
                        )}
                        {office.fax && (
                          <div className="flex flex-row gap-2">
                            <Image
                              width={20}
                              height={20}
                              src={iconPrint}
                              alt=""
                            />
                            <div className="my-auto">{office.fax}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </Anim>
    </section>
  )
}
