import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import {
  iconFacebook,
  iconInstagram,
  iconLinkedin,
  iconNext,
  iconTiktok,
  iconX,
  iconYoutube,
  logoChandraAsriWhite,
} from "@/data/images"
import Anim from "./Anim"
import { getLocale, getTranslations } from "next-intl/server"
import { getHomeBanners } from "@/lib/api"
import FooterBanner from "./FooterBanner"

export async function Footer() {
  const locale = await getLocale()
  const tNavbar = await getTranslations("navbar")

  // Fetch footer banners from home-banners navbar position
  const homeBannersData = await getHomeBanners(locale)
  const footerBanner =
    homeBannersData?.navbar && homeBannersData.navbar.length > 0
      ? homeBannersData.navbar[0]
      : null

  const linkFooter = [
    {
      url: "/our-business/chemical-solutions",
      label: tNavbar("for_polymer_customer"),
    },
    {
      url: "/about/who-we-are",
      label: tNavbar("about_who_we_are"),
    },
    {
      url: "/investor",
      label: tNavbar("investor"),
    },
    {
      url: "/sustainability",
      label: tNavbar("sustainability"),
    },
    // {
    //   url: "/",
    //   label: "What we do",
    // },
    // {
    //   url: "/",
    //   label: "News",
    // },
    // {
    //   url: "/",
    //   label: "Career",
    // },
  ]

  return (
    <>
      <FooterBanner />
      <footer className="relative bg-[#182147] py-6 lg:py-12">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <Anim>
              <div className="flex flex-col">
                <Link href="#" className="flex items-center gap-2">
                  <Image
                    src={logoChandraAsriWhite}
                    width={213.5}
                    height={56}
                    alt="Logo Chandra Asri White"
                  />
                </Link>
                <div className="mt-8 text-lg font-bold text-white lg:mt-10">
                  PT Chandra Asri Pacific Tbk
                </div>
                <div className="mt-4 text-md font-bold text-white">
                  Head Office
                </div>
                <div className="mt-2 max-w-[320px] text-sm tracking-[0.14px] text-white/70">
                  Wisma Barito Pacific Tower A, 7th Floor Jl. Let.Jend. S.
                  Parman kav.62-63 Jakarta 11410, Indonesia
                </div>
                <div className="mt-2 flex flex-row">
                  <div className="w-[60px] text-sm text-white/70">
                    {tNavbar("phone")}
                  </div>
                  <div className="text-sm text-white">(62-21) 530 7950</div>
                </div>
                <div className="mt-2 flex flex-row">
                  <div className="w-[60px] text-sm text-white/70">Fax</div>
                  <div className="text-sm text-white">(62-21) 530 8930</div>
                </div>
              </div>
            </Anim>
            <div>
              <Anim>
                <div className="flex w-full flex-col lg:ms-auto">
                  <Button
                    variant="white"
                    className="w-full lg:max-w-[200px]"
                    asChild
                  >
                    <Link href={`/${locale}/contact-us`}>
                      {tNavbar("contact_us")}
                    </Link>
                  </Button>
                  <ul className="mt-8 flex flex-col gap-4">
                    {linkFooter.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/${locale}${item.url}`}
                          className="group mt-[10px] flex gap-2 text-sm text-white hover:text-white/90"
                        >
                          {item.label}
                          <Image
                            className="my-auto transition-all group-hover:translate-x-1"
                            src={iconNext}
                            alt=""
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Anim>
            </div>
          </div>
          <div className="py-8 lg:py-12">
            <hr className="border-border/10" />
          </div>
          <div className="flex flex-col justify-between gap-6 text-white lg:flex-row">
            <div className="text-sm text-white lg:text-xs">
              © {new Date().getFullYear()} Chandra Asri Group. Site by{" "}
              <Link
                href="https://antikode.com/?utm_source=chandra-asri-footer&utm_medium=referral"
                className="hover:underline"
              >
                Antikode
              </Link>
              .
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              <ul className="flex flex-row gap-4 lg:my-auto">
                <li>
                  <a
                    href="https://www.linkedin.com/company/pt-chandra-asri"
                    target="_blank"
                  >
                    <Image src={iconLinkedin} width={32} height={32} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/chandraasri.id"
                    target="_blank"
                  >
                    <Image src={iconInstagram} width={32} height={32} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCoqBsqI8crt0OLCuD7f1UyQ"
                    target="_blank"
                  >
                    <Image src={iconYoutube} width={32} height={32} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@chandraasri.id"
                    target="_blank"
                  >
                    <Image src={iconTiktok} width={32} height={32} alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/ChandraasriID" target="_blank">
                    <Image src={iconX} width={32} height={32} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ChandraAsriGroup/"
                    target="_blank"
                  >
                    <Image src={iconFacebook} width={32} height={32} alt="" />
                  </a>
                </li>
              </ul>
              <div className="flex flex-col justify-between gap-5 *:text-sm *:text-white lg:my-auto lg:flex-row lg:gap-4 lg:*:text-xs">
                <Link
                  href={`/${locale}/terms-condition`}
                  className="hover:underline"
                >
                  {tNavbar("terms_&_conditions")}
                </Link>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="hover:underline"
                >
                  {tNavbar("privacy_policy")}
                </Link>
                <Link
                  href={`/${locale}/cookies-consent`}
                  className="hover:underline"
                >
                  {tNavbar("cookies_consent")}
                </Link>
                <Link
                  href={`/${locale}/disclaimer`}
                  className="hover:underline"
                >
                  {tNavbar("disclaimer")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Banner */}
      </footer>
    </>
  )
}
