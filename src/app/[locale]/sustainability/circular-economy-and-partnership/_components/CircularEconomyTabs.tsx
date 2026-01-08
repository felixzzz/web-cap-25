"use client"

import ContentTabSwiper from "@/app/[locale]/our-business/_components/ContentTabSwiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "next-intl"
import { EnvironmentPerformance } from "../../environment/_components/EnvironmentPerfornamce"

// --- Performance Dummy Data ---
const POLICY_PERFORMANCE_DATA = {
    title_en: "Policy Impact",
    title_id: "Dampak Kebijakan",
    description_en: "<p>Driving systemic change through advocacy and education.</p>",
    description_id: "<p>Mendorong perubahan sistemik melalui advokasi dan edukasi.</p>",
    status_en: "active",
    status_id: "active",
    numbers_en: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "50+",
            title: "Policy Sessions",
            small_title: "Year 2024",
        },
        {
            icon: "images/post/kHXSynkVg600OWmFr1bUsuLfruIazSB7VDaQ3Ro1.png",
            number: "10k+",
            title: "Students Reached",
            small_title: "Year 2024",
        },
    ],
    numbers_id: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "50+",
            title: "Sesi Kebijakan",
            small_title: "Tahun 2024",
        },
        {
            icon: "images/post/kHXSynkVg600OWmFr1bUsuLfruIazSB7VDaQ3Ro1.png",
            number: "10rb+",
            title: "Siswa Terjangkau",
            small_title: "Tahun 2024",
        }
    ],
}

const END_TO_END_PERFORMANCE_DATA = {
    title_en: "Waste Management Performance",
    title_id: "Kinerja Pengelolaan Limbah",
    description_en: "<p>Turning waste into resources through a full circular loop.</p>",
    description_id: "<p>Mengubah limbah menjadi sumber daya melalui putaran sirkular penuh.</p>",
    status_en: "active",
    status_id: "active",
    numbers_en: [
        {
            icon: "images/post/VN5h4GuCSuOR2XS9yN1ahuDDLqBx57Aiam5th1Fw.png",
            number: "20k Tons",
            title: "Waste Processed",
            small_title: "Cumulative",
        },
        {
            icon: "images/post/3PrIyoUnjgICFr5tJFkmMiBmLW66cCcJUgr5gdLQ.png",
            number: "85%",
            title: "Resource Recovery",
            small_title: "Rate",
        }
    ],
    numbers_id: [
        {
            icon: "images/post/VN5h4GuCSuOR2XS9yN1ahuDDLqBx57Aiam5th1Fw.png",
            number: "20rb Ton",
            title: "Limbah Diproses",
            small_title: "Kumulatif",
        },
        {
            icon: "images/post/3PrIyoUnjgICFr5tJFkmMiBmLW66cCcJUgr5gdLQ.png",
            number: "85%",
            title: "Pemulihan Sumber Daya",
            small_title: "Tingkat",
        }
    ],
}

const TECHNOLOGY_PERFORMANCE_DATA = {
    title_en: "Innovation Metrics",
    title_id: "Metrik Inovasi",
    description_en: "<p>Advanced technology driving plastic circularity.</p>",
    description_id: "<p>Teknologi canggih mendorong sirkularitas plastik.</p>",
    status_en: "active",
    status_id: "active",
    numbers_en: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "120 Km",
            title: "Plastic Roads",
            small_title: "Total Length",
        },
        {
            icon: "images/post/kHXSynkVg600OWmFr1bUsuLfruIazSB7VDaQ3Ro1.png",
            number: "15+",
            title: "Eco Products",
            small_title: "Developed",
        }
    ],
    numbers_id: [
        {
            icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
            number: "120 Km",
            title: "Jalan Plastik",
            small_title: "Total Panjang",
        },
        {
            icon: "images/post/kHXSynkVg600OWmFr1bUsuLfruIazSB7VDaQ3Ro1.png",
            number: "15+",
            title: "Produk Eko",
            small_title: "Dikembangkan",
        }
    ],
}

