import React from "react"
import Image from "next/image"
import { getLocalizedContent, isContentActive, assetUrl } from "@/lib/utils"
import { useLocale } from "next-intl"
import {
  ContentProductResponsibility,
  MetaContentPoint,
  MetaPracticeContent,
} from "@/lib/types"

const data = {
  section_1: {
    title:
      "Chandra Asri's Commitment to Manpower Practices and Occupational Health & Safety",
    text: "<p>Et voluptatem facilis et deserunt voluptas rem autem voluptate ea quia dolor eum veritatis similique ad omnis maxime ea sint accusantium. Aut distinctio quia aut doloremque recusandae ad quidem quos est dignissimos magnam et dolorum modi aut repudiandae ratione qui ipsum neque? </p><ul><li>Et dolor odio aut adipisci dolore et doloribus esse qui enim dolores. </li><li>Eos quasi ipsum est velit itaque. </li><li>Et quia consequatur est tempore suscipit. </li><li>Ut neque dolore ea nostrum officiis. </li></ul>",
  },
  section_2: {
    title:
      "Fostering a Culture of Occupational Health and Safety (K3) within the Company",
    text: "<p>Et omnis ipsa vel sapiente excepturi rem quibusdam culpa quo voluptas aperiam est voluptatum dolores. Ut commodi unde id nisi repellat aut voluptatem possimus nam Quis incidunt. Nam aspernatur dolores quo nemo ullam 33 ipsum velit qui numquam dolor eum ipsa rerum. </p><ol><li>Aut temporibus exercitationem non nemo laborum sed aliquam consequuntur est quia eius. </li><li>Est porro rerum ea consequatur impedit. </li><li>Eum doloremque assumenda in corrupti omnis. </li><li>Aut necessitatibus earum aut iure voluptates qui sequi fugit. </li><li>Ad totam consequatur est sint eveniet ut amet voluptas aut optio impedit. </li><li>Sed odio minima ut quod facilis eos ullam pariatur! </li></ol><p>Sed galisum architecto nam dolores nesciunt aut doloribus tempore ab quibusdam blanditiis est voluptas amet sed rerum laudantium ut velit cupiditate! Ut esse voluptas ut modi eaque ea nostrum voluptate et autem dolorem ea itaque velit. Ut accusantium sint et maiores eius et sapiente commodi eum sequi reprehenderit. </p>",
  },
}

function RenderTopContent({
  status_id,
  image_id,
  list_id,
  status_en,
  image_en,
  list_en,
  title2_id,
  description_id,
  title2_en,
  description_en,
}: ContentProductResponsibility) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const imageSrc = image_id
  const listing = getLocalizedContent(locale, list_en, list_id)

  return (
    <div className={"container"}>
      <div className={`grid grid-cols-1 lg:grid-cols-12 lg:gap-10`}>
        <div className={`col-span-5`}>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={assetUrl(imageSrc) || ""}
              alt="img-card"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="col-span-7 flex items-center justify-center py-5">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {getLocalizedContent(locale, title2_en, title2_id)}
            </h2>
            <div
              className="prose-checklist prose prose-h4:text-lg prose-li:relative prose-li:list-none prose-li:font-bold"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            />
            <div className="prose-checklist prose prose-h4:text-lg prose-li:relative prose-li:list-none prose-li:font-bold">
              <ul>
                {listing
                  ?.sort((a, b) => Number(a.order) - Number(b.order))
                  .map((res, i) => <li key={i}>{res?.title}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RenderBottomContent({
  status_id,
  title_id,
  image_id,
  description_id,
  status_en,
  title_en,
  image_en,
  description_en,
}: MetaContentPoint) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  const imageSrc = image_id
  return (
    <div className={"container pt-32"}>
      <div className={`grid grid-cols-1 lg:grid-cols-12 lg:gap-10`}>
        <div className="col-span-7 flex items-center justify-center py-5">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {getLocalizedContent(locale, title_en, title_id)}
            </h2>
            <div
              className="prose-number prose prose-h4:text-lg prose-li:relative"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  description_en,
                  description_id
                ),
              }}
            />
          </div>
        </div>
        <div className={`col-span-5`}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={assetUrl(imageSrc) || ""}
              alt="img-card"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PracticeContent({
  top_content,
  bottom_content,
}: MetaPracticeContent) {
  return (
    <div className="w-full">
      <div className={`relative py-4 lg:py-[100px]`}>
        {top_content && <RenderTopContent {...top_content} />}
        {bottom_content && <RenderBottomContent {...bottom_content} />}
      </div>
    </div>
  )
}
