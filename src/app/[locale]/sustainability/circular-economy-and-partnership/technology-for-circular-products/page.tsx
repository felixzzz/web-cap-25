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
import TechnologyTabs from "./TechnologyTabs"

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
            "Technology for Circular Products",
            "Teknologi untuk Produk Sirkular"
        ),
        description: getLocalizedContent(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
        ),
    }
}

export default async function TechnologyCircularProductsPage({
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
                    title_en="Innovation for a Circular Future"
                    title_id="Inovasi untuk Masa Depan Sirkular"
                    description_en="Leveraging advanced chemical recycling and innovative material engineering to turn post-consumer plastics into high-value infrastructure and products."
                    description_id="Memanfaatkan daur ulang kimia tingkat lanjut dan rekayasa material inovatif untuk mengubah plastik pasca-konsumsi menjadi infrastruktur dan produk bernilai tinggi."
                />
            )}

            <SubMenuGrid />

            <div className="container py-10">
                <TechnologyTabs />
            </div>
        </>
    )
}
