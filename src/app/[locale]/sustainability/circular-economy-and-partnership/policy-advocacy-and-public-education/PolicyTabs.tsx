"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MARKISA_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>MARKISA Program</strong></h2>
            <p>Our flagship MARKISA program educates students and communities about the importance of waste segregation. By integrating environmental curriculum into schools, we are raising a generation of eco-conscious citizens.</p>
            <p>The program includes teacher training, interactive workshops, and the establishment of local waste banks within school premises to provide hands-on lessons in sustainability.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Youth Empowerment</strong></h2>
            <p>Through MARKISA, we empower youth as environmental ambassadors. Students lead school-wide initiatives to reduce plastic use and manage organic waste through composting, creating a culture of sustainability that extends from classroom to home.</p>
        `
    }
]

const ADVOCACY_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Education & Advocacy</strong></h2>
            <p>We actively engage with industry associations and regulatory bodies to advocate for policies that incentivize recycling and support the development of circular infrastructure. Our focus is on Extended Producer Responsibility (EPR) frameworks and national standards for recycled content.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Regulatory Standards</strong></h2>
            <p>We collaborate with BSN (National Standardization Agency) to develop standards for recycled plastics and bio-based materials. This ensures that circular products meet safety and quality requirements, building market confidence and supporting Indonesian industries.</p>
        `
    }
]


export default function PolicyTabs() {
    return (
        <Tabs defaultValue="markisa" className="min-h-[25vh]">
            <TabsList className="container mb-6 flex w-full flex-row">
                <TabsTrigger value="markisa" className="min-w-fit">MARKISA</TabsTrigger>
                <TabsTrigger value="advocacy" className="min-w-fit">Education &  Advocacy</TabsTrigger>

            </TabsList>

            <TabsContent value="markisa">
                <div className="grid grid-cols-1">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="MARKISA Program"
                        list={MARKISA_ITEMS}
                        hideOverflow
                    />
                </div>
            </TabsContent>

            <TabsContent value="advocacy">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="Policy Advocacy"
                    list={ADVOCACY_ITEMS}
                    hideOverflow
                />
            </TabsContent>

        </Tabs>
    )
}
