"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const RDF_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>RDF (Refuse Derived Fuel)</strong></h2>
            <p>Our RDF facility in Cilacap and Cilegon transforms municipal solid waste into high-quality alternative fuel. By processing combustible waste that would otherwise end up in landfills, we produce a renewable energy source for cement kilns, significantly reducing carbon emissions and dependency on fossil fuels.</p>
            <p>This initiative not only solves the urban waste problem but also supports the industrial transition towards sustainable energy practices.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Waste-to-Energy Process</strong></h2>
            <p>The RDF production process involves sorting, drying, and shredding municipal waste to create a fuel with consistent calorific value. This bypasses the need for coal in heavy industry, providing a circular solution for non-recyclable materials.</p>
        `
    }
]

const IPST_ASARI_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>IPST Asari</strong></h2>
            <p>IPST Asari (Integrated Waste Processing Station) is our community-based waste management flagship. Located in Cilegon, it empowers local communities to sort and process plastic waste into valuable pyrolysis oil. This "waste-to-wealth" model provides economic incentives while ensuring plastic never reaches the ocean.</p>
            <p>The facility serves as a blueprint for scalable, community-led circular economy initiatives across Indonesia.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Community Empowerment</strong></h2>
            <p>Beyond waste processing, IPST Asari provides training and employment for local residents. By professionalizing waste management at the community level, we help build a sustainable livelihood ecosystem centered around circularity.</p>
        `
    }
]

const TANARA_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Tanara Waste Management</strong></h2>
            <p>Our Tanara project implements a systematic approach to rural waste management. By establishing collection points and processing hubs in Serang Regency, we prevent open burning and illegal dumping, protecting the local ecosystem and public health.</p>
            <p>This project emphasizes the importance of infrastructure in regions where formal waste services are often limited.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>Eco-Restoration</strong></h2>
            <p>By effectively managing waste in the Tanara area, we help restore the natural beauty and health of the Ciujung river basin. Clean environments lead to healthier communities and preserve biodiversity for future generations.</p>
        `
    }
]

const SAGARA_ITEMS = [
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/Z0OvtXvcCuOfrJTpjNnrCcIZ7O7GUz3XYVt7mRO6.jpg",
        description: `
            <h2><strong>SAGARA</strong></h2>
            <p>SAGARA is our coastal and marine waste management program. Working with local fishermen and coastal communities, we collect ocean-bound plastics and reintegrate them into the circular value chain. This program directly supports the Indonesian government's goal to reduce marine plastic debris by 70% by 2025.</p>
            <p>Through SAGARA, we protect marine biodiversity while creating livelihoods for coastal families.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Marine Conservation</strong></h2>
            <p>Every ton of plastic collected through SAGARA is a step towards cleaner oceans. We focus on "leaking" points where waste enters the sea, implementing collection traps and community education to stop plastic pollution at its source.</p>
        `
    }
]

export default function EndToEndTabs() {
    return (
        <Tabs defaultValue="rdf" className="min-h-[25vh]">
            <TabsList className="container mb-6 flex w-full flex-row">
                <TabsTrigger value="rdf" className="min-w-fit">RDF</TabsTrigger>
                <TabsTrigger value="ipst-asari" className="min-w-fit">IPST Asari</TabsTrigger>
                <TabsTrigger value="tanara-waste-management" className="min-w-fit">Tanara Waste Management</TabsTrigger>
                <TabsTrigger value="sagara" className="min-w-fit">SAGARA</TabsTrigger>
            </TabsList>

            <TabsContent value="rdf">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="RDF (Refuse Derived Fuel)"
                    list={RDF_ITEMS}
                    hideOverflow
                />
            </TabsContent>

            <TabsContent value="ipst-asari">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="IPST Asari"
                    list={IPST_ASARI_ITEMS}
                    hideOverflow
                />
            </TabsContent>

            <TabsContent value="tanara-waste-management">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="Tanara Waste Management"
                    list={TANARA_ITEMS}
                    hideOverflow
                />
            </TabsContent>

            <TabsContent value="sagara">
                <ContentTabSwiper
                    index={0}
                    status="active"
                    title="SAGARA"
                    list={SAGARA_ITEMS}
                    hideOverflow
                />
            </TabsContent>
        </Tabs>
    )
}

