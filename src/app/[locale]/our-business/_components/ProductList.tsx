"use client"
import Anim from "@/components/global/Anim"
import { Button } from "@/components/ui/button"
import { ProductChemical } from "@/lib/fragment"
import { getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function ProductList({
  slug,
  dataCategories,
}: {
  slug: string
  dataCategories: ProductChemical[]
}) {
  const locale = useLocale()
  const activeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (activeButtonRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [slug])

  return (
    <div className="fixed left-0 right-0 z-20 mt-[64px] w-full flex-nowrap bg-white py-5">
      <div className="container lg:flex lg:flex-wrap flex gap-3 overflow-x-auto">
        <Anim>
          {dataCategories?.map((item) => (
            <Button
              key={item.id}
              className="w-full text-sm lg:w-auto lg:text-md"
              variant={item.slug === slug ? "blue" : "outline-blue"}
              ref={item.slug === slug ? activeButtonRef : null}
            >
              <Link
                href={`/${locale}/our-business/chemical-solutions/${item.slug}`}
              >
                {getLocalizedContent(locale, item.title_en, item.title)}
              </Link>
            </Button>
          ))}
        </Anim>
      </div>
    </div>
  )
}
