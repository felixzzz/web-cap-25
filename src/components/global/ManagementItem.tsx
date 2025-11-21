import { PostManagement } from "@/lib/fragment"
import { assetUrl, capitalizeText, getLocalizedContent } from "@/lib/utils"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { useLocale } from "next-intl"

export default function ManagementItem({
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
}: PostManagement) {
  const locale = useLocale()

  return (
    <div className="flex flex-col">
      {meta?.list?.picture_id && (
        <AspectRatio ratio={1 / 1} className="mb-4">
          <Image
            src={assetUrl(meta?.list.picture_id)!}
            alt="img-corporate"
            fill
            className="rounded-3xl border object-cover"
          />
        </AspectRatio>
      )}
      <div className="font-bold">
        {capitalizeText(getLocalizedContent(locale, meta?.list?.name_en, meta?.list?.name_id))}
      </div>
      <div className="mt-1 text-gray">
        {getLocalizedContent(
          locale,
          meta?.list?.position_en,
          meta?.list?.position_id
        )}
      </div>
    </div>
  )
}

export function ManagementItemSkeleton() {
  return (
    <div className="flex flex-col">
      <AspectRatio ratio={1 / 1} className="mb-4">
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <div className="font-bold">
        <Skeleton className="h-[30px] w-[50px]" />
      </div>
      <div className="mt-1 text-gray">
        <Skeleton className="h-[30px] w-[150px]" />
      </div>
    </div>
  )
}
