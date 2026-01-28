import Navbar from "@/components/global/Navbar"
import WhoWeAreJumbotron from "./_components/WhoWeAreJumbotron"
import WhoWeAreChandraAsri from "./_components/WhoWeAreChandraAsri"
import WhoWeAreStats from "./_components/WhoWeAreStats"
import WhoWeAreVisionMission from "./_components/WhoWeAreVisionMission"
import WhoWeAreCoreValue from "./_components/WhoWeAreCoreValue"
import WhoWeAreDownload from "./_components/WhoWeAreDownload"
import WhoWeAreMilestone from "./_components/WhoWeAreMilestone"
import { getDocuments, getPage } from "@/lib/api"
import { HttpGeneralResponse, WhoWeAreProps } from "@/lib/types"
import { MetaDocumentItem } from "@/lib/fragment"
import { Metadata } from "next"
import { getLocalizedContent } from "@/lib/utils"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("about-us-who-we-are")
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

export default async function WhoWeArePage() {
  const data: HttpGeneralResponse<WhoWeAreProps> = await getPage(
    "about-us-who-we-are"
  )
  const dataDocuments: { data: MetaDocumentItem[] } = await getDocuments(
    "?limit=2&document_page=about_who_we_are&section=download&order=ASC"
  )

  return (
    <>
      <Navbar />
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      {data?.meta?.banner && <WhoWeAreJumbotron {...data?.meta?.banner} />}
      {data?.meta?.intro && <WhoWeAreChandraAsri {...data?.meta?.intro} />}
      {data?.meta?.in_numbers && <WhoWeAreStats {...data?.meta?.in_numbers} />}
      {data?.meta?.vision_mission && (
        <WhoWeAreVisionMission {...data?.meta?.vision_mission} />
      )}
      {data?.meta?.core_values && (
        <WhoWeAreCoreValue {...data?.meta?.core_values} />
      )}
      {data?.meta?.milestone && (
        <WhoWeAreMilestone {...data?.meta?.milestone} />
      )}
      {data?.meta?.download && (
        <WhoWeAreDownload
          {...data?.meta?.download}
          dataDocuments={dataDocuments?.data}
        />
      )}
    </>
  )
}
