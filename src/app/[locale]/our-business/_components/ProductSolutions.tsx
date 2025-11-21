"use client"
import { CardContent } from "@/components/global/card/Card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetaProductDatasheet } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent, isContentActive } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React, { useMemo, useState } from "react"

export function ProductSolutions({
  datasheet_list_en,
  datasheet_list_id,
  status_en,
  status_id,
  title_en,
  title_id,
  className,
  children,
  ...props
}: MetaProductDatasheet & React.HTMLAttributes<HTMLDivElement>) {
  const locale = useLocale()
  const localizedContent = useMemo(
    () => getLocalizedContent(locale, datasheet_list_en, datasheet_list_id),
    [locale, datasheet_list_en, datasheet_list_id]
  )

  const [activeProduct, setActiveProduct] = useState<string>(
    localizedContent[0]?.title || ""
  )

  const activeContent = useMemo(
    () => localizedContent.find((item) => item.title === activeProduct),
    [localizedContent, activeProduct]
  )

  const isRightSpaceEmpty = !(
    activeContent?.datasheet_name ||
    activeContent?.datasheet_file ||
    activeContent?.datasheet_name2 ||
    activeContent?.image
  )

  const isLeftSpaceEmpty = localizedContent?.length <= 1

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <div className={cn(`relative py-12 lg:py-24`, className)} {...props}>
      <div className="container">
        {getLocalizedContent(locale, title_en, title_id) && (
          <h1 className="mb-6 text-3xl font-bold">
            {getLocalizedContent(locale, title_en, title_id)}
          </h1>
        )}
        <div className="grid grid-cols-1 gap-10 overflow-hidden lg:grid-cols-12">
          {!isLeftSpaceEmpty && (
            <>
              <div
                className={cn(
                  `hidden lg:col-span-2 lg:block`,
                  isRightSpaceEmpty && "lg:col-span-3"
                )}
              >
                {getLocalizedContent(
                  locale,
                  datasheet_list_en,
                  datasheet_list_id
                ).map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      `cursor-pointer border-l border-transparent px-6 py-4 capitalize hover:border-primary hover:font-bold hover:text-primary hover:border-l-2 border-l-[#E8E8E8] transition-all duration-200`,
                      item.title == activeProduct &&
                        "border-l-2 border-primary font-bold text-primary"
                    )}
                    onClick={() => setActiveProduct(item.title!)}
                  >
                    {item.sidebarmenu_title}
                  </div>
                ))}
                {children}
              </div>
              <div className="lg:hidden">
                <Tabs
                  value={activeProduct}
                  onValueChange={(value: string) => {
                    setActiveProduct(value)
                  }}
                >
                  <TabsList className="flex w-full flex-row overflow-auto">
                    {getLocalizedContent(
                      locale,
                      datasheet_list_en,
                      datasheet_list_id
                    ).map((item, i) => (
                      <TabsTrigger
                        key={i}
                        value={item.title!}
                        className="w-auto px-4 capitalize"
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
                <h2 className="mb-6 text-2xl font-bold">
                  {activeContent.title}
                </h2>
                <div
                  className="prose max-w-full overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: activeContent?.description!,
                  }}
                ></div>

                {activeContent?.upload && (
                  <>
                    <Link
                      href={`${assetUrl(activeContent?.upload)}`}
                      target="_blank"
                    >
                      <Button variant={"link"} className="min-w-0 px-0">
                        Download PDF
                        <ArrowRight
                          size={22}
                          strokeWidth={2}
                          className="ml-1"
                        />
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {!isRightSpaceEmpty && (
            <div className="lg:col-span-4">
              {activeContent?.card_title && (
                <>
                  <Card className="mb-10 overflow-hidden rounded-xl">
                    <CardHeader className="bg-blue-900 py-3">
                      <h3 className="text-lg font-bold text-white">
                        {activeContent?.card_title}
                      </h3>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-5">
                        {activeContent?.delivery_method && (
                          <div>
                            <h5 className="text-xs opacity-50">
                              Delivery Method
                            </h5>
                            <p className="text-sm">
                              {activeContent?.delivery_method}
                            </p>
                          </div>
                        )}

                        <div className="prose mb-4 prose-p:mb-0 prose-p:text-xs prose-p:opacity-50 prose-ul:my-0 prose-li:my-0 prose-li:text-sm prose-li:marker:text-black">
                          {activeContent?.application && (
                            <div
                              className="prose"
                              dangerouslySetInnerHTML={{
                                __html: activeContent?.application!,
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 pb-0">
                      <div className="w-full border-t py-4">
                        <div className="flex flex-col items-start  space-y-4">
                          {activeContent?.datasheet_name &&
                            activeContent?.datasheet_file && (
                              <Link
                                href={`${assetUrl(activeContent?.datasheet_file)}`}
                                className={cn(
                                  `${buttonVariants({ variant: "link" })} h-auto p-0 text-black`
                                )}
                                target="_blank"
                              >
                                {activeContent?.datasheet_name}
                                <ArrowRight
                                  size={22}
                                  strokeWidth={2}
                                  className="ml-1"
                                />
                              </Link>
                            )}

                          {activeContent?.datasheet_name2 &&
                            activeContent?.datasheet_file2 && (
                              <Link
                                href={`${assetUrl(activeContent?.datasheet_file2)}`}
                                target="_blank"
                                className={cn(
                                  `${buttonVariants({ variant: "link" })} h-auto p-0 text-black`
                                )}
                              >
                                {activeContent?.datasheet_name2}
                                <ArrowRight
                                  size={22}
                                  strokeWidth={2}
                                  className="ml-1"
                                />
                              </Link>
                            )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </>
              )}

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
      </div>
    </div>
  )
}
