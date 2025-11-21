import { ScrambleText } from "@/components/block/InNumbers"
import Anim from "@/components/global/Anim"
import { imgVectorAbout } from "@/data/images"
import { MetaHomeInNumbers } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function WhoWeAreStats({
  title_en,
  title_id,
  cta_label2_en,
  cta_label2_id,
  cta_label_en,
  cta_label_id,
  cta_url2_en,
  cta_url2_id,
  cta_url_en,
  cta_url_id,
  description_en,
  description_id,
  numbers_en,
  numbers_id,
  status_en,
  status_id,
}: MetaHomeInNumbers) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }
  return (
    <>
      <section className="relative bg-[#09102B] py-[70px]">
        <div className="container">
          <Anim>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-10">
              {getLocalizedContent(locale, numbers_en, numbers_id)?.map(
                (item) => (
                  <div key={item.title} className="flex flex-col">
                    <ScrambleText className="text-nowrap" text={item.title} />
                    <div className="mt-2 text-sm tracking-[0.16px] text-white lg:text-md">
                      {item.small_title}
                    </div>
                  </div>
                )
              )}
            </div>
          </Anim>
        </div>
        <Image
          src={imgVectorAbout}
          className="absolute bottom-0 hidden w-full lg:block"
          alt=""
        />
      </section>
    </>
  )
}
