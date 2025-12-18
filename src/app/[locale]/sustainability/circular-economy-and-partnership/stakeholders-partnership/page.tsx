import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import { getLocalizedContent } from "@/lib/utils"
import { SubMenuGrid } from "../_components/SubMenuGrid"
import StakeholdersTabs from "./StakeholdersTabs"

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
            "Stakeholders Partnership",
            "Kemitraan Pemangku Kepentingan"
        ),
        description: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
        ),
    }
}

export default async function StakeholdersPartnershipPage({
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
                    title_en="Collaborative Ecosystems"
                    title_id="Ekosistem Kolaboratif"
                    description_en="We believe that sustainability is a shared responsibility. We partner with governments, industries, and communities to drive systemic change."
                    description_id="Kami percaya bahwa keberlanjutan adalah tanggung jawab bersama. Kami bermitra dengan pemerintah, industri, dan masyarakat untuk mendorong perubahan sistemik."
                />
            )}

            <SubMenuGrid />

            <div className="container py-10">
                <StakeholdersTabs />
            </div>
        </>
    )
}
