"use client"
import { imgTempCompanyLogo } from "@/data/images"
import { MetaSmallBanner } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Anim from "../global/Anim"

export function SmallBannerBlock({
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaSmallBanner) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const smallBannerLength = () => {
    return getLocalizedContent(locale, list_en, list_id)?.length
  }

  return (
    <>
      <div className="relative py-12">
        <div className="container">
          <Anim>
            <h2 className="text-xl font-bold">
              {getLocalizedContent(locale, title_en, title_id)}
            </h2>
          </Anim>

          <div
            className={cn(
              `grid grid-cols-2 lg:flex lg:flex-wrap gap-6`,
              smallBannerLength() > 1 && ``
            )}
          >
            <Anim>
              {getLocalizedContent(locale, list_en, list_id)?.map((item, i) => (
                <div
                  key={i}
                >
                  {item.logo && (
                    <Link href={item.cta_url} className="group" target="_blank">
                      <div className="relative aspect-[16/9] w-full lg:w-[284px]">
                        <Image
                          src={assetUrl(item.logo)!}
                          alt="img-temp"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  )}
                  {/* <div className="max-w-[640px] text-white">
                    <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.description}</p>
                  </div> */}
                  {/* <div className="w-[150px]">
                    {item.cta_label && item.cta_url && (
                      <Link href={item.cta_url}>
                        <Button variant={"link"} className="text-white">
                          {item.cta_label}
                          <ArrowRight
                            size={20}
                            strokeWidth={2}
                            className="relative left-1 transition-all duration-300 group-hover:left-2"
                          />
                        </Button>
                      </Link>
                    )}
                  </div> */}
                </div>
              ))}
            </Anim>
          </div>
        </div>
      </div>
    </>
  )
}
