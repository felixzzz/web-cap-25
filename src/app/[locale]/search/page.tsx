import { Metadata } from "next"
import { getAlternates } from "@/lib/seo"
import Navbar from "@/components/global/Navbar"
import SearchContent from "./_components/SearchContent"
import { Suspense } from "react"


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    alternates: getAlternates(locale, "/search"),
  }
}

export default function SearchPage() {
  return (
    <>
      <Navbar isBackgroundWhite />
      <Suspense>
        <SearchContent />
      </Suspense>
    </>
  )
}
