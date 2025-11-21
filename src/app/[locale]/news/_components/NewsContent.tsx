import Anim from "@/components/global/Anim"
import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Post, PostCategory } from "@/lib/fragment"
import { PaginationHandlerResponse } from "@/lib/types"
import {
  adjustSearchParams,
  assetUrl,
  cn,
  dateFormater,
  getLocalizedContent,
} from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function NewsContent({
  data,
  categories,
}: {
  data: PaginationHandlerResponse<Post[]>
  categories: PostCategory[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get("categories[]")
  const locale = useLocale()
  const t = useTranslations("global")

  const handlePageChange = (newPage: number) => {
    adjustSearchParams(searchParams, router, "page", newPage.toString(), true)
  }

  const handleClickFilter = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("page", "1")
    if (category === "all") {
      newParams.delete("categories[]")
    } else {
      newParams.set("categories[]", category)
    }

    router.push(`?${newParams.toString()}`, {
      scroll: false,
    })
  }

  const handleDeleteFilter = () => {
    adjustSearchParams(searchParams, router, "categories[]", "")
  }
  return (
    <>
      {categories?.length > 0 && (
        <div className="no-scrollbar mt-8 flex flex-nowrap items-center gap-3 overflow-x-scroll">
          <Button
            variant={`outline-blue`}
            className={cn(!category && `bg-light-blue text-white`)}
            onClick={handleDeleteFilter}
          >
            {t("all")}
          </Button>
          {categories?.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                handleClickFilter(`${item.id}`)
              }}
            >
              <Button
                variant={`outline-blue`}
                className={cn(
                  category === `${item.id}` && `bg-light-blue text-white`
                )}
              >
                {getLocalizedContent(locale, item.name_en, item.name)}
              </Button>
            </div>
          ))}
        </div>
      )}
      <Anim>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {/* {loading && (
        <>
          {[...Array(3)]?.map((item, i) => <CardSkeleton key={i} />)}
        </>
      )} */}

          {/* {clientData?.data?.length === 0 && (
        <div className="col-span-3">
          <BlankSpaceContent className="text-center" />
        </div>
      )} */}

          {data?.data?.map((item, i) => {
            const en_slug = item?.slug_en !== null ? item?.slug_en : item?.slug
            return (
              <div key={i}>
                <Card
                  href={`/${locale}/${item.type === "news" ? "news" : "blog"}/${getLocalizedContent(locale, en_slug, item.slug)}`}
                >
                  <CardImage
                    className="rounded-2xl"
                    img={assetUrl(item.image)!}
                    alt={getLocalizedContent(
                      locale,
                      item.alt_image_en,
                      item.alt_image
                    )}
                  />
                  <CardContent
                    label={dateFormater(item.published_at)}
                    title={getLocalizedContent(
                      locale,
                      item.title_en,
                      item.title
                    )}
                  >
                    <Link
                      href={`/${locale}/${item.type === "news" ? "news" : "blog"}/${getLocalizedContent(locale, en_slug, item.slug)}`}
                    >
                      <Button
                        variant={"link"}
                        className="min-w-0 px-0 group-hover:underline"
                      >
                        {t("read_more")}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </Anim>
      {data?.last_page > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            {data.links.map((item, index) => {
              return (
                <PaginationItem key={`${item.label}-${index}`}>
                  {item.label.toLowerCase().includes("previous") && (
                    <PaginationPrevious
                      isDisabled={data.current_page === 1}
                      onClick={() =>
                        data.current_page > 1 &&
                        handlePageChange(data.current_page - 1)
                      }
                    />
                  )}
                  {item.label === "..." && index === 3 && (
                    <PaginationLink>...</PaginationLink>
                  )}
                  {!isNaN(parseInt(item.label)) && (
                    <PaginationLink
                      isActive={item.active}
                      onClick={() => handlePageChange(parseInt(item.label))}
                    >
                      {item.label}
                    </PaginationLink>
                  )}
                  {item.label === "..." && index === 11 && (
                    <PaginationLink>...</PaginationLink>
                  )}
                  {item.label.toLowerCase().includes("next") && (
                    <PaginationNext
                      isDisabled={data.current_page === data.last_page}
                      onClick={() =>
                        data.current_page < data.last_page &&
                        handlePageChange(data.current_page + 1)
                      }
                    />
                  )}
                </PaginationItem>
              )
            })}
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
