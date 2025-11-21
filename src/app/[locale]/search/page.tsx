import Navbar from "@/components/global/Navbar"
import SearchContent from "./_components/SearchContent"
import { Suspense } from "react"

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
