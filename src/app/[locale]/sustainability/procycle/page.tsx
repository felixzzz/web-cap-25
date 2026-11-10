import { getAlternates, getSeoTitle } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import { PageIdSetter } from "@/components/providers/query-provider"
import { getPage } from "@/lib/api"
import { HttpGeneralResponse } from "@/lib/types"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"
import { notFound } from "next/navigation"
import { ProCycleContainer } from "./_components/ProCycleContainer"
import { DEFAULT_PROCYCLE_DATA } from "./_data/procycleData"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "en" | "id" }
}) {
  let data: HttpGeneralResponse<any> | null = null
  try {
    data = await getPage("procycle")
  } catch {}

  const title =
    getLocalizedContent(
      locale,
      data?.meta?.seo_meta?.meta_title_en,
      data?.meta?.seo_meta?.meta_title_id
    ) ||
    getSeoTitle(locale, data) ||
    (locale === "id"
      ? "ProCycle - Produk Berkelanjutan | Chandra Asri Group"
      : "ProCycle - Sustainable Products | Chandra Asri Group")

  const description =
    getLocalizedDescription(
      locale,
      data?.meta?.seo_meta?.meta_desc_en,
      data?.meta?.seo_meta?.meta_desc_id
    ) ||
    (locale === "id"
      ? "Pelajari ProCycle, pengelolaan produk berkelanjutan dari Chandra Asri Group melalui 5 kategori aksi."
      : "Discover ProCycle, Chandra Asri Group's sustainable product management across 5 categories.")

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: getAlternates(locale, "/sustainability/procycle"),
  }
}

export default async function ProCyclePage({
  params: { locale },
}: {
  params: { locale: "en" | "id" }
}) {
  let cmsData: HttpGeneralResponse<any> | null = null

  try {
    cmsData = await getPage("procycle")
  } catch (err) {
    console.warn("Could not fetch ProCycle from CMS:", err)
  }

  // If page doesn't exist or is soft-deleted in CMS, return 404
  if (!cmsData) {
    return notFound()
  }

  const pageData = cmsData.meta
  const pageId = cmsData?.id ? cmsData.id.toString() : null

  return (
    <>
      {pageId && <PageIdSetter id={pageId} />}
      <Navbar isBackgroundWhite />
      <ProCycleContainer data={pageData} />
    </>
  )
}
