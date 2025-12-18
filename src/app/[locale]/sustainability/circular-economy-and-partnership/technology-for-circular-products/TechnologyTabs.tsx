"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ASPHALT_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Plastic Asphalt</strong></h2>
            <p>Our Plastic Asphalt initiative utilizes post-consumer plastic waste to improve road quality. By mixing processed plastic with hot-mix asphalt, we increase road durability and resistance to deformation, while simultaneously addressing the problem of non-recyclable plastic waste.</p>
            <p>To date, we have paved over 100km of roads using this sustainable technology across various regions in Indonesia.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Infrastuctural Impact</strong></h2>
            <p>The plastic asphalt technology provides a multi-layer benefit: it extends the pavement life cycle by up to 40%, reduces maintenance costs for the government, and creates a large-scale sink for low-value plastic waste that is often ignored by the recycling industry.</p>
        `
    }
]

const PYROLYSIS_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Plastic Pyrolysis</strong></h2>
            <p>Through advanced pyrolysis technology, we convert plastic waste into liquid fuel (pyrolysis oil). This process breaks down polymer chains at high temperatures in the absence of oxygen, creating a circular feedstock that can be used back in our petrochemical production or as a clean-burning industrial fuel.</p>
            <p>This technology is central to our goal of achieving a truly closed-loop system for plastics.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Chemical Recycling</strong></h2>
            <p>Unlike mechanical recycling which can degrade plastic quality over time, chemical recycling via pyrolysis allows us to return plastic to its original molecular state. This means we can produce "virgin-quality" recycled resins suitable even for sensitive applications like food packaging.</p>
        `
    }
]

const ECO_PRODUCTS_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Internal ECO Products</strong></h2>
            <p>We are integrating circular materials into our own operations. From recycled shipping pallets to eco-friendly packaging for our resins, we ensure that our internal supply chain reflects our commitment to sustainability. These products are designed for multiple lifecycles and easy recyclability.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Sustainable Office Initiatives</strong></h2>
            <p>Beyond our industrial products, we implement circularity in our offices through furniture made from recycled plastics and zero-waste catering systems. We lead by example, proving that a circular lifestyle is possible at every scale of operation.</p>
        `
    }
]

const PCR_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>PCR Material Development</strong></h2>
            <p>Our Post-Consumer Recycled (PCR) material development focuses on creating high-performance resins from domestic waste. By partnering with recyclers, we produce high-quality PCR PP and PCR PE that meet the stringent requirements of the FMCG and automotive industries, enabling our customers to meet their recycled content targets.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Quality Assurance</strong></h2>
            <p>Every batch of our PCR resins undergoes rigorous testing to ensure it meets international standards for mechanical strength, thermal stability, and contamination levels. Our goal is to provide circular materials that perform just as well as kanilang virgin counterparts.</p>
        `
    }
]

export default function TechnologyTabs() {
    return (
        <Tabs defaultValue="plastic-asphalt" className="min-h-[25vh]">
            <TabsList className="container mb-6 flex w-full flex-row">
                <TabsTrigger value="plastic-asphalt" className="min-w-fit">Plastic Asphalt</TabsTrigger>
                <TabsTrigger value="plastic-pyrolysis" className="min-w-fit">Plastic Pyrolysis</TabsTrigger>
                <TabsTrigger value="internal-eco-friendly" className="min-w-fit">Internal Eco-friendly Products</TabsTrigger>
                <TabsTrigger value="pcr-material" className="min-w-fit">PCR Material Development</TabsTrigger>
            </TabsList>

            <TabsContent value="plastic-asphalt">
                <div className="grid grid-cols-1">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="Plastic Asphalt"
                        list={ASPHALT_ITEMS}
                        hideOverflow
                    />
                </div>
            </TabsContent>

            <TabsContent value="plastic-pyrolysis">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="Plastic Pyrolysis"
                    list={PYROLYSIS_ITEMS}
                    hideOverflow
                />
            </TabsContent>

            <TabsContent value="internal-eco-friendly">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="Internal Eco-friendly Products"
                    list={ECO_PRODUCTS_ITEMS}
                    hideOverflow
                />
            </TabsContent>

            <TabsContent value="pcr-material">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="PCR Material Development"
                    list={PCR_ITEMS}
                    hideOverflow
                />
            </TabsContent>
        </Tabs>
    )
}
