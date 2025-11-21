import { Background } from "@/components/anti/background"
import { Button } from "@/components/ui/button"
import { bgIndonesiaAsri, logoIndonesiaAsri } from "@/data/images"
import { MetaSmallBanner, MetaSmallBannerLangItem } from "@/lib/fragment"
import {
  assetUrl,
  getLocalizedContent,
  isContentActive,
  isFullUrl,
} from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export function EnvironmentIndonesiaAsri({
  cta_label_en,
  cta_label_id,
  cta_url_en,
  cta_url_id,
  description_en,
  description_id,
  logo_en,
  logo_id,
  status_en,
  status_id,
  title_en,
  title_id,
}: MetaSmallBannerLangItem) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative py-12">
        <div className="container">
          <div className="relative overflow-hidden rounded-xl p-6 text-white">
            <Background bg={bgIndonesiaAsri} bgMobile={bgIndonesiaAsri} alt="" altMobile="" />

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="relative aspect-square w-[80px] lg:w-[132px]">
                <Image
                  src={assetUrl(getLocalizedContent(locale, logo_id, logo_id))!}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">
                  {getLocalizedContent(locale, title_en, title_id)}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ),
                  }}
                ></div>
              </div>
              <div>
                {getLocalizedContent(locale, cta_label_en, cta_label_id) && (
                  <Link
                    href={`${getLocalizedContent(locale, cta_url_en, cta_url_id)}`}
                    target={
                      isFullUrl(
                        getLocalizedContent(locale, cta_url_en, cta_url_id)
                      )
                        ? "_blank"
                        : "_self"
                    }
                  >
                    <Button variant={"link"} className="px-0 text-white">
                      {getLocalizedContent(locale, cta_label_en, cta_label_id)}
                      <ArrowRight
                        size={20}
                        strokeWidth={2}
                        className="relative left-1 transition-all duration-300 group-hover:left-2"
                      />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
