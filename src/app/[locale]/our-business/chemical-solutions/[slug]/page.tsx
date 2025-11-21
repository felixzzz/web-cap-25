import Navbar from "@/components/global/Navbar"
import { ProductSolutions } from "../../_components/ProductSolutions"
import {
  DetailChemicalSolutionsProps,
  HttpGeneralResponse,
  PaginationHandlerResponse,
} from "@/lib/types"
import { getDetailPost, getPostList, getProducts } from "@/lib/api"
import { BannerBlock } from "@/components/block/BannerBlock"
import { notFound } from "next/navigation"
import { ProductDatasheet } from "../../_components/ProductDatasheet"
import { ProductChemical } from "@/lib/fragment"
import ProductList from "../../_components/ProductList"
import { getLocalizedContent } from "@/lib/utils"

export async function generateStaticParams({ params: { locale } } : { params: { locale: string } }) {
  const projects: PaginationHandlerResponse<{ slug: string }[]> =
    await getPostList(`?type=products`)

  return projects.data.map((item) => ({
    slug: item.slug,
    locale
  }))
}

export const revalidate = 60

export async function generateMetadata({ params: { slug, locale } }: {
  params: { slug: string, locale: string }
}) {
  const data: HttpGeneralResponse<DetailChemicalSolutionsProps> = await getDetailPost(slug)

  return {
    title: getLocalizedContent(
      locale,
      data?.meta.seo_meta?.meta_title_en,
      data?.meta.seo_meta?.meta_title_id
    ),
    description: getLocalizedContent(
      locale,
      data?.meta.seo_meta?.meta_desc_en,
      data?.meta.seo_meta?.meta_desc_id
    ),
  }
}

export default async function DetailChemicalSolutionsPage({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  const data: HttpGeneralResponse<DetailChemicalSolutionsProps> =
    await getDetailPost(slug)
  const dataCategories: ProductChemical[] = await getProducts()

  if (!data) return notFound()

  return (
    <>
      <Navbar isBackgroundWhite />
      {dataCategories?.length > 0 && (
        <ProductList slug={slug} dataCategories={dataCategories} />
      )}
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} hideLoadingVertical />}
      {data?.meta?.product_datasheet && (
        <ProductSolutions {...data?.meta.product_datasheet} />
      )}
      {data?.meta?.product_datasheet2 && (
        <ProductDatasheet
          {...data?.meta.product_datasheet2}
          className="bg-slate-50"
        />
      )}
      {/* {data?.meta?.product_datasheet3 && (
        <ProductSolutions
          {...data?.meta.product_datasheet3}
          className="bg-slate-50"
        />
      )} */}
    </>
  )
}
