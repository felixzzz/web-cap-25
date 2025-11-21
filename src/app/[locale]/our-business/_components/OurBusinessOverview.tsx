"use client"
import {
  assetUrl,
  cn,
  getLocalizedContent,
  isContentActive,
  scrollToElement,
} from "@/lib/utils"
import { useMemo, useState } from "react"
import {
  CardBusiness,
  CardBusinessContent,
  CardBusinessFooter,
  CardBusinessHeader,
} from "./CardBusiness"
import Link from "next/link"
import { imgTempLogoCaChemicals } from "@/data/images"
import { useLocale } from "next-intl"
import { BusinessLineItem, MetaBusinessLine, MetaIntro } from "@/lib/fragment"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Anim from "@/components/global/Anim"
import { useRouter } from "next/navigation"

type OurBusinessOverviewProps = {
  intro: MetaIntro
  businessLine: MetaBusinessLine
}

export function OurBusinessOverview({
  intro,
  businessLine,
}: OurBusinessOverviewProps) {
  const locale = useLocale()
  const router = useRouter()

  const localizedContent = useMemo(() => {
    return getLocalizedContent(
      locale,
      businessLine.list_en,
      businessLine.list_id
    ).filter((item) => item.status === "active")
  }, [locale, businessLine.list_en, businessLine.list_id])

  const [activeCategory, setActiveCategory] = useState<string>(
    localizedContent?.[0]?.title || ""
  )

  const categoryNavigation = useMemo(() => {
    return localizedContent?.map((item) => ({
      name: item.title,
    }))
  }, [localizedContent])

  const getActiveLocalizedContent = useMemo(() => {
    return localizedContent.find((item) => item.title == activeCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNavigation, activeCategory])

  if (
    !isContentActive(locale, businessLine.status_en, businessLine.status_id)
  ) {
    return <></>
  }

  return (
    <section className="py-8 pt-0 lg:py-12">
      <Anim>
        <div className="container">
          {isContentActive(locale, intro.status_en, intro.status_id) && (
            <div
              className="prose mb-10 max-w-2xl"
              dangerouslySetInnerHTML={{
                __html:
                  getLocalizedContent(
                    locale,
                    intro.description_en,
                    intro.description_id
                  ) || "",
              }}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-4">
              <div className="sticky top-20 hidden flex-col lg:flex">
                {categoryNavigation.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      `cursor-pointer border-l border-transparent px-6 py-4 capitalize hover:border-l-primary hover:font-bold hover:text-primary hover:border-l-2 border-l-[#E8E8E8] transition-all duration-200`,
                      // item.name == activeCategory &&
                      //   "border-primary font-bold text-primary"
                    )}
                    onClick={() => {
                      scrollToElement(`${item.name}`, 100)
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="block lg:hidden">
                <div className="lg:min-w-[500px]">
                  <Tabs
                    value={activeCategory}
                    onValueChange={(value: string) => {
                      setActiveCategory(value)
                    }}
                  >
                    <TabsList className="flex w-full flex-row overflow-auto">
                      {categoryNavigation.map((item, i) => (
                        <TabsTrigger
                          key={i}
                          value={item.name}
                          className="w-auto px-4 capitalize"
                        >
                          {item.name.replace("-", " ")}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {getActiveLocalizedContent && (
                <div className="py-10 lg:py-0">
                  <div className="block lg:hidden">
                    <BusinessItem {...getActiveLocalizedContent} />
                  </div>
                </div>
              )}
              <div className="hidden lg:block">
                {localizedContent.map((item, i) => (
                  <BusinessItem
                    key={i}
                    {...item}
                    setActiveCategory={setActiveCategory}
                    callbackInView
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Anim>
    </section>
  )
}

type BusinessItemProp = {
  callbackInView?: boolean
  setActiveCategory?: (value: string) => void
} & BusinessLineItem

function BusinessItem({
  setActiveCategory,
  callbackInView = false,
  categories,
  cta_label,
  cta_url,
  description,
  icon,
  image,
  logo,
  status,
  title,
  small_title,
}: BusinessItemProp) {
  const locale = useLocale()

  return (
    <>
      <CardBusiness className="mb-10">
        <CardBusinessHeader
          img={`${assetUrl(logo)}`}
          background={`${assetUrl(image)}`}
          href={`/${locale}/our-business/${cta_url}`}
          label={cta_label}
          id={`${title}`}
          callbackInView={(id) => {
            if (id && callbackInView && setActiveCategory) {
              setActiveCategory(id)
            }
          }}
        />
        <CardBusinessContent>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </CardBusinessContent>
        {categories.length > 0 && (
          <CardBusinessFooter
            categories={categories}
            small_title={small_title}
          />
        )}
      </CardBusiness>
    </>
  )
}
