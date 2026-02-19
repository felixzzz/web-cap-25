import React from "react"
import { Metadata } from "next"

import Navbar from "@/components/global/Navbar"
import { BannerBlock } from "@/components/block/BannerBlock"
import PracticeContent from "../_components/PracticeContent"

import { getPage } from "@/lib/api"
import { getLocalizedContent } from "@/lib/utils"
import { MetaPraticesOfEmployment, HttpGeneralResponse } from "@/lib/types"
import { PageIdSetter } from "@/components/providers/query-provider"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("practices-of-employment")
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

export default async function RootPage() {
  const data: HttpGeneralResponse<MetaPraticesOfEmployment> = await getPage(
    "practices-of-employment"
  )

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta?.banner} />}
      <PracticeContent
        top_content={data?.meta?.content_left_image}
        bottom_content={data?.meta?.content_point}
      />
    </>
  )
}
