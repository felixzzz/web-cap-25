import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import EndToEndTabs from "./EndToEndTabs"
import { SubMenuGrid } from "../_components/SubMenuGrid"

export const revalidate = 60

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: "en" | "id" }
}) {
    const data: HttpGeneralResponse<BusinessSolutionsProp> =
        await getPage("energy")
    return {
        title: getLocalizedContent(
            locale,
            "End-To-End Waste Management Model",
            "Model Pengelolaan Sampah End-To-End"
        ),
        description: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
        ),
    }
}

export default async function EndToEndWasteManagementPage({
    params,
}: {
    params: { locale: "en" | "id" }
}) {
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
                    title_en="End-to-End Waste Management"
                    title_id="Model Pengelolaan Sampah Terpadu"
                    description_en="Building a sustainable ecosystem where every piece of waste is a resource. Our integrated model combines technology, community, and strategy to achieve zero waste."
                    description_id="Membangun ekosistem berkelanjutan di mana setiap sampah adalah sumber daya. Model terintegrasi kami menggabungkan teknologi, komunitas, dan strategi untuk mencapai zero waste."
                />
            )}

            <SubMenuGrid />

            <div className="container py-10">
                <EndToEndTabs />
            </div>
        </>
    )
}
