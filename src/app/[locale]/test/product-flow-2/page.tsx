import { Metadata } from "next"
import Navbar from "@/components/global/Navbar"
import { ProductFlow2Container } from "./_components/ProductFlow2Container"
import { PRODUCT_FLOW_2_DATA } from "./_data/productFlow2Data"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isId = locale === "id"
  const title = isId
    ? `${PRODUCT_FLOW_2_DATA.meta.title.id} | Chandra Asri Group`
    : `${PRODUCT_FLOW_2_DATA.meta.title.en} | Chandra Asri Group`
  const description = isId
    ? PRODUCT_FLOW_2_DATA.meta.description.id
    : PRODUCT_FLOW_2_DATA.meta.description.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default function ProductFlow2Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = (locale === "id" ? "id" : "en") as "id" | "en"

  return (
    <main className="min-h-screen bg-[#F7F8FA] pt-16">
      <Navbar isBackgroundWhite />
      <ProductFlow2Container locale={currentLocale} />
    </main>
  )
}
