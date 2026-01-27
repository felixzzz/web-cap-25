"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  icBahasa,
  icEnglish,
  iconClosePrimary,
  iconSearch,
  logoChandraAsri,
  logoChandraAsriWhite,
} from "@/data/images"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { useRouter, usePathname } from "@/navigation"

import clsx from "clsx"
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useNavbarArticle, useNavbarOurBusiness } from "@/lib/hooks"
import { Card, CardContent, CardImage } from "./card/Card"
import { assetUrl, getLocalizedContent } from "@/lib/utils"
import { Megamenu } from "./Megamenu"
import { z } from "zod"

const ChildrenSchema = z.object({
  href: z.string(),
  label: z.string(),
})

const MenuItemSchema = z.object({
  href: z.string(),
  label: z.string(),
  isOpenNewTab: z.boolean(),
  isMegaMenu: z.boolean().optional(),
  highlightTitle: z.string().optional(),
  children: z.array(ChildrenSchema).optional(),
})

export type MenuItem = z.infer<typeof MenuItemSchema>

type Props = {
  isBackgroundWhite?: boolean
  children?: React.ReactNode
}

export default function Navbar({ isBackgroundWhite = false, children }: Props) {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const t = useTranslations("global")
  const tNavbar = useTranslations("navbar")
  const locale = useLocale()

  const initialListMenu: MenuItem[] = useMemo(
    () => [
      { href: "/", label: tNavbar("home"), isOpenNewTab: false },
      {
        href: "/about",
        label: tNavbar("about_us"),
        isMegaMenu: true,
        isOpenNewTab: false,
        highlightTitle: tNavbar("company_highlights"),
        children: [
          {
            href: "/about/who-we-are",
            label: tNavbar("about_who_we_are"),
          },
          {
            href: "/about/management-and-structure",
            label: tNavbar("about_management"),
          },
          {
            href: "/about/awards-and-recognition",
            label: tNavbar("about_awards"),
          },
        ],
      },
      {
        href: "/our-business",
        label: tNavbar("our_business"),
        isMegaMenu: true,
        isOpenNewTab: false,
        highlightTitle: tNavbar("discover_latest_update"),
        children: [
          {
            href: "/our-business",
            label: t("overview"),
          },
          {
            href: "/our-business/chemical-solutions",
            label: tNavbar("our_business_chemical"),
          },
        ],
      },
      {
        href: "/investor",
        label: "Investor",
        isMegaMenu: true,
        isOpenNewTab: false,
        highlightTitle: tNavbar("investor_update"),
        children: [
          {
            href: "/investor",
            label: t("overview"),
          },
          {
            href: "/investor/stocks-and-bonds",
            label: tNavbar("stocks_and_bonds"),
          },
          {
            href: "/investor/reports",
            label: tNavbar("reports"),
          },
          {
            href: "/investor/publication",
            label: tNavbar("publication"),
          },
        ],
      },
      {
        href: "/sustainability",
        label: tNavbar("sustainability"),
        isMegaMenu: true,
        isOpenNewTab: false,
        highlightTitle: tNavbar("sustainability_update"),
        children: [
          {
            href: "/sustainability",
            label: t("overview"),
          },
          {
            href: "/sustainability/environment",
            label: tNavbar("environment"),
          },
          {
            href: "/sustainability/social",
            label: tNavbar("social"),
          },
          {
            href: "/sustainability/governance",
            label: tNavbar("governance"),
          },
          {
            href: "/sustainability/sustainability-in-action",
            label: tNavbar("esg_in_action"),
          },
          {
            href: "/sustainability/circular-economy-and-partnership",
            label: tNavbar("circular_economy_and_partnership"),
          },
          // {
          //   href: "/sustainability/product-responsibility",
          //   label: tNavbar("product_responsibility"),
          // },
          // {
          //   href: "/sustainability/practices-of-employment",
          //   label: tNavbar("practices_of_employment"),
          // },
          {
            href: "/sustainability/reports-and-publications",
            label: tNavbar("report_and_publication"),
          },
        ],
      },
      {
        href: "/governance",
        label: tNavbar("governance"),
        isOpenNewTab: false,
      },
      { href: "/news", label: tNavbar("news"), isOpenNewTab: false },
      {
        href: "https://careers.capcx.com/",
        label: tNavbar("career"),
        isOpenNewTab: true,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tNavbar]
  )

  const {
    data: ourBusinessNavbarData,
    isLoading: isLoadingOurBusinessNavbarData,
  } = useNavbarOurBusiness()

  const [backgroundWhite, setBackgroundWhite] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenNavbarMobile, setIsOpenNavbarMobile] = useState(false)

  const listMenu = useMemo(() => {
    return initialListMenu.map((item) => {
      if (item.href === "/our-business") {
        if (!ourBusinessNavbarData) {
          return item
        }

        return {
          ...item,
          children: [
            ...(item.children || []),
            ...ourBusinessNavbarData.data.map((business) => ({
              href: `/our-business/${business.slug}`,
              label: getLocalizedContent(
                locale,
                business.title_en,
                business.title
              ),
            })),
          ],
        }
      }

      return item
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialListMenu, ourBusinessNavbarData])

  const switchLocale = (nextLocale: "id" | "en") => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    )
  }

  // Define paths where the background should always be white
  const pathsWithWhiteBackground = [
    "/search",
    "/news",
    "/contact-us",
    "/disclaimer",
    "/governance/policy",
    "/governance/whistleblowing",
  ]

  const handleSearch = () => {
    router.replace(`/search?q=${keyword}`)
  }

  const changeBackground = () => {
    const langPrefix = pathname.split("/")[1]
    const isPathWithWhiteBackground = pathsWithWhiteBackground.some((path) =>
      pathname.startsWith(`/${langPrefix}${path}`)
    )
    setBackgroundWhite(
      window.scrollY >= 1 || isPathWithWhiteBackground || isBackgroundWhite
    )
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <header
      className={clsx(
        "fixed z-[1000] w-full duration-200 ease-in-out",
        backgroundWhite ? "box-shadow bg-white" : "bg-transparent text-white",
        isOpenNavbarMobile && `bg-white`
      )}
      style={{ top: "var(--sticky-banner-height, 0px)" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}/`} className="flex items-center gap-2">
          <Image
            src={
              backgroundWhite || isOpenNavbarMobile
                ? logoChandraAsri
                : logoChandraAsriWhite
            }
            width={122}
            height={32}
            alt="Logo Chandra Asri"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          <NavigationMenu className="static">
            <NavigationMenuList className="">
              <Suspense>
                {listMenu.map((item, i) => (
                  <Megamenu
                    key={i}
                    item={item}
                    backgroundWhite={backgroundWhite}
                  />
                ))}
              </Suspense>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-4">
          <button
            className="relative cursor-pointer"
            onClick={() => setIsOpenSearch(!isOpenSearch)}
            aria-label="Search"
          >
            <Search
              color={
                backgroundWhite || isOpenNavbarMobile ? "#337ABC" : "#FFFFFF"
              }
              className="h-6 w-6 text-primary"
            />
          </button>
          <button
            className="block cursor-pointer lg:hidden"
            aria-label="Mega Menu Mobile"
            onClick={() => setIsOpenNavbarMobile(!isOpenNavbarMobile)}
          >
            {isOpenNavbarMobile ? (
              <X
                color={
                  backgroundWhite || isOpenNavbarMobile ? "#337ABC" : "#FFFFFF"
                }
                size={24}
              />
            ) : (
              <Menu color={backgroundWhite ? "#337ABC" : "#FFFFFF"} size={24} />
            )}
          </button>
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex w-auto flex-shrink-0 gap-[2px] px-4"
                  variant="ghost"
                  size="icon"
                >
                  <Image
                    className="mr-1 size-4 rounded-full border border-white"
                    src={locale === "id" ? icBahasa : icEnglish}
                    alt=""
                  />
                  {locale.toUpperCase()}
                  <ChevronDown className="size-5" />
                  <span className="sr-only">{t("change_language")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[1002]" align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => switchLocale("en")}
                >
                  <div className="flex cursor-pointer items-center">
                    English
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => switchLocale("id")}
                >
                  <div className="flex cursor-pointer items-center">
                    Bahasa Indonesia
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isOpenSearch && (
        <div
          className="box-shadow absolute z-[100] w-full bg-white transition-all"
          style={{ top: "calc(64px + var(--sticky-banner-height, 0px))" }}
        >
          <div className="container relative w-full py-4">
            <Image
              src={iconSearch}
              className="absolute left-4 top-[50%] translate-y-[-50%]"
              width={16}
              height={16}
              alt=""
            />
            <Input
              type="text"
              className="rounded-none border-0 px-10 text-black outline-none ring-0 focus:border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              placeholder="Type in a keyword or topic to search"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearch()
              }}
            />
            <Image
              src={iconClosePrimary}
              className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
              width={16}
              height={16}
              alt=""
              onClick={() => setIsOpenSearch(false)}
            />
          </div>
        </div>
      )}
      {isOpenNavbarMobile && (
        <>
          <NavbarMobile
            switchLocale={switchLocale}
            locale={locale}
            items={listMenu}
          />
          <div
            className="fixed inset-0 left-0 z-10 h-full w-full bg-black/60"
            style={{ top: "calc(64px + var(--sticky-banner-height, 0px))" }}
          />
        </>
      )}
      {children}
    </header>
  )
}

function NavbarMobile({
  items,
  locale,
  switchLocale,
}: {
  items: MenuItem[]
  locale: string
  switchLocale: (nextLocale: "id" | "en") => void
}) {
  const { data } = useNavbarArticle()
  const [childrenData, setChildrenData] = useState<MenuItem | null>(null)
  const t = useTranslations("global")
  const tNavbar = useTranslations("navbar")

  return (
    <>
      <div
        className="fixed left-0 z-50 w-full bg-white"
        style={{ top: "calc(64px + var(--sticky-banner-height, 0px))" }}
      >
        <div className="mx-auto flex flex-col lg:flex-row">
          <div className="py-4">
            <div className="container lg:ml-auto">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <>
                    {item.isMegaMenu ? (
                      <div
                        key={item.href}
                        className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md font-bold text-black"
                        onClick={() => {
                          setChildrenData(item)
                        }}
                      >
                        <div className="my-auto">{item.label}</div>
                        {item.isMegaMenu && (
                          <ChevronRight
                            size={20}
                            color="#337ABC"
                            className="my-auto"
                          />
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md font-bold text-black"
                      >
                        <div className="my-auto">{item.label}</div>
                      </Link>
                    )}
                  </>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="my-6 flex w-auto flex-shrink-0 gap-[2px] text-black"
                    variant="ghost"
                    size="icon"
                  >
                    <Image
                      className="mr-1 size-4 rounded-full border border-white"
                      src={locale === "id" ? icBahasa : icEnglish}
                      alt=""
                    />
                    {locale.toUpperCase()}
                    <ChevronDown className="size-5" />
                    <span className="sr-only">{t("change_language")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[1000]" align="end">
                  <DropdownMenuItem>
                    <div
                      className="flex cursor-pointer items-center"
                      onClick={() => switchLocale("en")}
                    >
                      English
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div
                      className="flex cursor-pointer items-center"
                      onClick={() => switchLocale("id")}
                    >
                      Bahasa Indonesia
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="w-full" variant="outline-primary" asChild>
                <Link href={`/${locale}/contact-us`}>
                  {tNavbar("get_in_touch")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "fixed right-0 z-[100] h-full min-h-dvh w-full translate-x-[100%] overflow-auto bg-white transition-all duration-300",
          childrenData && "!translate-x-0"
        )}
      >
        <div className="bg-patrick-blue pb-8 pt-4">
          <div className="container">
            <div className="flex flex-row gap-4">
              <ArrowLeft
                color="white"
                size={24}
                onClick={() => setChildrenData(null)}
              />
              <div className="text-md text-white">{childrenData?.label}</div>
            </div>
            <hr className="my-5 border-white/20" />
            {/* <div className="text-xl font-bold text-white">
              Business Solutions
            </div>
            <div className="mt-2 text-md tracking-[0.16px] text-white/70">
              We understand the unique challenges your business faces, and{" "}
              {`we're`}
              here to provide tailored solutions that make a real impact.
            </div> */}
            <div className="mt-8 flex flex-col gap-6">
              {/* <div className="text-[18px] font-bold text-white/50">
                What We do
              </div> */}

              {childrenData?.children?.map((item, i) => (
                <div key={i} className="font-bold text-white">
                  <Link
                    href={`/${locale}${item.href}`}
                    className="hover:underline"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              {/* <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between text-[18px] font-bold text-white">
                  <div className="my-auto">Chemical Solutions</div>
                  <ChevronDown className="rotate-180" color="white" size={20} />
                </div>
                <div className="text-md text-white">Petrochemical</div>
                <div className="text-md text-white">Chemical</div>
              </div> */}
              {/* <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between text-[18px] font-bold text-white/50">
                  <div className="my-auto">Infrastructure Solutions</div>
                  <ChevronDown color="white" size={20} />
                </div>
              </div> */}
              {/* <div className="flex flex-row justify-between text-[18px] font-bold text-white/50">
                <div className="my-auto">Trading Solutions</div>
                <ChevronDown color="white" size={20} />
              </div> */}
            </div>
          </div>
        </div>
        <div className="container pb-24 pt-6">
          <div className="mb-6 text-[18px] font-bold text-black">
            {tNavbar("discover_latest_update")}
          </div>
          <div className="flex flex-col gap-6">
            {data?.data?.map((item, i) => (
              <div key={i}>
                <Card href={`/${locale}/news/${item.slug}`}>
                  <CardImage img={`${assetUrl(item.image)}`} />
                  <CardContent
                    label="NEWS"
                    title={`${getLocalizedContent(locale, item.title_en, item.title)}`}
                    className="text-black"
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
            {/* {[...Array(3)].map((item, itemIndex) => (
              <div key={itemIndex}>
                <Link href={`/news/asdasdasd`}>
                  <AspectRatio ratio={16 / 9} className="mb-6">
                    <Image
                      src={imgTempNews}
                      alt="img-story"
                      fill
                      className="rounded-3xl object-cover"
                    />
                  </AspectRatio>
                </Link>
                <p className="mb-1 text-xs font-semibold tracking-[0.96px] text-gray">
                  NEWS
                </p>
                <Link href={`/news/asdasdasd`}>
                  <div className="line-clamp-2 text-lg font-bold text-black">
                    Chandra Asri Supports Cirata Floating PLTS to Fulfill TKDN
                  </div>
                </Link>
                <div className="mt-2">
                  <Link
                    href={`/news/asdasdasd`}
                    className="flex flex-row gap-2 text-sm font-bold text-primary"
                  >
                    <div className="my-auto">View Detail</div>
                    <ArrowRight className="my-auto" color="#337ABC" size={20} />
                  </Link>
                </div>
              </div>
            ))} */}
          </div>
          <hr className="my-6 border-input" />
          <div className="flex flex-col gap-6">
            <Link
              href={`/${locale}/news`}
              className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md text-black"
            >
              <div className="my-auto">{t("news")}</div>
            </Link>
            <Link
              href={`/${locale}/career`}
              className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md text-black"
            >
              <div className="my-auto">{tNavbar("career")}</div>
            </Link>
            <Link
              href={`/${locale}/contact-us`}
              className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md text-black"
            >
              <div className="my-auto">{tNavbar("contact_us")}</div>
            </Link>
            {/* <Link
              href="/our-business/for-polymer-customers"
              className="hover:bg-gray-100 flex flex-row justify-between gap-2 rounded text-md text-black"
            >
              <div className="my-auto">For Polymer Customers</div>
            </Link> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="my-6 flex w-auto flex-shrink-0 gap-[2px] font-normal text-black"
                variant="ghost"
                size="icon"
              >
                <Image
                  className="mr-1 size-4 rounded-full border border-white"
                  src={locale === "id" ? icBahasa : icEnglish}
                  alt=""
                />
                {locale.toUpperCase()}
                <ChevronDown className="size-5" />
                <span className="sr-only">{t("change_language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[1000]" align="end">
              <DropdownMenuItem>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() => switchLocale("en")}
                >
                  English
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() => switchLocale("id")}
                >
                  Bahasa Indonesia
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="w-full" variant="outline-primary" asChild>
            <Link href={`/${locale}/contact-us`}>
              {tNavbar("get_in_touch")}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
