import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { iconEye, iconPdf } from "@/data/images"
import { MetaGovernanceCodeConduct } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function GovernanceCodeOfConduct({
  description_en,
  description_id,
  file_en,
  file_id,
  file_title_en,
  file_title_id,
  image_en,
  image_id,
  position_en,
  position_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaGovernanceCodeConduct) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="bg-surface py-8 lg:py-[72px]">
        <div className="container">
          <Anim>
            <div className="text-xl font-bold">
              {getLocalizedContent(locale, title_en, title_id)}
            </div>
            <div
              className="prose mt-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            />
            <div className="mt-6 rounded-xl border bg-white p-6">
              <div className="flex flex-col lg:flex-row">
                <div className="my-auto mr-auto text-md font-bold">
                  {getLocalizedContent(locale, file_title_en, file_title_id)}
                </div>
                <div className="mt-3 flex flex-row lg:mt-0">
                  <Link
                    className="mr-6 flex cursor-pointer"
                    href={
                      assetUrl(
                        getLocalizedContent(locale, file_en.path, file_id.path)
                      ) || ""
                    }
                    target="_blank"
                  >
                    <Image className="my-auto" src={iconPdf} alt="" />
                  </Link>
                  <Button
                    className="group cursor-pointer px-3"
                    variant="outline-primary"
                    asChild
                  >
                    <Link
                      className="flex"
                      href={
                        assetUrl(
                          getLocalizedContent(
                            locale,
                            file_en.path,
                            file_id.path
                          )
                        ) || ""
                      }
                      target="_blank"
                    >
                      <Image
                        className="my-auto mr-2 group-hover:brightness-0 group-hover:invert"
                        src={iconEye}
                        alt=""
                      />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Anim>
        </div>
      </section>
    </>
  )
}
