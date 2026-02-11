"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "next-intl"
import { EnvironmentPerformance } from "../../environment/_components/EnvironmentPerfornamce"
import { CircularEconomyTabsMap } from "@/lib/types"
import Image from "next/image"
import { assetUrl } from "@/lib/utils"

export default function CircularEconomyTabs({ tabsData, reportButton }: { tabsData: CircularEconomyTabsMap, reportButton?: { label: string, url: string } }) {
    const locale = useLocale()

    if (!tabsData) return null

    const renderTabContent = (
        tabKey: keyof CircularEconomyTabsMap,
        title: string
    ) => {
        const tab = tabsData[tabKey]
        if (!tab) return null

        return (
            <TabsContent value={tabKey}>
                {/* Performance Section (Top) */}
                {tab.performance && (
                    <EnvironmentPerformance {...tab.performance} />
                )}

                {/* Hero Image Section */}
                {tab.hero_image && (
                    <div className="container mx-auto mt-12 mb-8">
                        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden">
                            <Image
                                src={assetUrl(tab.hero_image) || ""}
                                alt={tab.hero_image_alt || title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Tab Description Section */}
                {tab.tab_description && (
                    <div className="container mx-auto mb-8">
                        <div
                            className="prose prose-lg max-w-none [&>h2]:text-2xl  [&>h2]:font-bold [&>h2]:mb-4 [&>p]:mb-4 [&>p]:text-gray-700"
                            dangerouslySetInnerHTML={{ __html: tab.tab_description }}
                        />
                    </div>
                )}

                {/* Slider Items */}
                <div className="container mx-auto mt-12">
                    {tab.items && (
                        <ContentTabSwiper
                            index={0}
                            status="active"
                            title={title}
                            list={tab.items}
                            hideOverflow={true}
                        />
                    )}
                    <div className="mt-8 flex justify-center">
                        <a href={reportButton?.url || "#"} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            {reportButton?.label || "Discover our circular economy report"}
                        </a>
                    </div>
                </div>
            </TabsContent>
        )
    }

    return (
        <Tabs defaultValue="policy" className="min-h-[25vh]">
            <div className="container mx-auto">
                <TabsList className="min-w-fit md:min-w-fit flex-nowrap overflow-x-auto overflow-y-hidden mb-6 flex w-full flex-row gap-2 md:gap-4 p-1 md:p-2">
                    <TabsTrigger value="policy" className="min-w-fit font-bold whitespace-nowrap px-4 md:px-6">Public Education</TabsTrigger>
                    <TabsTrigger value="end-to-end" className="min-w-fit font-bold whitespace-nowrap px-4 md:px-6">End-to-end Waste Management Model</TabsTrigger>
                    <TabsTrigger value="technology" className="min-w-fit font-bold whitespace-nowrap px-4 md:px-6">Technology for Circular Products</TabsTrigger>
                </TabsList>
            </div>

            {renderTabContent("policy", "Public Education")}
            {renderTabContent("end-to-end", "End-to-end Waste Management Model")}
            {renderTabContent("technology", "Technology for Circular Products")}
        </Tabs>
    )
}
