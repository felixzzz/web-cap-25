"use client"
import { ImageContentBlock } from "@/components/block/ContentLeftRightBlock"
import { IntroBlock } from "@/components/block/IntroBlock"
import { mockDescription } from "@/components/block/mock"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { imgTempCardItem } from "@/data/images"
import { MetaIntro, ProgramSocialItem } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { TabsContent } from "@radix-ui/react-tabs"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

export function SocialCategory({
  description_en,
  description_id,
  image_en,
  image_id,
  program_en,
  program_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaIntro & {
  program_id: ProgramSocialItem[]
  program_en: ProgramSocialItem[]
}) {
  const locale = useLocale()
  const localizedContent = useMemo(
    () => getLocalizedContent(locale, program_en, program_id),
    [locale, program_en, program_id]
  )
  const [tab, setTab] = useState<string>(localizedContent?.[0]?.title || "")
  const router = useRouter()

  const MetaIntroData = {
    description_en,
    description_id,
    status_en,
    status_id,
    title_en,
    title_id,
  } as MetaIntro

  const handleTabChange = (value: string) => {
    setTab(value)
    const currentQuery = new URLSearchParams(window.location.search)
    currentQuery.set("tab", value)
    router.push(`/${locale}/sustainability/social?${currentQuery.toString()}`, {
      scroll: false,
    })
  }

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <IntroBlock {...MetaIntroData} />

      <section className="relative py-8 lg:py-12">
        <div className="container">
          <Tabs
            value={tab}
            className="min-h-[25vh]"
            onValueChange={(value: string) => {
              handleTabChange(value)
            }}
          >
            <TabsList className="mb-6 flex w-full flex-row overflow-auto">
              {localizedContent.map((item, i) => (
                <TabsTrigger
                  key={i}
                  value={item.title}
                  className="text-nowrap px-6 capitalize"
                >
                  {item.title.replace("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
            {localizedContent.map((item, i) => (
              <TabsContent key={i} value={item.title}>
                <ImageContentBlock
                  isNeedContainer={false}
                  img={assetUrl(item.icon)}
                  title={item.title}
                  text={item.description}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  )
}
