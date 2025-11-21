import Anim from "@/components/global/Anim"
import { iconNextBlue } from "@/data/images"
import { MetaGovernanceWhistleblowing } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

const listComplaint = [
  "Initial examination",
  "Management’s decision to investigate the Case",
  "Case’s investigation",
  "Conclusion of the Case’s investigation",
  "Final decision",
]

export default function GovernanceWhistleblowing({
  description_en,
  description_id,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  complaint_handling_title_id,
  complaint_handling_title_en,
  complaint_handling_en,
  complaint_handling_id,
}: MetaGovernanceWhistleblowing) {
  const locale = useLocale()
  const t = useTranslations("governance")

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="bg-white py-8 lg:py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-6/12">
              <Anim>
                <div className="text-3xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </div>
                <div
                  className="prose mt-4 max-w-[520px] text-md tracking-[0.16px]"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                />
                <Link
                  href="/governance/whistleblowing"
                  className="mt-4 flex gap-2 text-sm font-bold text-primary"
                >
                  Submit your concerns
                  <Image className="my-auto" src={iconNextBlue} alt="" />
                </Link>
              </Anim>
            </div>
            <div className="w-full lg:w-1/12"></div>
            <div className="my-auto mt-8 w-full lg:mt-0 lg:w-5/12">
              <Anim>
                <div className="text-lg uppercase tracking-[1px] text-[#BABABA]">
                  {getLocalizedContent(
                    locale,
                    complaint_handling_title_en,
                    complaint_handling_title_id
                  )}
                </div>
                <div className="mt-8 flex flex-col gap-12">
                  {getLocalizedContent(
                    locale,
                    complaint_handling_en,
                    complaint_handling_id
                  ).map((complaint, index) => (
                    <div
                      key={complaint.title_step}
                      className="flex flex-row gap-8"
                    >
                      <div className="relative flex size-[49px] flex-shrink-0 content-center rounded-full bg-light-blue">
                        <div className="m-auto text-center text-lg font-bold text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="my-auto text-lg font-bold">
                        {complaint.title_step}
                      </div>
                    </div>
                  ))}
                </div>
              </Anim>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
