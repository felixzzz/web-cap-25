"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetaProductDatasheet2, ProductDatasheet2 } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React, { useMemo, useState } from "react"

export function ProductDatasheet({
  datasheet_list_en,
  datasheet_list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  className,
  children,
  ...props
}: MetaProductDatasheet2 & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()
  const localizedContent = useMemo(
    () => getLocalizedContent(locale, datasheet_list_en, datasheet_list_id),
    [locale, datasheet_list_en, datasheet_list_id]
  )

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className={cn(`relative py-12 lg:py-24 ${localizedContent.length === 0 && "hidden"}`, className)} {...props}>
      <div className="container">
        {getLocalizedContent(locale, title_en, title_id) && (
          <h1 className="mb-6 text-3xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h1>
        )}
        <div className="space-y-20">
          {localizedContent?.map((item, i) => (
            <ProductDatasheetList key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductDatasheetList({ list, status }: ProductDatasheet2) {
  const [activeProduct, setActiveProduct] = useState<string>(
    list?.[0].title || ""
  )

  const activeContent = useMemo(
    () => list?.find((item) => item?.title === activeProduct),
    [list, activeProduct]
  )

  const isRightSpaceEmpty = !activeContent?.image
  const isLeftSpaceEmpty = list?.length <= 1

  if (status == "inactive") {
    return <></>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-10 overflow-hidden lg:grid-cols-12">
        {!isLeftSpaceEmpty && (
          <>
            <div
              className={cn(
                `hidden lg:col-span-2 lg:block`,
                isRightSpaceEmpty && "lg:col-span-3"
              )}
            >
              {list?.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    `cursor-pointer border-l-4 border-transparent px-6 py-4 capitalize hover:border-primary hover:font-bold hover:text-primary`,
                    item.title == activeProduct &&
                      "border-primary font-bold text-primary"
                  )}
                  onClick={() => setActiveProduct(item.title!)}
                >
                  {item.sidebarmenu_title}
                </div>
              ))}
            </div>
            <div className="lg:hidden">
              <Tabs
                value={activeProduct}
                onValueChange={(value: string) => {
                  setActiveProduct(value)
                }}
              >
                <TabsList className="flex w-full flex-row overflow-auto bg-slate-50">
                  {list?.map((item, i) => (
                    <TabsTrigger
                      key={i}
                      value={item.title!}
                      className="w-auto px-4 capitalize data-[state=active]:bg-slate-50"
                    >
                      {item.title!.replace("-", " ")}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </>
        )}

        <div
          className={cn(
            `lg:col-span-6`,
            isRightSpaceEmpty && `lg:col-span-9`,
            isLeftSpaceEmpty && `lg:col-span-8`
          )}
        >
          {activeContent && (
            <>
              <h2 className="mb-6 text-2xl font-bold">{activeContent.title}</h2>
              <div
                className="prose max-w-full overflow-auto"
                dangerouslySetInnerHTML={{
                  __html: activeContent?.description!,
                }}
              ></div>

              {activeContent?.file && (
                <>
                  <Link
                    href={`${assetUrl(activeContent?.file)}`}
                    target="_blank"
                  >
                    <Button variant={"link"} className="min-w-0 px-0">
                      Download PDF
                      <ArrowRight size={22} strokeWidth={2} className="ml-1" />
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {!isRightSpaceEmpty && (
          <div className="lg:col-span-4">
            {activeContent?.image && (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={assetUrl(activeContent?.image!)!}
                  alt="card-img"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
