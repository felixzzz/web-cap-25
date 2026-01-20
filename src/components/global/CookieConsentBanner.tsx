"use client"

import { useState, useEffect } from "react"

import { SmallPopup } from "@/lib/fragment"
import { getLocalizedContent } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import CookieConsent from "react-cookie-consent"

export default function CookieConsentBanner({
  smallPopup,
}: {
  smallPopup: SmallPopup | null
}) {
  const tCookiesConsent = useTranslations("cookiesConsent")
  const locale = useLocale()

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setShowBanner(true))
    } else {
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  return showBanner ? (
    <CookieConsent
      location="bottom"
      buttonText={tCookiesConsent("labelAccept")}
      cookieName="caCookiesConsent"
      containerClasses="!bg-white rounded-md shadow-md flex-col lg:flex-row lg:!items-center lg:!bottom-4 !bottom-0 lg:!left-8 lg:!right-8 lg:!w-auto lg:!flex-nowrap !p-6 !gap-4"
      contentClasses="!m-0 !flex-auto"
      style={{ left: "unset" }}
      buttonWrapperClasses="w-full px-4 lg:px-0 lg:w-auto"
      buttonClasses="!rounded-full !text-center !bg-[#337ABC] !px-20 !m-0 !py-2 !text-white !font-semibold !w-full lg:!w-auto"
      expires={365} // Number of days before the cookie expires
      onAccept={() => {
        // Add functionality when user accepts cookies
      }}
    >
      <p className="mb-2 text-xl font-bold text-[#1A1A1A]">
        {getLocalizedContent(
          locale,
          smallPopup?.title_en,
          smallPopup?.title_id
        )}
      </p>
      <p
        className="text-sm text-gray [&>p>a]:font-bold [&>p>a]:text-blue-tint [&>p>a]:underline"
        dangerouslySetInnerHTML={{
          __html: getLocalizedContent(
            locale,
            smallPopup?.description_en,
            smallPopup?.description_id
          ),
        }}
      />
    </CookieConsent>
  ) : null
}
