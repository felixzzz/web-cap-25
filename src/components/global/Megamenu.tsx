import { assetUrl, cn, getLocalizedContent } from "@/lib/utils"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { MenuItem } from "./Navbar"
import Link from "next/link"
import Image from "next/image"
import { imgBannerIndonesiaAsri } from "@/data/images"
import { Card, CardContent, CardImage } from "./card/Card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  useArticleSustainability,
  useNavbarArticle,
  useQueryInvestorUpdate,
} from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import { MetaDocumentItem } from "@/lib/fragment"
import { dataMegamenuAboutus } from "@/data/data"

type Prop = {
  item: MenuItem
  backgroundWhite: boolean
}

export function Megamenu({ item, backgroundWhite }: Prop) {
  const locale = useLocale()
  const t = useTranslations("global")
  const tNavbar = useTranslations("navbar")
  const { data } = useNavbarArticle()
  const { data: dataSustainability } = useArticleSustainability({
    options: {
      enabled: true,
    },
    limit: 3,
  })
  const { data: dataInvestorUpdate } = useQueryInvestorUpdate()
  const pathname = usePathname()

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"

    return pathname.startsWith(`/${locale}${href}`)
  }

  return (
    <>
      <NavigationMenuItem key={item.href}>
        {!item.isMegaMenu && (
          <NavigationMenuLink
            href={item.isOpenNewTab ? item.href : `/${locale}${item.href}`}
            target={item.isOpenNewTab ? "_blank" : "_self"}
            className={cn(
              `py-5 lg:px-2 xl:px-3`,
              isActiveLink(item.href) &&
                (backgroundWhite
                  ? "font-bold text-primary"
                  : "font-bold text-white")
            )}
          >
            {item.label}
          </NavigationMenuLink>
        )}

        {item.isMegaMenu && (
          <>
            <NavigationMenuTrigger
              className={cn(
                `py-5 hover:font-bold lg:px-2 xl:px-3`,
                isActiveLink(item.href) &&
                  (backgroundWhite
                    ? "font-bold text-primary"
                    : "font-bold text-white")
              )}
            >
              {item.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className="grid grid-cols-1 lg:w-screen lg:grid-cols-12">
                <div className="col-span-4 bg-patrick-blue text-white">
                  <div className="p-14">
                    <h2 className="mb-10 text-2xl font-bold">{item.label}</h2>

                    <div className="space-y-6">
                      {item.children?.map((item, i) => (
                        <div key={i} className="font-bold">
                          <Link
                            href={`/${locale}${item.href}`}
                            className="cursor-pointer hover:underline"
                          >
                            {item.label}
                          </Link>
                        </div>
                      ))}
                      {(item.label === "Sustainability" ||
                        item.label === "Keberlanjutan") && (
                        <div className="mt-10">
                          <div className="max-w-[270px] text-xs tracking-[0.12px] text-white">
                            {tNavbar("join_indonesia_asri")}
                          </div>
                          <div className="mt-3">
                            <Link
                              href="https://indonesiaasri.com/"
                              target="_blank"
                            >
                              <Image
                                src={imgBannerIndonesiaAsri}
                                width={258}
                                height={48}
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="p-14">
                    <h3 className="mb-5 text-lg font-bold">
                      {item.highlightTitle}
                    </h3>
                    {(item.label === "About Us" ||
                      item.label === "Tentang Kami") && (
                      <div className="grid grid-cols-3 gap-6">
                        {dataMegamenuAboutus?.map((item, i: number) => (
                          <div key={i}>
                            <Card href={`/${locale}${item.slug}`}>
                              <CardImage img={item.image} />
                              <CardContent
                                label={getLocalizedContent(
                                  locale,
                                  item.subtitle,
                                  item.subtitle_id
                                )}
                                title={`${getLocalizedContent(locale, item.title_en, item.title_id)}`}
                              >
                                <Button
                                  variant={"link"}
                                  className="min-w-0 cursor-pointer px-0 text-sm font-bold group-hover:underline"
                                >
                                  <span>{t("view_detail")}</span>

                                  <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    className="ml-1 transition-all duration-300 group-hover:ml-2"
                                  />
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    )}
                    {(item.label === "Our Business" ||
                      item.label === "Bisnis Kami") && (
                      <div className="grid grid-cols-3 gap-6">
                        {data?.data?.map((item, i) => (
                          <div key={i}>
                            <Card href={`/${locale}/news/${item.slug}`}>
                              <CardImage img={`${assetUrl(item.image)}`} />
                              <CardContent
                                label={tNavbar("news")}
                                title={`${getLocalizedContent(locale, item.title_en, item.title)}`}
                              >
                                <Button
                                  variant={"link"}
                                  className="min-w-0 cursor-pointer px-0 text-sm font-bold group-hover:underline"
                                >
                                  <span>{t("view_detail")}</span>

                                  <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    className="ml-1 transition-all duration-300 group-hover:ml-2"
                                  />
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    )}
                    {(item.label === "Sustainability" ||
                      item.label === "Keberlanjutan") && (
                      <div className="grid grid-cols-3 gap-6">
                        {dataSustainability?.data?.map((item, i) => (
                          <div key={i}>
                            <Card
                              href={`/${locale}/sustainability/sustainability-in-action/${item.slug}`}
                            >
                              <CardImage img={`${assetUrl(item.image)}`} />
                              <CardContent
                                label={tNavbar("sustainability")}
                                title={`${getLocalizedContent(locale, item.title_en, item.title)}`}
                              >
                                <Button
                                  variant={"link"}
                                  className="min-w-0 cursor-pointer px-0 text-sm font-bold group-hover:underline"
                                >
                                  <span>{t("view_detail")}</span>

                                  <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    className="ml-1 transition-all duration-300 group-hover:ml-2"
                                  />
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.label === "Investor" && (
                      <div className="grid grid-cols-3 gap-6">
                        {dataInvestorUpdate?.data?.map(
                          (item: MetaDocumentItem, i: number) => (
                            <div key={i}>
                              <Card href={`/${locale}/investor/reports`}>
                                {item.image && (
                                  <CardImage img={`${assetUrl(item.image!)}`} />
                                )}
                                <CardContent
                                  label={tNavbar("reports")}
                                  title={`${getLocalizedContent(locale, item.document_name_en, item.document_name_id)}`}
                                >
                                  <Button
                                    variant={"link"}
                                    className="min-w-0 cursor-pointer px-0 text-sm font-bold group-hover:underline"
                                  >
                                    <span>{t("view_detail")}</span>

                                    <ArrowRight
                                      size={16}
                                      strokeWidth={2}
                                      className="ml-1 transition-all duration-300 group-hover:ml-2"
                                    />
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </>
        )}
      </NavigationMenuItem>
    </>
  )
}
