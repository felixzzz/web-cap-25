import LoadingVertical from "@/components/anti/LoadingVertical"
import { iconNextBlue, imgVectorExploreMore } from "@/data/images"
import { Post } from "@/lib/fragment"
import { dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

type Prop = {
  post: Post | undefined
}

export default function EsgHeader({ post }: Prop) {
  const locale = useLocale()

  if (!post) return <></>

  const {
    author,
    author_admin,
    category,
    created_at,
    excerpt,
    featured,
    id,
    image,
    meta,
    meta_data,
    post_type,
    slug,
    slug_en,
    status,
    storage_url,
    tag,
    template,
    title,
    title_en,
    type,
    updated_at,
    view_count,
    published_at,
  } = post

  return (
    <section className="relative bg-surface py-8 lg:min-h-[700px] lg:pb-[80px] lg:pt-[56px]">
      <div className="container relative">
        <div className="text-xl font-bold lg:text-4xl">
          Sustainability In Action
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-x-20">
          <div className="relative flex aspect-[27/20] flex-shrink-0 rounded-3xl">
            {image && (
              <Image
                src={image}
                className="rounded-3xl object-cover"
                alt={getLocalizedContent(locale, title_en, title)}
                fill
                onError={(event: any) => {
                  event.target.id = "/img/common/img_default-news.jpg"
                  event.target.srcset = "/img/common/img_default-news.jpg"
                }}
              />
            )}
          </div>
          <div className="my-auto flex max-w-[566px] flex-shrink-0 flex-col content-center">
            <div className="text-sm font-semibold uppercase tracking-[0.8px] text-gray lg:text-md">
              {dateFormater(published_at)}
            </div>
            <h1 className="mt-2 text-lg font-bold lg:text-xl">
              {getLocalizedContent(locale, title_en, title)}
            </h1>
            {excerpt && (
              <div className="mt-4 line-clamp-3 overflow-ellipsis text-sm lg:text-md">
                {excerpt}
              </div>
            )}
            {slug && (
              <Link
                href={`/${locale}/sustainability/sustainability-in-action/${getLocalizedContent(locale, slug_en, slug)}`}
                className="mt-4 flex gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline"
              >
                Read more{" "}
                <Image className="my-auto" src={iconNextBlue} alt="" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <LoadingVertical
        containerClass="hidden lg:block"
        loadingLineClassName="bg-[#1A1A1A4D]"
        firstInnerClassName="bg-[#1A1A1A]"
        secondInnerClassName="bg-[#1A1A1A]"
      />
    </section>
  )
}
