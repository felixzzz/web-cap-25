import { Metadata } from "next"
import { getAlternates } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import PolicyContent from "./_components/PolicyContent"
import { MetaDocumentItem } from "@/lib/fragment"
import { getDocuments } from "@/lib/api"
import { PaginationHandlerResponse } from "@/lib/types"
import { Suspense } from "react"
import { urlEncodedString } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    alternates: getAlternates(locale, "/governance/policy"),
  }
}

export default async function GovernancePolicyPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    search?: string
  }
}) {
  const page = searchParams?.page || "1"
  const search = searchParams?.search || ""

  const dataDocumentsPolicy: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments(
      `?${urlEncodedString({
        per_page: 10,
        document_page: "governance",
        section: "policy",
        order: "ASC",
        page,
        search,
      })}`
    )

  return (
    <>
      <div className="mt-16">
        <Navbar isBackgroundWhite />
        <Suspense>
          <PolicyContent dataDocumentsPolicy={dataDocumentsPolicy} />
        </Suspense>
      </div>
    </>
  )
}
