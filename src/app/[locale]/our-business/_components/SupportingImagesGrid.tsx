import Image from "next/image"
import { assetUrl, cn } from "@/lib/utils"

type SupportingImage = {
    image: string
    alt: string
}

type Props = {
    images: SupportingImage[]
    className?: string
}

export default function SupportingImagesGrid({ images, className }: Props) {
    if (!images || images.length === 0) return null

    const gridClassName = cn(
        "grid gap-4 mt-8",
        {
            "grid-cols-1": images.length === 1,
            "grid-cols-1 md:grid-cols-2": images.length === 2,
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": images.length === 3,
            "grid-cols-2": images.length === 4,
        },
        className
    )

    return (
        <div className={gridClassName}>
            {images.map((img, index) => (
                <div key={index} className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                        src={assetUrl(img.image) || ""}
                        alt={img.alt || `Supporting image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            ))}
        </div>
    )
}
