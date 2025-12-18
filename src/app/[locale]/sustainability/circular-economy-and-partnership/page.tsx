import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import { CardItem } from "@/components/global/CardItem"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"
import { SubMenuGrid } from "./_components/SubMenuGrid"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
import {
    SmallPopup,
} from "@/lib/fragment"
import { notFound } from "next/navigation"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
// Importing ContentTab from our-business as requested to mirror the energy page structure
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
            {/* Submenu Grid Section */}
            <SubMenuGrid />

            {data?.meta?.content_left_right_2 && (
                <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
            )}
        </>
    )
}
