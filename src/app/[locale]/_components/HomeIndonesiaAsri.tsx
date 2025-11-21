import {
  bgIndonesiaAsriMobile,
  iconNext,
  imgBgIndonesiaAsri,
  logoIndonesiaAsri,
} from "@/data/images"
import { MetaHomeSmallBanner } from "@/lib/fragment"
import {
  assetUrl,
  getLocalizedContent,
  isContentActive,
  isFullUrl,
} from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function HomeIndonesiaAsri({
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
}: MetaHomeSmallBanner) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className="container relative py-[60px]">
      <div className="relative z-[10] flex flex-col rounded-2xl bg-[#2A3D7F] p-6 lg:flex-row lg:gap-10 lg:rounded-3xl lg:px-12 lg:py-10">
        <Image
          className="size-[80px] lg:size-[132px]"
          width={132}
          height={132}
          src={assetUrl(getLocalizedContent(locale, logo_id, logo_id)!) || ""}
          alt=""
        />
        <div className="flex flex-col lg:my-auto">
          <div className="mt-6 text-lg font-bold text-white lg:mt-0">
            {getLocalizedContent(locale, title_en, title_id)}
          </div>
          <div
            className="mt-2 text-sm text-white/70"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                description_en,
                description_id
              ),
            }}
          />
        </div>
        <Link
          href={getLocalizedContent(locale, cta_url_en, cta_url_id) || "#"}
          target={
            isFullUrl(getLocalizedContent(locale, cta_url_en, cta_url_id))
              ? "_blank"
              : "_self"
          }
          className="mt-[18px] flex flex-shrink-0 gap-2 text-nowrap text-sm font-bold text-white lg:mt-0"
        >
          <div className="my-auto">
            {getLocalizedContent(locale, cta_label_en, cta_label_id)}
          </div>
          <Image className="my-auto" src={iconNext} alt="" />
        </Link>
        <Image
          src={imgBgIndonesiaAsri}
          className="absolute bottom-0 left-0 z-[-1] hidden h-full w-full lg:block"
          alt=""
        />
        <Image
          src={bgIndonesiaAsriMobile}
          className="absolute bottom-0 left-0 z-[-1] block h-full w-full lg:hidden"
          alt=""
        />
      </div>
    </div>
  )
}
