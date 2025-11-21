"use client"

import { Button } from "@/components/ui/button"
import { MetaInvestorContent } from "@/lib/fragment"
import { cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useState } from "react"

export default function StocksAndBondsContent({
  list_en,
  list_id,
  status_en,
  status_id,
}: MetaInvestorContent) {
  const locale = useLocale()
  const [activeProduct, setActiveProduct] = useState<string>(
    getLocalizedContent(locale, list_en, list_id).filter(
      (item) => item.status === "active"
    )[0].title
  )
  const [tabStocks, setTabStocks] = useState<string>(
    getLocalizedContent(locale, list_en, list_id).filter(
      (item) => item.status === "active"
    )[0].list[0].title
  )

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="py-8 lg:pb-[80px] lg:pt-[56px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-row overflow-auto lg:col-span-2 lg:flex-col">
              {getLocalizedContent(locale, list_en, list_id)
                ?.filter((item) => item.status === "active")
                ?.map((item) => (
                  <div
                    key={item.title}
                    className={cn(
                      `cursor-pointer border-b-4 border-transparent px-6 py-4 capitalize hover:border-primary hover:font-bold hover:text-primary lg:border-b-0 lg:border-l-4`,
                      activeProduct === item.title &&
                        "border-primary font-bold text-primary",
                      getLocalizedContent(locale, list_en, list_id)?.filter(
                        (item) => item.status === "active"
                      ).length === 2 && "w-full text-center"
                    )}
                    onClick={() => setActiveProduct(item.title)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
            <div className="lg:col-span-10">
              {getLocalizedContent(locale, list_en, list_id)
                ?.filter((item) => item.status === "active")
                ?.map(
                  (item, indexItem) =>
                    activeProduct === item.title && (
                      <div key={item.title}>
                        {indexItem === 0 && (
                          <div className="no-scrollbar mb-4 flex flex-nowrap gap-3 overflow-auto lg:mb-10 lg:flex-wrap">
                            {item.list.map((item) => (
                              <Button
                                key={item.title}
                                onClick={() => setTabStocks(item.title)}
                                variant={
                                  tabStocks === item.title
                                    ? "blue"
                                    : "outline-blue"
                                }
                              >
                                {item.title}
                              </Button>
                            ))}
                          </div>
                        )}

                        {item.list.map(
                          (item) =>
                            item.title === tabStocks && (
                              <div key={item.title}>
                                <div
                                  className="stocks-content prose-h2:text-2x prose mt-6 flex max-w-full flex-col overflow-auto prose-h3:text-2xl prose-p:mt-0 prose-figure:mb-0 prose-figure:mt-0"
                                  dangerouslySetInnerHTML={{
                                    __html: item.content,
                                  }}
                                />
                              </div>
                            )
                        )}
                        {indexItem !== 0 &&
                          item.list.map((item) => (
                            <div key={item.title}>
                              {/* <div className="text-xl font-bold lg:text-3xl">
                              {item.title}
                            </div> */}
                              <div
                                className="stocks-content prose mt-6 flex max-w-full flex-col overflow-auto prose-h2:text-2xl prose-h3:text-2xl prose-p:mt-0 prose-figure:mb-0 prose-figure:mt-0"
                                dangerouslySetInnerHTML={{
                                  __html: item.content,
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
