"use client"

import Anim from "@/components/global/Anim"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MetaAboutAwards, MetaAboutCertification } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"

export default function AwardsAndRecognition({
  awards,
  certification,
}: {
  awards: MetaAboutAwards
  certification: MetaAboutCertification
}) {
  const locale = useLocale()
  const t = useTranslations("global")
  const router = useRouter()
  const [tab, setTab] = useState("award")
  const [year, setYear] = useState<string>("all")

  const handleOnValueChange = (value: string) => {
    setYear(value)
  }

  const getAvailableYear = useMemo(() => {
    const years = getLocalizedContent(
      locale,
      awards.list_en,
      awards.list_id
    )?.map((item) => item.year!)
    return Array.from(new Set(years))
  }, [awards.list_en, awards.list_id, locale])

  const filteredAwards = useMemo(() => {
    return getLocalizedContent(locale, awards.list_en, awards.list_id)?.filter(
      (item) => {
        if (year === "all") {
          return item
        }

        return item.year === year
      }
    )
  }, [awards.list_en, awards.list_id, locale, year])

  const handleTabChange = (value: string) => {
    setTab(value)
    const currentQuery = new URLSearchParams(window.location.search)
    currentQuery.set("tab", value)
    router.push(
      `/${locale}/about/awards-and-recognition?${currentQuery.toString()}`,
      {
        scroll: false,
      }
    )
  }

  return (
    <>
      <section className="relative py-8 lg:py-10">
        <div className="container">
          <Tabs
            value={tab}
            className="min-h-[25vh]"
            onValueChange={handleTabChange}
          >
            <TabsList className="mb-6 flex w-full flex-row">
              {isContentActive(locale, awards.status_en, awards.status_id) && (
                <TabsTrigger value="award">{t("award")}</TabsTrigger>
              )}
              {isContentActive(
                locale,
                certification.status_en,
                certification.status_id
              ) && (
                <TabsTrigger value="recognition">
                  {t("recognition")}
                </TabsTrigger>
              )}
            </TabsList>
            {isContentActive(locale, awards.status_en, awards.status_id) && (
              <TabsContent value="award">
                <Anim triggerOnce={false} fraction={0}>
                  <div className="mt-12 flex justify-end">
                    <Select onValueChange={handleOnValueChange}>
                      <SelectTrigger className="w-[132px]">
                        <SelectValue placeholder="All Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Year</SelectItem>
                          {getAvailableYear
                            ?.filter((item) => item)
                            .map((item, i) => (
                              <SelectItem value={`${item}`} key={i}>
                                {item || ""}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-[56px]">
                    <>
                      {filteredAwards.map((award) => (
                        <div key={award.award_title} className="flex flex-col">
                          <AspectRatio ratio={1 / 1} className="mb-4">
                            <Image
                              src={assetUrl(award.image) || ""}
                              alt="img-corporate"
                              fill
                              className="rounded-3xl border object-cover"
                            />
                          </AspectRatio>
                          <div className="font-bold">{award.award_title}</div>
                        </div>
                      ))}
                    </>
                  </div>
                </Anim>
              </TabsContent>
            )}
            {isContentActive(
              locale,
              certification.status_en,
              certification.status_id
            ) && (
              <TabsContent value="recognition">
                <Anim triggerOnce={false} fraction={0}>
                  <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-[56px]">
                    <>
                      {getLocalizedContent(
                        locale,
                        certification.list_en,
                        certification.list_id
                      )?.map((certification) => (
                        <div
                          key={certification.certification_title}
                          className="flex flex-col"
                        >
                          <AspectRatio ratio={1 / 1} className="mb-4">
                            <Image
                              src={assetUrl(certification.image) || ""}
                              alt="img-corporate"
                              fill
                              className="rounded-3xl border object-cover"
                            />
                          </AspectRatio>
                          <div className="font-bold">
                            {certification.certification_title}
                          </div>
                          <div className="mt-1 text-gray">
                            {certification.year}
                          </div>
                          <p className="text-base text-gray">{certification.description}</p>
                        </div>
                      ))}
                    </>
                  </div>
                </Anim>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </>
  )
}
