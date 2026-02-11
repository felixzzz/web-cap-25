import { BannerBlock } from "@/components/block/BannerBlock"
import { ContentLeftRightBlock } from "@/components/block/ContentLeftRightBlock"
import { IconListhorizontalBlock } from "@/components/block/IconListhorizontalBlock"
import { SmallBannerBlock } from "@/components/block/SmallBannerBlock"
import { CardItem } from "@/components/global/CardItem"
import Navbar from "@/components/global/Navbar"
import { getPage } from "@/lib/api"

import Link from "next/link"
import Image from "next/image"
import { imgCircularEconomyMapLevel } from "@/data/images"
import CircularEconomyTabs from "./_components/CircularEconomyTabs"
import { EnvironmentPerformance } from "../environment/_components/EnvironmentPerfornamce"
import { BusinessSolutionsProp, HttpGeneralResponse } from "@/lib/types"
import { SmallPopup } from "@/lib/fragment"
import { notFound } from "next/navigation"
import { getLocalizedContent, isContentActive, assetUrl } from "@/lib/utils"

const ENVIROMENTAL_PERFORMANCE_DUMMY_DATA = {
  title_en: "Environmental Performance for Sustainability",
  title_id: "Kinerja Lingkungan untuk Keberlanjutan",
  description_en:
    "<p>We are committed to reducing our environmental footprint through continuous improvement and innovation.</p>",
  description_id:
    "<p>Kami berkomitmen untuk mengurangi jejak lingkungan kami melalui perbaikan terus-menerus dan inovasi.</p>",
  status_en: "active",
  status_id: "active",
  numbers_en: [
    {
      icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
      number: "25%",
      title: "Total Waste Managed",
      small_title: "Year 2025",
    },
  ],
  numbers_id: [
    {
      icon: "images/post/thmOz6VVdIDJQRT3huuEv4jDSdwqpl8G6tsM1TGP.png",
      number: "25%",
      title: "Total Limbah yang di Kelola",
      small_title: "Tahun 2025",
    },
  ],
}

import ContentTab from "@/app/[locale]/our-business/_components/ContentTab"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "en" | "id" }
}) {
  // Fetching actual data
  const data: HttpGeneralResponse<BusinessSolutionsProp> = await getPage(
    "circular-economy-and-partnership"
  )
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

export default async function CircularEconomyPage({
  params,
}: {
  params: { locale: "en" | "id" }
}) {
  // Fetching actual data
  const data: HttpGeneralResponse<BusinessSolutionsProp> = await getPage(
    "circular-economy-and-partnership"
  )

  if (!data) {
    return notFound()
  }

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.content_left_right && (
        <ContentLeftRightBlock {...data?.meta.content_left_right} />
      )}
      {data?.meta?.icon_list_horizontal && (
        <IconListhorizontalBlock {...data?.meta.icon_list_horizontal} />
      )}
      {/* Environmental Performance Section */}
      {data?.meta?.environmental_performance ? (
        <EnvironmentPerformance {...data.meta.environmental_performance} />
      ) : (
        <EnvironmentPerformance {...ENVIROMENTAL_PERFORMANCE_DUMMY_DATA} />
      )}

      {/* Submenu Grid Section representation */}
      <div className="py-10">
        <div className="container mx-auto mb-10 w-full">
          <Image
            src={imgCircularEconomyMapLevel}
            alt="Circular Economy Map"
            className="w-full rounded-3xl object-cover"
          />
        </div>
        {/* Pass the tabs data from the API response */}
        {(() => {
          console.log("🔍 RAW API DATA:", {
            policy_items: data?.meta?.policy_items,
            end_to_end_items: data?.meta?.end_to_end_items,
            technology_items: data?.meta?.technology_items
          })
          return null
        })()}

        {data?.meta && (
          <CircularEconomyTabs
            tabsData={{
              policy: {
                hero_image: data.meta.policy_items?.hero_image,
                hero_image_alt: data.meta.policy_items?.hero_image_alt,
                tab_description: data.meta.policy_items?.tab_description,
                performance: data.meta.policy_performance,
                // @ts-ignore
                items:
                  params.locale === "en"
                    ? data.meta.policy_items?.items_en
                    : data.meta.policy_items?.items_id,
              },
              "end-to-end": {
                hero_image: data.meta.end_to_end_items?.hero_image,
                hero_image_alt: data.meta.end_to_end_items?.hero_image_alt,
                tab_description: data.meta.end_to_end_items?.tab_description,
                performance: data.meta.end_to_end_performance,
                // @ts-ignore
                items:
                  params.locale === "en"
                    ? data.meta.end_to_end_items?.items_en
                    : data.meta.end_to_end_items?.items_id,
              },
              technology: {
                hero_image: data.meta.technology_items?.hero_image,
                hero_image_alt: data.meta.technology_items?.hero_image_alt,
                tab_description: data.meta.technology_items?.tab_description,
                performance: data.meta.technology_performance,
                // @ts-ignore
                items:
                  params.locale === "en"
                    ? data.meta.technology_items?.items_en
                    : data.meta.technology_items?.items_id,
              },
            }}
          />
        )}
      </div>

      {data?.meta?.content_left_right_2 && (
        <ContentLeftRightBlock {...data?.meta.content_left_right_2} />
      )}
    </>
  )
}
