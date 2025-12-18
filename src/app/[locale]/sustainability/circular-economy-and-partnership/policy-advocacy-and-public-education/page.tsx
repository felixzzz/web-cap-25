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
import PolicyTabs from "./PolicyTabs"

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
            "Policy Advocacy and Public Education",
            "Advokasi Kebijakan dan Edukasi Publik"
        ),
        description: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
        ),
    }
}

export default async function PolicyAdvocacyPage({
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
                    title_en="Advocacy & Education"
                    title_id="Advokasi & Edukasi"
                    description_en="Empowering society through environmental awareness and advocating for policy frameworks that accelerate Indonesia's transition to a circular economy."
                    description_id="Memberdayakan masyarakat melalui kesadaran lingkungan dan mengadvokasi kerangka kebijakan yang mempercepat transisi Indonesia ke ekonomi sirkular."
                />
            )}

            <SubMenuGrid />

            <div className="container py-10">
                <PolicyTabs />
            </div>
        </>
    )
}
