import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import Navbar from "@/components/global/Navbar"
import { Link } from "@/navigation"
import { getPage } from "@/lib/api"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
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
            {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
            {data?.meta?.content_left_right && (
                <ContentLeftRightBlock {...data?.meta.content_left_right} />
            )}
            {data?.meta?.icon_list_horizontal && (
                <IconListhorizontalBlock {...data?.meta.icon_list_horizontal} />
            )}

            {/* Sitemap Links for Development/Verification */}
            <div className="container py-10">
                <h2 className="text-2xl font-bold mb-6 text-primary">Sitemap Index (For Verification)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sitemap Links for Development/Verification */}
                    <div className="container py-10">
                        <h2 className="text-2xl font-bold mb-6 text-primary">Sitemap Index (For Verification)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Link href="/sustainability/circular-economy-and-partnership/policy-advocacy-and-public-education" className="text-xl font-bold text-patrick-blue hover:underline block mb-2">
                                    Policy Advocacy and Public Education
                                </Link>
                                {/* Sub-pages are now tabs within the main page */}
                            </div>

                            <div>
                                <Link href="/sustainability/circular-economy-and-partnership/end-to-end-waste-management-model" className="text-xl font-bold text-patrick-blue hover:underline block mb-2">
                                    End-To-End Waste Management Model
                                </Link>
                                {/* Sub-pages are now tabs within the main page */}
                            </div>

                            <div>
                                <Link href="/sustainability/circular-economy-and-partnership/technology-for-circular-products" className="text-xl font-bold text-patrick-blue hover:underline block mb-2">
                                    Technology for Circular Products
                                </Link>
                                {/* Sub-pages are now tabs within the main page */}
                            </div>

                            <div>
                                <Link href="/sustainability/circular-economy-and-partnership/stakeholders-partnership" className="text-xl font-bold text-patrick-blue hover:underline block mb-2">
                                    Stakeholders Partnership
                                </Link>
                                {/* Sub-pages are now tabs within the main page */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {data?.meta?.content_left_right_2 && (
                <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
            )}
            {isContentActive(
                params.locale,
                data?.meta?.contant_tab?.status_en,
                data?.meta?.contant_tab?.status_id
            ) && <ContentTab {...data?.meta.contant_tab} />}
            {data?.meta?.small_banner && (
                <SmallBannerBlock {...data?.meta.small_banner} />
            )}
        </>
    )
}
