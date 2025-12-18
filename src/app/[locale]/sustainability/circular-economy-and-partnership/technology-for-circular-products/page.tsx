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
            {data?.meta?.banner && <BannerBlock {...data?.meta.banner} title="Technology for Circular Products" />}

            <div className="container py-10">
                <Tabs defaultValue="plastic-asphalt" className="w-full">
                    <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
                        <TabsTrigger value="plastic-asphalt" className="min-w-fit">Plastic Asphalt</TabsTrigger>
                        <TabsTrigger value="plastic-pyrolysis" className="min-w-fit">Plastic Pyrolysis</TabsTrigger>
                        <TabsTrigger value="internal-environmentally-friendly-products" className="min-w-fit">Internal Eco-friendly Products</TabsTrigger>
                        <TabsTrigger value="pcr-material-development" className="min-w-fit">PCR Material Development</TabsTrigger>
                    </TabsList>

                    <TabsContent value="plastic-asphalt">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Plastic Asphalt</h2>
                            <p>Content for Plastic Asphalt goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                Plastic Asphalt Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="plastic-pyrolysis">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Plastic Pyrolysis</h2>
                            <p>Content for Plastic Pyrolysis goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                Plastic Pyrolysis Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="internal-environmentally-friendly-products">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Internal Eco-friendly Products</h2>
                            <p>Content for Internal Eco-friendly Products goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                Internal Eco-friendly Products Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="pcr-material-development">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">PCR Material Development</h2>
                            <p>Content for PCR Material Development goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                PCR Material Development Content Area
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
