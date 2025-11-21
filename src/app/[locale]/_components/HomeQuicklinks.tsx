import Anim from "@/components/global/Anim"
import { iconCornerArrow, imgBgQuicklinks } from "@/data/images"
import { MetaHomeQuicklink } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function HomeQuicklink({
  image_en,
  image_id,
  list_en,
  list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  section_title_en,
  section_title_id,
  alt_text_en,
  alt_text_id
}: MetaHomeQuicklink) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="relative content-center lg:min-h-dvh">
      <Anim>
        <Image
          src={assetUrl(image_id) || ""}
          className="mt-8 block w-full object-cover lg:hidden"
          width={360}
          height={396}
          alt=""
        />
        <div className="container flex py-6 md:py-0">
          <div className="w-full lg:w-6/12 lg:max-w-[420px]">
            <div className="text-xs font-medium uppercase tracking-[0.9px] text-gray lg:text-xs">
              {getLocalizedContent(locale, section_title_en, section_title_id)}
            </div>
            <div className="mt-2 flex flex-col justify-between lg:flex-row">
              <div className="my-auto max-w-[420px] text-xl font-bold lg:text-3xl">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
            </div>
            <div className="mt-2 flex flex-col text-md font-bold lg:mt-12 lg:gap-5 lg:text-xl">
              {getLocalizedContent(locale, list_en, list_id)?.map((link) => (
                <Link
                  className="flex w-full border-b pb-4 pt-4 lg:pb-5 lg:pt-[10px]"
                  href={link.url}
                  key={link.title}
                >
                  <div>{link.title}</div>
                  <Image
                    className="my-auto ml-auto"
                    width={24}
                    height={24}
                    src={iconCornerArrow}
                    alt=""
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Anim>
      <Anim className="z-1 absolute bottom-0 right-0 hidden h-full max-w-[54%] content-end object-cover lg:block">
        <Image
          src={assetUrl(image_id) || ""}
          className="object-cover"
          width={815}
          height={896}
          alt={getLocalizedContent(locale, alt_text_en, alt_text_id)}
        />
      </Anim>
    </section>
  )
}
