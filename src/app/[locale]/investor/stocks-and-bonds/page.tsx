import Navbar from "@/components/global/Navbar"
import StocksAndBondsContent from "./_components/StocksAndBondsContent"
import { StocksAndBondsJumbotron } from "./_components/StocksAndBondsJumbotron"
import { getPage } from "@/lib/api"
import { HttpGeneralResponse, InvestorStocksAndBondsProps } from "@/lib/types"
import { getLocalizedContent } from "@/lib/utils"
import { Metadata } from "next"

import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("stocks-and-bonds")
  return {
    title: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_title_en,
      data?.meta?.seo_meta?.meta_title_id
    ),
    description: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
  }
}

export default async function InvestorStocksAndBondsPage() {
  const data: HttpGeneralResponse<InvestorStocksAndBondsProps> =
    await getPage("stocks-and-bonds")
  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <StocksAndBondsJumbotron {...data?.meta.banner} />}
      {data?.meta?.investor_content && (
        <StocksAndBondsContent {...data?.meta.investor_content} />
      )}
    </>
  )
}
