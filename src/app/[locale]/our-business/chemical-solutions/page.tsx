import Navbar from "@/components/global/Navbar"
import { ChemicalSolutionsProduct } from "../_components/ChemicalSolutionsProduct"
import { ChemicalExplore } from "../_components/ChemicalExplore"
import { ChemicalFacilities } from "../_components/ChemicalFacilities"
import {
  ChemicalSolutionsProps,
  HttpGeneralResponse,
  PaginationHandlerResponse,
} from "@/lib/types"
import { getPage, getPostList } from "@/lib/api"
import { BannerBlock } from "@/components/block/BannerBlock"
import { IntroBlock } from "@/components/block/IntroBlock"
import { OurBusinessDocumentBlock } from "@/components/block/our-business/DocumentBlock"
import { MetaProduct } from "@/lib/fragment"
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
  const data = await getPage("petrochemical-solution-overview")
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

export default async function ChemicalSolutionsPage() {
  const data: HttpGeneralResponse<ChemicalSolutionsProps> = await getPage(
    "petrochemical-solution-overview"
  )
  const dataProducts: PaginationHandlerResponse<MetaProduct[]> =
    await getPostList("?limit=16&sort=sort&order=ASC&type=products")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />

      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && (
        <IntroBlock {...data?.meta?.intro} {...data?.meta?.embedded_video} />
      )}
      {data?.meta?.product && (
        <ChemicalSolutionsProduct
          dataProducts={dataProducts?.data}
          {...data?.meta.product}
        />
      )}
      {data?.meta?.production_flow && (
        <ChemicalExplore {...data?.meta.production_flow} />
      )}
      {data?.meta?.facilities && (
        <ChemicalFacilities {...data?.meta.facilities} />
      )}
      {data?.meta?.document && (
        <OurBusinessDocumentBlock {...data?.meta.document} />
      )}
    </>
  )
}
