"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "next-intl"
import { EnvironmentPerformance } from "../../environment/_components/EnvironmentPerfornamce"
import { CircularEconomyTabsMap } from "@/lib/types"

export default function CircularEconomyTabs({ tabsData }: { tabsData: CircularEconomyTabsMap }) {
    const locale = useLocale()

    if (!tabsData) return null

    return (
        <Tabs defaultValue="policy" className="min-h-[25vh]">
            <div className="container mx-auto">
                <TabsList className="min-w-fit md:min-w-fit flex-nowrap overflow-x-auto overflow-y-hidden mb-6 flex w-full flex-row">
                    <TabsTrigger value="policy" className="min-w-fit font-bold">Public Education</TabsTrigger>
                    <TabsTrigger value="end-to-end" className="min-w-fit font-bold">End-to-end Waste Management Model</TabsTrigger>
                    <TabsTrigger value="technology" className="min-w-fit font-bold">Technology for Circular Products</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="policy">
                {tabsData?.policy?.performance && (
                    <EnvironmentPerformance {...tabsData.policy.performance} />
                )}
                <div className="container mx-auto mt-12">
                    {tabsData?.policy?.items && (
                        <ContentTabSwiper
                            index={0}
                            status="active"
                            title="Public Education"
                            list={tabsData.policy.items}
                            hideOverflow={true}
                        />
                    )}
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="end-to-end">
                {tabsData?.["end-to-end"]?.performance && (
                    <EnvironmentPerformance {...tabsData["end-to-end"].performance} />
                )}
                <div className="container mx-auto mt-12">
                    {tabsData?.["end-to-end"]?.items && (
                        <ContentTabSwiper
                            index={0}
                            status="active"
                            title="End-to-end Waste Management Model"
                            list={tabsData["end-to-end"].items}
                            hideOverflow={true}
                        />
                    )}
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="technology">
                {tabsData?.technology?.performance && (
                    <EnvironmentPerformance {...tabsData.technology.performance} />
                )}
                <div className="container mx-auto mt-12">
                    {tabsData?.technology?.items && (
                        <ContentTabSwiper
                            index={0}
                            status="active"
                            title="Technology for Circular Products"
                            list={tabsData.technology.items}
                            hideOverflow={true}
                        />
                    )}
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}
