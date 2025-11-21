import React from "react"
import { Metadata } from "next"
import Navbar from "@/components/global/Navbar"
import { BannerBlock } from "@/components/block/BannerBlock"
import ResponsibilityTitle from "./_components/ResponsibilityTitle"

import ResponsibilityContent from "./_components/ResponsibilityContent"
import ResponsibilityList from "./_components/ResponsibilityList"

import { getPage } from "@/lib/api"
import { getLocalizedContent } from "@/lib/utils"
import { ProductResponsibility, HttpGeneralResponse } from "@/lib/types"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("product-responsibility")
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
  const data: HttpGeneralResponse<ProductResponsibility> = await getPage(
    "product-responsibility"
  )

  return (
    <>
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta?.banner} />}
      {data?.meta?.content_left_image && (
        <>
          <ResponsibilityTitle
            status_en={data?.meta?.content_left_image?.status_en}
            status_id={data?.meta?.content_left_image?.status_id}
            title_en={data?.meta?.content_left_image?.title_en}
            title_id={data?.meta?.content_left_image?.title_id}
          />
          <ResponsibilityList {...data?.meta?.content_left_image} />
        </>
      )}

      {data?.meta?.content_left_right_2 && (
        <ResponsibilityContent {...data?.meta?.content_left_right_2} />
      )}
    </>
  )
}
