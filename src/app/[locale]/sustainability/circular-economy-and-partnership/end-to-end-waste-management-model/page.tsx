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
            {data?.meta?.banner && <BannerBlock {...data?.meta.banner} title="End-To-End Waste Management Model" />}

            <div className="container py-10">
                <Tabs defaultValue="rdf" className="w-full">
                    <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
                        <TabsTrigger value="rdf" className="min-w-fit">RDF</TabsTrigger>
                        <TabsTrigger value="ipst-asari" className="min-w-fit">IPST Asari</TabsTrigger>
                        <TabsTrigger value="tanara-waste-management" className="min-w-fit">Tanara Waste Management</TabsTrigger>
                        <TabsTrigger value="sagara" className="min-w-fit">SAGARA</TabsTrigger>
                    </TabsList>

                    <TabsContent value="rdf">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">RDF (Refuse Derived Fuel)</h2>
                            <p>Content for RDF goes here. Utilizing waste as an alternative energy source for cement production processes.</p>
                            {/* Placeholder content mirroring structure */}
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                RDF Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="ipst-asari">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">IPST Asari</h2>
                            <p>Integrated Waste Management Site (IPST) ASARI content goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                IPST Asari Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="tanara-waste-management">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Tanara Waste Management</h2>
                            <p>Waste Management in National Religious Tourism Destinations.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                Tanara Waste Management Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="sagara">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">SAGARA</h2>
                            <p>Content for SAGARA goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                SAGARA Content Area
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
