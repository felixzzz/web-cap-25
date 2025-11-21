import Navbar from "@/components/global/Navbar"
import PolicyContent from "./_components/PolicyContent"
import { MetaDocumentItem } from "@/lib/fragment"
import { getDocuments } from "@/lib/api"
import { PaginationHandlerResponse } from "@/lib/types"
import { Suspense } from "react"

export const revalidate = 60

export default async function GovernancePolicyPage() {
  const dataDocumentsPolicy: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments(
      "?per_page=5&document_page=governance&page=1&section=policy&order=ASC"
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
