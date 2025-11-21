"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  icChecklistBlue,
  iconChecklist,
  imgResponsibleFramework,
} from "@/data/images"
import { MetaFramework } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

export function SustainabilityResponsible({
  description_en,
  description_id,
  file_en,
  file_id,
  framework_en,
  framework_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaFramework) {
  const locale = useLocale()
  const localizedFramework = useMemo(
    () => getLocalizedContent(locale, framework_en, framework_id),
    [locale, framework_en, framework_id]
  )
  const [keyActive, setKeyActive] = useState<number>(
    // getLocalizedContent(
    //   locale,
    //   framework_en?.[0],
    //   framework_id?.[0]
    // ).initial_letter?.toLowerCase() || "r"
    0
  )

  const activeContent = useMemo(
    () =>
      // localizedFramework.find(
      //   (item) => item.initial_letter?.toLowerCase() === keyActive
      // ),
      localizedFramework[keyActive],
    [localizedFramework, keyActive]
  )

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative bg-slate-50 py-24">
        <div className="container">
          <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="max-w-md">
                <h2 className="text-pretty text-3xl font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </h2>
              </div>
            </div>
            <div>
              <div className="ml-auto max-w-lg">
                <div
                  className="max-w-mg mb-5"
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                ></div>
                {getLocalizedContent(locale, file_en, file_id)?.map(
                  (item, i) => (
                    <Link
                      key={i}
                      href={`${assetUrl(item.document)}`}
                      target="_blank"
                    >
                      <Button className="text-xs lg:text-base">
                        {item.title}
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="col-span-5">
              <div className="relative aspect-square">
                <Image
                  src={imgResponsibleFramework}
                  alt="img-responsible-framework"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="col-span-7">
              <div className="mb-8 flex flex-wrap gap-2 overflow-x-scroll lg:flex-nowrap">
                {getLocalizedContent(locale, framework_en, framework_id)?.map(
                  (item, i) => (
                    <div key={i}>
                      <Button
                        className={cn(
                          `w-[60px] min-w-0 rounded-full text-sm uppercase`,
                          // keyActive === item.initial_letter?.toLowerCase() &&
                          //   `bg-light-blue text-white`
                          keyActive === i && `bg-light-blue text-white`
                        )}
                        size={"sm"}
                        variant={"outline-blue"}
                        onClick={() =>
                          // setKeyActive(
                          //   item.initial_letter?.toLowerCase() || "r"
                          // )
                          setKeyActive(i)
                        }
                      >
                        {item.initial_letter}
                      </Button>
                    </div>
                  )
                )}
              </div>

              <div>
                {activeContent && (
                  <Card className="p-6">
                    <div className="">
                      <div
                        className="prose-checklist prose prose-h4:text-lg prose-li:relative prose-li:list-none"
                        dangerouslySetInnerHTML={{
                          __html: activeContent.description!,
                        }}
                      ></div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
