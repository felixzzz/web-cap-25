"use client"

import Image from "next/image"
import Link from "next/link"
import { assetUrl } from "@/lib/utils"

interface ProductCatalogBanner {
    status: "active" | "inactive"
    banner_image: string
    banner_image_alt?: string
    pdf_file: string
}

interface ProductCatalogBannersProps {
    banners: ProductCatalogBanner[]
}

export default function ProductCatalogBanners({
    banners,
}: ProductCatalogBannersProps) {
    // Handle both direct array and nested object structure from CMS
    let bannersArray: any[] = []

    try {
        if (Array.isArray(banners)) {
            bannersArray = banners
        } else if (typeof banners === 'string') {
            // Handle case where CMS returns JSON string
            const parsed = JSON.parse(banners)
            bannersArray = Array.isArray(parsed) ? parsed : (parsed?.product_catalog_banners || parsed?.product_catalog_banners_id || parsed?.product_catalog_banners_en || [])
        } else if (banners && typeof banners === 'object') {
            // Handle nested object structure from CMS (usually has language suffixes)
            const b = banners as any
            bannersArray = b.product_catalog_banners || b.product_catalog_banners_id || b.product_catalog_banners_en || []
        }
    } catch (e) {
        bannersArray = []
    }

    // Filter only active banners (permissive check for status)
    const activeBanners = bannersArray?.filter((b: any) =>
        b.status === "active" || b.status === "Active" || b.status === true
    ) || []

    if (activeBanners.length === 0) {
        return null
    }

    return (
        <section className="container mx-auto px-4 py-12">
            {/* Banners Grid - 2x2 on desktop, 1 column on mobile */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {activeBanners.map((banner, index) => (
                    <Link
                        key={index}
                        href={assetUrl(banner.pdf_file) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                    >
                        {/* Pure Banner Image - Natural height based on width */}
                        <div className="w-full overflow-hidden bg-gray-100">
                            <Image
                                src={assetUrl(banner.banner_image) || ""}
                                alt={banner.banner_image_alt || `Product Catalog ${index + 1}`}
                                width={800} // Base width for aspect ratio calculation
                                height={450} // Base height, but overridden by h-auto
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
