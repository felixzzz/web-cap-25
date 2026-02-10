import { BannerBlock } from "@/components/block/BannerBlock"
import Navbar from "@/components/global/Navbar"
import ReportContent from "./_components/ReportContent"
import {
  DocumentsCategories,
  HttpGeneralResponse,
  ReportsAndPublicationsProp,
} from "@/lib/types"
import { getDocuments, getDocumentsCategories, getPage } from "@/lib/api"
import { MetaDocumentItem } from "@/lib/fragment"
import { notFound } from "next/navigation"
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
  const data = await getPage("reports-and-publications")
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

export default async function RootPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const dataDocuments: { data: MetaDocumentItem[] } = await getDocuments(
    `?per_page=999&document_page=sustainability_reports&order=DESC&lang=${locale}&sort=published_at`
  )
  const data: HttpGeneralResponse<ReportsAndPublicationsProp> = await getPage(
    "reports-and-publications"
  )
  const dataDocumentsCategories: DocumentsCategories[] =
    await getDocumentsCategories(
      `?document_page=sustainability_reports&section=document`
    )

  if (!data) {
    return notFound()
  }

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar
        isBackgroundWhite={
          getLocalizedContent(
            locale,
            data?.meta?.banner?.status_en,
            data?.meta?.banner?.status_id
          ) === "inactive"
        }
      />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {dataDocuments?.data.length > 0 &&
        getLocalizedContent(
          locale,
          data?.meta?.document?.status_en,
          data?.meta?.document?.status_id
        ) === "active" && (
          <ReportContent
            categories={dataDocumentsCategories}
            documents={dataDocuments?.data}
          />
        )}
    </>
  )
}
