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
            {data?.meta?.banner && <BannerBlock {...data?.meta.banner} title="Policy Advocacy and Public Education" />}

            <div className="container py-10">
                <Tabs defaultValue="markisa" className="w-full">
                    <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
                        <TabsTrigger value="markisa" className="min-w-fit">MARKISA</TabsTrigger>
                        <TabsTrigger value="other-education-and-advocacy" className="min-w-fit">Other Education and Advocacy</TabsTrigger>
                    </TabsList>

                    <TabsContent value="markisa">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">MARKISA</h2>
                            <p>Content for MARKISA goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                MARKISA Content Area
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="other-education-and-advocacy">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Other Education and Advocacy</h2>
                            <p>Content for Other Education and Advocacy goes here.</p>
                            <div className="bg-gray-100 p-8 rounded-lg mt-4 text-center text-gray-500">
                                Other Education and Advocacy Content Area
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
