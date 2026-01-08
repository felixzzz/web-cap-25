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
import { getLocalizedContent, isContentActive } from "@/lib/utils"

const ENVIROMENTAL_PERFORMANCE_DUMMY_DATA = {
    title_en: "Environmental Performance for Sustainability",
    title_id: "Kinerja Lingkungan untuk Keberlanjutan",
    description_en: "<p>We are committed to reducing our environmental footprint through continuous improvement and innovation.</p>",
    description_id: "<p>Kami berkomitmen untuk mengurangi jejak lingkungan kami melalui perbaikan terus-menerus dan inovasi.</p>",
    status_en: "active",
    status_id: "active",
    numbers_en: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "25%",
            title: "Total Waste Managed",
            small_title: "Year 2025",
        }
    ],
    numbers_id: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "25%",
            title: "Total Limbah yang di Kelola",
            small_title: "Tahun 2025",
        }
    ],
}

import ContentTab from "@/app/[locale]/our-business/_components/ContentTab"

export const revalidate = 60

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: "en" | "id" }
}) {
    // Fetching "energy" data as a placeholder/template as requested
    const data: HttpGeneralResponse<BusinessSolutionsProp> =
        await getPage("energy")
    return {
        title: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_title_en,
            data?.meta?.seo_meta?.meta_title_id
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
    // Fetching "energy" data as a placeholder/template as requested
    const data: HttpGeneralResponse<BusinessSolutionsProp> =
        await getPage("energy")

    if (!data) {
        return notFound()
    }

    return (
        <>
            <Navbar />
            {data?.meta?.banner && (
                <BannerBlock
                    {...data?.meta.banner}
                    title_en="Circular Economy & Partnership"
                    title_id="Circular Economy & Partnership"
                    description_en="Pioneering a sustainable future through closed-loop innovation. We transform waste into valuable resources, fostering a regenerative ecosystem where economic growth meets environmental stewardship."
                    description_id="Pioneering a sustainable future through closed-loop innovation. We transform waste into valuable resources, fostering a regenerative ecosystem where economic growth meets environmental stewardship."
                />
            )}
            {data?.meta?.content_left_right && (
                <ContentLeftRightBlock {...data?.meta.content_left_right} />
            )}
            {data?.meta?.icon_list_horizontal && (
                <IconListhorizontalBlock {...data?.meta.icon_list_horizontal} />
            )}
            {/* Environmental Performance Section */}
            <EnvironmentPerformance {...ENVIROMENTAL_PERFORMANCE_DUMMY_DATA} />

            {/* Submenu Grid Section representation */}
            <div className="py-10">
                <div className="container mx-auto mb-10 w-full">
                    <Image
                        src={imgCircularEconomyMapLevel}
                        alt="Circular Economy Map"
                        className="w-full rounded-3xl object-cover"
                    />
                </div>
                <CircularEconomyTabs />
            </div>

            {data?.meta?.content_left_right_2 && (
                <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
            )}
        </>
    )
}
