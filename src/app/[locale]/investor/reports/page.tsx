import Navbar from "@/components/global/Navbar"
import { ReportsJumbotron } from "../_components/ReportsJumbotron"
import ReportsHistory from "../_components/ReportsHistory"
import { PaginationHandlerResponse } from "@/lib/types"
import { CategoryDocument, MetaDocumentItem } from "@/lib/fragment"
import { getDocuments, getDocumentsCategories, getPage } from "@/lib/api"
import { Suspense } from "react"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("investor-report")
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

export default async function ReportsPage() {
  const data = await getPage("investor-report")
  const dataCategories: CategoryDocument[] = await getDocumentsCategories(
    "?document_page=investor_reports"
  )

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <ReportsJumbotron {...data?.meta.banner} />}
      <Suspense>
        <ReportsHistory dataCategories={dataCategories} />
      </Suspense>
    </>
  )
}
