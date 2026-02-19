import Navbar from "@/components/global/Navbar"
import ContactForm from "./_components/ContactForm"
import ContactOtherCompany from "./_components/ContactOtherCompany"
import { getDetailPost, getPage } from "@/lib/api"
import { ContactUsProps, HttpGeneralResponse } from "@/lib/types"
import { MetaTopics } from "@/lib/fragment"
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
  const data = await getPage("contact-us")
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

export default async function ContactUsPage() {
  const data: HttpGeneralResponse<ContactUsProps> = await getPage("contact-us")
  const dataTopics: MetaTopics[] = await getDetailPost(
    "categories?sort=sort&order=ASC&type=contact_us"
  )

  return (
    <>
      <div className="mt-16">
        {data?.id && <PageIdSetter id={data.id.toString()} />}
        <Navbar isBackgroundWhite />
        {data?.meta?.banner && (
          <ContactForm {...data?.meta.banner} topics={dataTopics} />
        )}
        {data?.meta?.company_office && (
          <ContactOtherCompany {...data?.meta.company_office} />
        )}
      </div>
    </>
  )
}
