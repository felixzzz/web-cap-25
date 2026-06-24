import { getAlternates, getSeoTitle } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import GovernanceJumbotron from "./_components/GovernanceJumbotron"
import GovernanceCorporate from "./_components/GovernanceCorporate"
import GovernanceInternalAudit from "./_components/GovernanceInternalAudit"
import GovernanceCommittees from "./_components/GovernanceCommittees"
import GovernanceRiskManagement from "./_components/GovernanceRiskManagement"
import GovernanceCodeOfConduct from "./_components/GovernanceCodeOfConduct"
import GovernancePolicy from "./_components/GovernancePolicy"
import GovernanceWhistleblowing from "./_components/GovernanceWhistleblowing"
import { getDocuments, getPage } from "@/lib/api"
import { GovernanceProps, HttpGeneralResponse } from "@/lib/types"
import { MetaDocumentItem } from "@/lib/fragment"
import { Metadata } from "next"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"
import GovernanceSHERegulation from "./_components/GovernanceSHERegulation"
import { PageIdSetter } from "@/components/providers/query-provider"
import JsonLdRenderer from "@/components/global/JsonLdRenderer"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("governance")
  return {
    openGraph: {
      title: getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_title_en,
      data?.meta?.seo_meta?.meta_title_id
    ),
      description: getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
    },
    alternates: getAlternates(locale, "/governance"),
    title: getSeoTitle(locale, data),
    description: getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ),
  }
}

export default async function GovernancePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const data: HttpGeneralResponse<GovernanceProps> = await getPage("governance")
  const dataDocumentsPolicy: { data: MetaDocumentItem[] } = await getDocuments(
    "?per_page=5&document_page=governance&section=policy&order=ASC"
  )
  const dataDocumentsCorporate: { data: MetaDocumentItem[] } =
    await getDocuments(
      "?per_page=1&document_page=governance&section=corporate_secretary&order=ASC"
    )

  const dataDocumentsSheRegulation: { data: MetaDocumentItem[] } =
    await getDocuments(
      "?per_page=10&document_page=governance&section=she_regulation&order=ASC"
    )

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <JsonLdRenderer
        meta={data?.meta}
        locale={locale as "en" | "id"}
        pageType="governance"
        customProps={{
          description: getLocalizedDescription(
            locale,
            data?.meta?.seo_meta?.meta_desc_en,
            data?.meta?.seo_meta?.meta_desc_id
          )
        }}
      />
      <Navbar />
      {data?.meta?.banner && <GovernanceJumbotron {...data?.meta.banner} />}
      {data?.meta?.corporate_secretary && (
        <GovernanceCorporate
          dataDocumentsCorporate={dataDocumentsCorporate?.data[0]}
          {...data?.meta.corporate_secretary}
        />
      )}
      {data?.meta?.internal_audit && (
        <GovernanceInternalAudit {...data?.meta.internal_audit} />
      )}
      {data?.meta?.committee && (
        <GovernanceCommittees {...data?.meta.committee} />
      )}
      {data?.meta?.risk_management && (
        <GovernanceRiskManagement {...data?.meta.risk_management} />
      )}
      {data?.meta?.code_conduct && (
        <GovernanceCodeOfConduct {...data?.meta.code_conduct} />
      )}
      {data?.meta?.she_regulation && (
        <GovernanceSHERegulation
          dataDocumentsSheRegulation={dataDocumentsSheRegulation?.data}
          {...data?.meta?.she_regulation}
        />
      )}
      {data?.meta?.policy && (
        <GovernancePolicy
          {...data?.meta.policy}
          dataDocumentsPolicy={dataDocumentsPolicy?.data}
        />
      )}
      {data?.meta?.whistleblowing && (
        <GovernanceWhistleblowing {...data?.meta.whistleblowing} />
      )}
    </>
  )
}
