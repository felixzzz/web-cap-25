import { BannerBlock } from "@/components/block/BannerBlock"
import { MockMetaCover, MockMetaIntro } from "@/components/block/mock"
import Navbar from "@/components/global/Navbar"
import GovernanceBusinessEthics from "./_components/GovernanceBusinessEthics"
import { SocialData } from "../_components/SocialData"
import { IntroBlock } from "@/components/block/IntroBlock"
import { AntiCorruption } from "../_components/AntiCorruption"
import GrievanceMecanism from "./_components/GrievanceMecanism"
import CyberSecurity from "./_components/CyberSecurity"
import Procurement from "./_components/Procurement"
import { ThreeBasicComponent } from "./_components/ThreeBasicComponent"
import { GovernancePageProps, HttpGeneralResponse } from "@/lib/types"
import { getPage } from "@/lib/api"
import { InNumbersBlock } from "@/components/block/InNumbers"
import { getLocalizedContent } from "@/lib/utils"
import { Metadata } from "next"
import GovernancePerformance from "./_components/GovernancePerformance"
import { PageIdSetter } from "@/components/providers/query-provider"

export const revalidate = 60

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {
  const data = await getPage("governance-1")
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
  const data: HttpGeneralResponse<GovernancePageProps> =
    await getPage("governance-1")

  return (
    <>
      {data?.id && <PageIdSetter id={data.id.toString()} />}
      <Navbar />
      {data?.meta?.banner && <BannerBlock {...data?.meta.banner} />}
      {data?.meta?.intro && <GovernanceBusinessEthics {...data?.meta.intro} />}
      {data?.meta?.point && <AntiCorruption {...data?.meta.point} />}
      {data?.meta?.in_numbers && <InNumbersBlock {...data?.meta.in_numbers} />}
      {data?.meta?.image_text && (
        <GrievanceMecanism {...data?.meta.image_text} />
      )}
      {data?.meta?.procurement && <Procurement {...data?.meta.procurement} />}
      {/* temporary */}
      {data?.meta?.cyber_security && (
        <CyberSecurity {...data?.meta.cyber_security} />
      )}
      {data?.meta?.information && (
        <ThreeBasicComponent {...data?.meta.information} />
      )}
      {data?.meta?.image_text2 && (
        <GovernancePerformance image_text2={data?.meta.image_text2} />
      )}
    </>
  )
}
