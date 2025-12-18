"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const KOLASE_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>KOLASE Program</strong></h2>
            <p>Kolaborasi Pengelolaan Sampah Ekonomi Sirkular di Sekolah Cilegon (KOLASE) is a strategic initiative fostering circular economy education in schools. By engaging students and teachers, we are building a foundation for sustainable habits from an early age.</p>
            <p>The program includes curriculum integration, waste sorting competitions, and school-wide recycling projects, ensuring that the principles of reduce, reuse, and recycle are practical and accessible.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Student Engagement</strong></h2>
            <p>We provide tools and training to schools to help them manage their waste independently. By turning waste into educational opportunities, we help students understand the value of resources and their role in protecting the environment.</p>
        `
    }
]


export default function StakeholdersTabs() {
    return (
        <Tabs defaultValue="kolase" className="min-h-[25vh]">
            <TabsList className="container mb-6 flex w-full flex-row">
                <TabsTrigger value="kolase" className="min-w-fit">KOLASE</TabsTrigger>

            </TabsList>

            <TabsContent value="kolase">
                <div className="grid grid-cols-1">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="KOLASE Program"
                        list={KOLASE_ITEMS}
                        hideOverflow
                    />
                </div>
            </TabsContent>
        </Tabs>
    )
}
