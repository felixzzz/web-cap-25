import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"
import {
    BusinessSolutionsProp,
    HttpGeneralResponse,
} from "@/lib/types"
import { notFound } from "next/navigation"
import { getLocalizedContent } from "@/lib/utils"
// Use client component for Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            {data?.meta?.banner && <BannerBlock {...data?.meta.banner} title="Stakeholders Partnership" />}

            <div className="container py-10">
                <Tabs defaultValue="kolase" className="w-full">
                    <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
                        <TabsTrigger value="kolase" className="min-w-fit">KOLASE</TabsTrigger>
                    </TabsList>

                    <TabsContent value="kolase">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">KOLASE</h2>
                            <p>Content for KOLASE (Kolaborasi Pengelolaan Sampah Ekonomi Sirkular di Sekolah Cilegon) goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                KOLASE Content Area
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
