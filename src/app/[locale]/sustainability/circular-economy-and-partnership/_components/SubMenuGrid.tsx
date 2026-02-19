"use client"
import { CardItem } from "@/components/global/CardItem"
import { imgTempCardItem, imgTempCardItem2, imgTempJumbotron, imgTempCardMobile } from "@/data/images"
import { useLocale } from "next-intl"

export function SubMenuGrid() {
    const locale = useLocale()
    return (
        <div className="bg-surface">
            <div className="container overflow-clip pb-5 pt-6 lg:py-20">
                <div className="mt-6 grid grid-cols-2 gap-4 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-6">
                    <CardItem
                        href={`/${locale}/sustainability/circular-economy-and-partnership/policy-advocacy-and-public-education`}
                        title="Public Education"
                        desc="Empowering change through policy reform and public awareness to build a culture of sustainability."
                        bg={imgTempCardMobile}
                        cta_label="Learn More"
                        alt="Public Education"
                    />
                    <CardItem
                        href={`/${locale}/sustainability/circular-economy-and-partnership/end-to-end-waste-management-model`}
                        title="End-to-end Waste Management Model"
                        desc="Revolutionizing waste processing with a holistic, zero-waste approach that turns refuse into renewable resources."
                        bg={imgTempCardItem}
                        cta_label="Discover More"
                        alt="End-to-end Waste Management Model"
                    />
                    <CardItem
                        href={`/${locale}/sustainability/circular-economy-and-partnership/technology-for-circular-products`}
                        title="Technology for Circular Products"
                        desc="Engineering the future with cutting-edge technology to create durable, recyclable, and sustainable materials."
                        bg={imgTempCardItem2}
                        cta_label="Explore Tech"
                        alt="Technology for Circular Products"
                    />
                </div>
            </div>
        </div>
    )
}
