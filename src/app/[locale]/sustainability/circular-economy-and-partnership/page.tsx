import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import { CardItem } from "@/components/global/CardItem"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"

import Link from "next/link"
import Image from "next/image"
import { imgCircularEconomyMapLevel } from "@/data/images"
import CircularEconomyTabs from "./_components/CircularEconomyTabs"
import { EnvironmentPerformance } from "../environment/_components/EnvironmentPerfornamce"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
import {
    SmallPopup,
} from "@/lib/fragment"
import { notFound } from "next/navigation"
import { getLocalizedContent, isContentActive, assetUrl } from "@/lib/utils"



import ContentTab from "@/app/[locale]/our-business/_components/ContentTab"

export const revalidate = 60

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: "en" | "id" }
}) {
    // Fetching actual data
    const data: HttpGeneralResponse<BusinessSolutionsProp> =
        await getPage("circular-economy-and-partnership")
    return {
        title: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_title_en || data?.meta?.banner?.title_en || data?.title_en || data?.title,
            data?.meta?.seo_meta?.meta_title_id || data?.meta?.banner?.title_id || data?.title_id || data?.title
        ),
        description: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
        ),
    }
}

export default async function CircularEconomyPage({
    params,
}: {
    params: { locale: "en" | "id" }
}) {
    // Fetching actual data
    const data: HttpGeneralResponse<BusinessSolutionsProp> =
        await getPage("circular-economy-and-partnership")

    if (!data) {
        return notFound()
    }

    return (
        <>
            <Navbar />
            {data?.meta?.banner && (
                <BannerBlock
                    {...data?.meta.banner}
                />
            )}
            {data?.meta?.content_left_right && (
                <ContentLeftRightBlock {...data?.meta.content_left_right} />
            )}
            {/* Key Pillars Section Removed */}
            {/* Environmental Performance Section */}
            {data?.meta?.environmental_performance && (
                <EnvironmentPerformance {...data.meta.environmental_performance} />
            )}


            {/* Submenu Grid Section representation */}
            <div className="py-10">
                <div className="container mx-auto mb-10 w-full">
                    <Image
                        width={1240}
                        height={600}
                        src={
                            (params.locale === "en"
                                ? data?.meta?.circular_economy_intro?.image_en
                                : data?.meta?.circular_economy_intro?.image_id)
                                ? assetUrl(
                                    (params.locale === "en"
                                        ? data?.meta?.circular_economy_intro?.image_en
                                        : data?.meta?.circular_economy_intro?.image_id) || null
                                )!
                                : imgCircularEconomyMapLevel
                        }
                        alt="Circular Economy Map"
                        className="w-full rounded-3xl object-cover"
                    />
                </div>
                {/* Pass the tabs data from the API response */}
                {/* Pass the tabs data from the API response */}
                {data?.meta && (
                    <CircularEconomyTabs
                        reportButton={{
                            label: params.locale === "en" ? data.meta.circular_economy_intro?.cta_label_en || "Discover our circular economy report" : data.meta.circular_economy_intro?.cta_label_id || "Discover our circular economy report",
                            url: params.locale === "en" ? data.meta.circular_economy_intro?.cta_url_en || `/${params.locale}/sustainability/reports-and-publications` : data.meta.circular_economy_intro?.cta_url_id || `/${params.locale}/sustainability/reports-and-publications`
                        }}
                        tabsData={{
                            policy: {
                                performance: data.meta.policy_performance,
                                // @ts-ignore
                                items:
                                    params.locale === "en"
                                        ? data.meta.policy_items?.items_en
                                        : data.meta.policy_items?.items_id,
                            },
                            "end-to-end": {
                                performance: data.meta.end_to_end_performance,
                                // @ts-ignore
                                items:
                                    params.locale === "en"
                                        ? data.meta.end_to_end_items?.items_en
                                        : data.meta.end_to_end_items?.items_id,
                            },
                            technology: {
                                performance: data.meta.technology_performance,
                                // @ts-ignore
                                items:
                                    params.locale === "en"
                                        ? data.meta.technology_items?.items_en
                                        : data.meta.technology_items?.items_id,
                            },
                        }}
                    />
                )}
            </div>
        </>
    )
}
