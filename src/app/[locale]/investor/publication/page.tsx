import Navbar from "@/components/global/Navbar"
import { PublicationJumbotron } from "../_components/PublicationJumbotron"
import PublicationDownloads from "../_components/PublicationDownloads"
import { CategoryDocument, MetaDocumentItem } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import { getDocuments, getDocumentsCategories, getPage } from "@/lib/api"
import { Suspense } from "react"
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
  const data = await getPage("publications-for-investors")
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

export default async function PublicationPage({
  searchParams,
}: {
  searchParams: {
    page: string
    category_id: string
    search: string
    year: string
  }
}) {
  const data = await getPage("publications-for-investors")
  const dataCategories: CategoryDocument[] = await getDocumentsCategories(
    "?document_page=investor_publicatios"
  )
  const dataPublications: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments(
      `?per_page=5&document_page=investor_publicatios&page=${searchParams.page}&order=DESC&sort=published_at&category_id=${searchParams.category_id || dataCategories?.[0]?.id}&search=${searchParams.search || ""}&release_year=${searchParams.year || "all"}`
    )

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <PublicationJumbotron {...data?.meta.banner} />}
      <Suspense>
        <PublicationDownloads
          data={dataPublications}
          dataCategories={dataCategories}
        />
      </Suspense>
    </>
  )
}
