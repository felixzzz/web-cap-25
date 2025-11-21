import Navbar from "@/components/global/Navbar"
import InvestorJumbotron from "./_components/InvestorJumbotron"
import InvestorFinancialJourney from "./_components/InvestorFinancialJourney"
import InvestorSupporting from "./_components/InvestorSupporting"
import InvestorFinancialCalendar from "./_components/InvestorFinancialCalendar"
import { getDocuments, getDocumentsPublishedYears, getPage } from "@/lib/api"
import {
  HttpGeneralResponse,
  InvestorProps,
  PaginationHandlerResponse,
} from "@/lib/types"
import { MetaDocumentItem } from "@/lib/fragment"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("investor-overview")
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

export default async function InvestorOverviewPage() {
  const data: HttpGeneralResponse<InvestorProps> =
    await getPage("investor-overview")
  const dataDocuments: PaginationHandlerResponse<MetaDocumentItem[]> =
    await getDocuments("?per_page=2&document_page=investor_reports&order=ASC")
  const dataYears = await getDocumentsPublishedYears()

  return (
    <>
      <Navbar />
      {data?.meta?.banner && <InvestorJumbotron {...data?.meta?.banner} />}
      {data?.meta?.intro && data?.meta?.overview_content && (
        <InvestorFinancialJourney
          intro={{ ...data?.meta?.intro }}
          overview_content={{ ...data?.meta?.overview_content }}
        />
      )}
      {data?.meta?.card && <InvestorSupporting {...data?.meta?.card} />}
      {data?.meta?.financial_calendar && (
        <InvestorFinancialCalendar
          {...data?.meta?.financial_calendar}
          data={dataDocuments}
          dataYears={dataYears}
        />
      )}
    </>
  )
}
