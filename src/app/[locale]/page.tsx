import { Suspense, lazy } from "react"
import Navbar from "@/components/global/Navbar"
import SectionJumbotron from "./_components/SectionJumbotron"
import SectionListCard from "./_components/SectionListCard"
import HomeDrivingChange from "./_components/HomeDrivingChange"
import HomeJourneyGrowth from "./_components/HomeJourneyGrowth"
import HomeFinancialReports from "./_components/HomeFinancialReports"
import HomeIndonesiaAsri from "./_components/HomeIndonesiaAsri"
import HomeDiscovery from "./_components/HomeDiscovery"
import HomeFooterDescription from "./_components/HomeFooterDescription"
import { getDocuments, getPage, getPostList, getHomeBanners } from "@/lib/api"
import { HomeProps, HttpGeneralResponse } from "@/lib/types"
import HomeQuicklink from "./_components/HomeQuicklinks"
import { Metadata } from "next"
import {
  MetaContentBlock,
  MetaDocumentItem,
  MetaNewsDetail,
  SmallPopup,
} from "@/lib/fragment"
import { getLocalizedContent } from "@/lib/utils"
import { BannerRenderer } from "@/components/banner/BannerRenderer"
// import CookieConsentBanner from "@/components/global/CookieConsentBanner"

export const revalidate = 60

const CookieConsentBanner = lazy(
  () => import("@/components/global/CookieConsentBanner")
)
export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("home")
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

export default async function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const data: HttpGeneralResponse<HomeProps> = await getPage("home")
  const dataDocuments: { data: MetaDocumentItem[] } = await getDocuments(
    "?per_page=2&document_page=investor_reports&order=DESC&sort=published_at"
  )
  const dataNewsCategories = await getPostList(
    "/categories?limit=3&sort=id&type=news&order=DESC"
  )
  const dataNews: { data: MetaNewsDetail[] } = await getPostList(
    "?limit=2&lang=id&page=1&sort=id&order=DESC&type=news"
  )
  const dataCookiesConsent: HttpGeneralResponse<{
    cookies_content: MetaContentBlock
    small_popup: SmallPopup
  }> = await getPage("cookies-consent")

  const homeBanners = await getHomeBanners(locale)

  return (
    <>
      <Navbar />
      {data?.meta?.banner && <SectionJumbotron {...data?.meta.banner} />}
      {data?.meta?.intro && <SectionListCard {...data?.meta.intro} />}
      {data?.meta?.business_solution && (
        <HomeDrivingChange {...data?.meta.business_solution} />
      )}
      {/* Journey Growth Banner - After journey growth section */}
      {homeBanners?.["journey-growth"] &&
        homeBanners["journey-growth"].length > 0 && (
          <div className="container mx-auto my-8 px-4">
            <BannerRenderer
              banners={homeBanners["journey-growth"]}
              position="center"
            />
          </div>
        )}
      {data?.meta?.in_numbers && (
        <HomeJourneyGrowth {...data?.meta.in_numbers} />
      )}
      {data?.meta?.financial_report && (
        <HomeFinancialReports
          {...data?.meta.financial_report}
          dataDocuments={dataDocuments?.data}
        />
      )}
      {/* Financial Reports Banner - After financial reports section */}
      {homeBanners?.["financial-reports"] &&
        homeBanners["financial-reports"].length > 0 && (
          <div className="container mx-auto my-8 px-4">
            <BannerRenderer
              banners={homeBanners["financial-reports"]}
              position="center"
            />
          </div>
        )}
      {/* Indonesia Asri */}
      {data?.meta?.small_banner && (
        <HomeIndonesiaAsri {...data?.meta.small_banner} />
      )}
      {/* Discovery */}
      {data?.meta?.news && (
        <HomeDiscovery
          {...data?.meta.news}
          categories={dataNewsCategories}
          news={dataNews?.data}
        />
      )}
      {data?.meta?.quicklink && <HomeQuicklink {...data?.meta.quicklink} />}
      <HomeFooterDescription />
      <Suspense fallback={null}>
        <CookieConsentBanner
          smallPopup={dataCookiesConsent?.meta?.small_popup}
        />
      </Suspense>
    </>
  )
}