const STAKEHOLDERS_PERFORMANCE_DATA = {
    title_en: "Partnership Growth",
    title_id: "Pertumbuhan Kemitraan",
    description_en: "<p>Collaborating for a sustainable ecosystem.</p>",
    description_id: "<p>Berkolaborasi untuk ekosistem yang berkelanjutan.</p>",
    status_en: "active",
    status_id: "active",
    numbers_en: [
        {
            icon: "images/post/VN5h4GuCSuOR2XS9yN1ahuDDLqBx57Aiam5th1Fw.png",
            number: "100+",
            title: "Active Partners",
            small_title: "Institutional",
        },
        {
            icon: "images/post/3PrIyoUnjgICFr5tJFkmMiBmLW66cCcJUgr5gdLQ.png",
            number: "500+",
            title: "Events Held",
            small_title: "Year 2024",
        }
    ],
    numbers_id: [
        {
            icon: "images/post/VN5h4GuCSuOR2XS9yN1ahuDDLqBx57Aiam5th1Fw.png",
            number: "100+",
            title: "Mitra Aktif",
            small_title: "Institusi",
        },
        {
            icon: "images/post/3PrIyoUnjgICFr5tJFkmMiBmLW66cCcJUgr5gdLQ.png",
            number: "500+",
            title: "Acara Diadakan",
            small_title: "Tahun 2024",
        }
    ],
}

// --- End-To-End Items ---
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

// --- Technology Items ---
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
            <p>This initiative not only solves the urban waste problem but also supports the industrial transition towards sustainable energy practices.</p>
        `
    },
    {
        status: "active",
        image: "https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/iSYzauchIccP1kiw1se8eppO59SDD9mV2Lg92PjY.jpg",
        description: `
            <h2><strong>Quality Assurance</strong></h2>
            <p>Every batch of our PCR resins undergoes rigorous testing to ensure it meets international standards for mechanical strength, thermal stability, and contamination levels. Our goal is to provide circular materials that perform just as well as kanan virgin counterparts.</p>
        `
    }
]

// --- Stakeholders Items ---
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

// --- Policy Items ---
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

export default function CircularEconomyTabs() {
    const locale = useLocale()

    const END_TO_END_COMBINED = [...RDF_ITEMS, ...IPST_ASARI_ITEMS, ...TANARA_ITEMS, ...SAGARA_ITEMS]
    const TECHNOLOGY_COMBINED = [...ASPHALT_ITEMS, ...PYROLYSIS_ITEMS, ...ECO_PRODUCTS_ITEMS, ...PCR_ITEMS]
    const STAKEHOLDERS_COMBINED = [...KOLASE_ITEMS]
    const POLICY_COMBINED = [...MARKISA_ITEMS, ...ADVOCACY_ITEMS]

    return (
        <Tabs defaultValue="policy" className="min-h-[25vh]">
            <div className="container mx-auto">
                <TabsList className="min-w-fit md:min-w-fit flex-nowrap overflow-x-auto overflow-y-hidden mb-6 flex w-full flex-row">
                    <TabsTrigger value="policy" className="min-w-fit font-bold">Public Education</TabsTrigger>
                    <TabsTrigger value="end-to-end" className="min-w-fit font-bold">End-to-end Waste Management Model</TabsTrigger>
                    <TabsTrigger value="technology" className="min-w-fit font-bold">Technology for Circular Products</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="policy">
                <EnvironmentPerformance {...POLICY_PERFORMANCE_DATA} />
                <div className="container mx-auto mt-12">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="Public Education"
                        list={POLICY_COMBINED}
                        hideOverflow={true}
                    />
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="end-to-end">
                <EnvironmentPerformance {...END_TO_END_PERFORMANCE_DATA} />
                <div className="container mx-auto mt-12">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="End-to-end Waste Management Model"
                        list={END_TO_END_COMBINED}
                        hideOverflow={true}
                    />
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="technology">
                <EnvironmentPerformance {...TECHNOLOGY_PERFORMANCE_DATA} />
                <div className="container mx-auto mt-12">
                    <ContentTabSwiper
                        index={0}
                        status="active"
                        title="Technology for Circular Products"
                        list={TECHNOLOGY_COMBINED}
                        hideOverflow={true}
                    />
                    <div className="mt-8 flex justify-center">
                        <a href={`/${locale}/sustainability/reports-and-publications`} className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Discover our circular economy report
                        </a>
                    </div>
                </div>
            </TabsContent>


        </Tabs>
    )
}
