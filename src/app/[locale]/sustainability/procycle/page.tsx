import { getAlternates, getSeoTitle } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import { PageIdSetter } from "@/components/providers/query-provider"
import { getPage } from "@/lib/api"
import { HttpGeneralResponse } from "@/lib/types"
import { getLocalizedContent, getLocalizedDescription } from "@/lib/utils"
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

  // Fallback to default mock structure if CMS is offline or empty
  const pageData = cmsData?.meta ? cmsData.meta : {
    banner: DEFAULT_PROCYCLE_DATA.banner,
    intro: {
      description_en: DEFAULT_PROCYCLE_DATA.intro.en,
      description_id: DEFAULT_PROCYCLE_DATA.intro.id,
    },
    our_approach: {
      title_en: DEFAULT_PROCYCLE_DATA.approach.title_en,
      title_id: DEFAULT_PROCYCLE_DATA.approach.title_id,
      description_en: DEFAULT_PROCYCLE_DATA.approach.description_en,
      description_id: DEFAULT_PROCYCLE_DATA.approach.description_id,
    },
    product_datasheet: {
      title_en: DEFAULT_PROCYCLE_DATA.categoriesSection.section_title_en,
      title_id: DEFAULT_PROCYCLE_DATA.categoriesSection.section_title_id,
      subtitle_en: DEFAULT_PROCYCLE_DATA.categoriesSection.section_subtitle_en,
      subtitle_id: DEFAULT_PROCYCLE_DATA.categoriesSection.section_subtitle_id,
      datasheet_list_en: DEFAULT_PROCYCLE_DATA.categoriesSection.categories.map((c) => ({
        status: "active",
        sidebarmenu_title: c.tab_label_en,
        title: c.title_en,
        description: c.description_en,
        card_title: c.product_list_title_en,
        products: c.products.map((p) => ({ name: p.name_en, url: p.url })),
      })),
      datasheet_list_id: DEFAULT_PROCYCLE_DATA.categoriesSection.categories.map((c) => ({
        status: "active",
        sidebarmenu_title: c.tab_label_id,
        title: c.title_id,
        description: c.description_id,
        card_title: c.product_list_title_id,
        products: c.products.map((p) => ({ name: p.name_id, url: p.url })),
      })),
    },
  }

  const pageId = cmsData?.id ? cmsData.id.toString() : null

  return (
    <>
      {pageId && <PageIdSetter id={pageId} />}
      <Navbar isBackgroundWhite />
      <ProCycleContainer data={pageData} />
    </>
  )
}
