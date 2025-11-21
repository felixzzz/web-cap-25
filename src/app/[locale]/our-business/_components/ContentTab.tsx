"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessSolutionsContentTab } from "@/lib/types"
import { getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import React, { useRef, useState } from "react"
import ContentTabSwiper from "./ContentTabSwiper"

export default function ContentTab({
  status_en,
  status_id,
  title_en,
  title_id,
  tab_en,
  tab_id,
}: BusinessSolutionsContentTab) {
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState(
    getLocalizedContent(locale, tab_en, tab_id)?.[0]?.title
  )

  const handleChangeTab = (title: string) => setActiveTab(title)

  return (
    <section className="mb-28 overflow-hidden">
      <h3 className="mb-6 text-center text-4xl font-bold">
        {getLocalizedContent(locale, title_en, title_id)}
      </h3>
      <Tabs className="min-h-[25vh]" value={activeTab}>
        <TabsList className="container mb-6 flex w-full flex-row">
          {getLocalizedContent(locale, tab_en, tab_id).map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.title}
              onClick={() => handleChangeTab(item.title)}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {getLocalizedContent(locale, tab_en, tab_id).map((item, index) => (
          <TabsContent key={index} value={item.title}>
            <div className="container flex items-center justify-between">
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
            <div className="grid grid-cols-1">
              {typeof item.list === "object" && item.list.map((listItem, index) => (
                <ContentTabSwiper key={index} index={index} {...listItem} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
