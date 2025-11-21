"use client"

import Navbar from "@/components/global/Navbar"
import { Button } from "@/components/ui/button"
import { icon500 } from "@/data/images"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useLocale()
  return (
    <>
      <Navbar isBackgroundWhite />
      <div className="bg-white">
        <div className="container mb-20 mt-32">
          <div className="mx-auto flex flex-col text-center">
            <Image
              src={icon500}
              width={180}
              height={180}
              className="mx-auto mb-4"
              alt=""
            />
            <div className="text-[40px] font-bold leading-[125%]">500</div>
            <div className="mx-auto mt-2 max-w-[350px] text-base tracking-[0.16px]">
              Opps! Something went wrong <br /> and unable to complete your
              request.
            </div>
            <Button className="mx-auto mt-6" asChild>
              <Link href={`/${locale}/`}>Back To Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
