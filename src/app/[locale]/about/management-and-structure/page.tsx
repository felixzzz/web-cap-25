import Navbar from "@/components/global/Navbar"
import AboutManagementJumbotron from "./_components/AboutManagementJumbotron"
import AboutManagementStructure from "./_components/AboutManagementStructure"
import AboutManagementDownload from "./_components/AboutManagementDownload"
import {
  HttpGeneralResponse,
  ManagementAndStructureProps,
  PaginationHandlerResponse,
} from "@/lib/types"
import { getDetailPost, getDocuments, getPage, getPostList } from "@/lib/api"
import { Metadata } from "next"
import { MetaDocumentItem, MetaTopics, PostManagement } from "@/lib/fragment"
import { Suspense } from "react"
import { getLocalizedContent } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("management-and-structure")
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

export default async function ManagementAndStructurePage() {
  const data: HttpGeneralResponse<ManagementAndStructureProps> = await getPage(
    "management-and-structure"
  )
  const dataAboutDownload: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments(`?per_page=4&document_page=management_structure`)
  const dataCategories: MetaTopics[] = await getDetailPost(
    "categories?sort=sort&order=ASC&type=managements"
  )

  return (
    <>
      <Navbar />
      {data?.meta?.banner && (
        <AboutManagementJumbotron {...data?.meta.banner} />
      )}
      <Suspense>
        {data?.meta?.management && data?.meta?.structure && (
          <AboutManagementStructure
            dataCategories={dataCategories}
            management={{ ...data?.meta.management }}
            structure={{ ...data?.meta.structure }}
          />
        )}
      </Suspense>
      {data?.meta?.download && (
        <AboutManagementDownload
          dataAboutDownload={dataAboutDownload?.data}
          {...data?.meta?.download}
        />
      )}
    </>
  )
}
