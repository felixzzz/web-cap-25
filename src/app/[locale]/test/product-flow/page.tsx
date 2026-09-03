import { Metadata } from "next"
import Navbar from "@/components/global/Navbar"
import { ProductFlowContainer } from "./_components/ProductFlowContainer"
import { PRODUCT_FLOW_DATA } from "./_data/productFlowData"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isId = locale === "id"
  const title = isId
    ? PRODUCT_FLOW_DATA.meta.title.id
    : PRODUCT_FLOW_DATA.meta.title.en
  const description = isId
    ? PRODUCT_FLOW_DATA.meta.description.id
    : PRODUCT_FLOW_DATA.meta.description.en

  return {
    title: `${title} | Chandra Asri Group`,
    description,
    openGraph: {
      title: `${title} | Chandra Asri Group`,
      description,
    },
  }
}

export default function ProductFlowPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = (locale === "id" ? "id" : "en") as "id" | "en"

  return (
    <main className="min-h-screen bg-[#F7F8FA] pt-16">
      <Navbar isBackgroundWhite />
      <ProductFlowContainer locale={currentLocale} />
    </main>
  )
}
