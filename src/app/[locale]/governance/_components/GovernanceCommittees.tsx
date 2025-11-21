"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { iconEye, iconPdf, imgTempCommittee } from "@/data/images"
import { MetaGovernanceCommittee } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function GovernanceCommittees({
  category_en,
  category_id,
  description_en,
  description_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaGovernanceCommittee) {
  const locale = useLocale()
  const [tab, setTab] = useState(
    getLocalizedContent(locale, category_en, category_id)?.[0]?.title_committee
  )

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="bg-surface py-8 lg:py-20">
        <div className="container relative">
          <Anim>
            <div className="text-3xl font-bold">
              {getLocalizedContent(locale, title_en, title_id)}
            </div>
            <div
              className="prose text-sm tracking-[0.14px]"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {getLocalizedContent(locale, category_en, category_id).map(
                (category) =>
                  category?.status === "active" && (
                    <Button
                      key={category?.title_committee}
                      onClick={() => setTab(category?.title_committee)}
                      variant={
                        tab === category?.title_committee
                          ? "blue"
                          : "outline-blue"
                      }
                    >
                      {category?.title_committee}
                    </Button>
                  )
              )}
            </div>
            {getLocalizedContent(locale, category_en, category_id).map(
              (categoryTab, index) =>
                tab === categoryTab?.title_committee && (
                  <div key={categoryTab?.title_committee}>
                    <div
                      className="prose mt-6 text-sm tracking-[0.14px]"
                      dangerouslySetInnerHTML={{
                        __html: categoryTab?.description,
                      }}
                    />
                    <div className="mt-6 rounded-xl border bg-white p-6">
                      <div className="flex flex-col lg:flex-row">
                        <div className="my-auto mr-auto text-md font-bold">
                          {categoryTab?.file_title}
                        </div>
                        <div className="mt-3 flex flex-row lg:mt-0">
                          <Link
                            className="mr-6 flex cursor-pointer"
                            href={assetUrl(categoryTab?.file) || ""}
                            target="_blank"
                          >
                            <Image className="my-auto " src={iconPdf} alt="" />
                          </Link>
                          <Button
                            className="group cursor-pointer px-3"
                            variant="outline-primary"
                            asChild
                          >
                            <Link
                              className="flex"
                              href={assetUrl(categoryTab?.file) || ""}
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
                    <div className="mt-6">
                      <div className="text-lg font-bold">
                        {categoryTab?.title}
                      </div>
                      <div className="mt-2 text-sm">{categoryTab?.subtitle}</div>
                      <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
                        {typeof category_id?.[index]?.members === "object" && category_id?.[index]?.members?.map((member) => (
                          <div key={member?.name} className="flex flex-col">
                            <AspectRatio ratio={1 / 1} className="mb-4">
                              <Image
                                src={assetUrl(member?.picture) || ""}
                                alt="img-corporate"
                                fill
                                className="rounded-3xl border object-cover"
                              />
                            </AspectRatio>
                            <div className="font-bold">{member?.name}</div>
                            <div className="mt-1 line-clamp-1 text-gray">
                              {member?.position}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
            )}
          </Anim>
        </div>
      </section>
    </>
  )
}
