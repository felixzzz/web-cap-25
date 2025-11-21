"use client"

import Navbar from "@/components/global/Navbar"
import Image from "next/image"
import { icon404 } from "@/data/images"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLocale } from "next-intl"

export default function NotFound() {
  const locale = useLocale()
  return (
    <>
      <Navbar isBackgroundWhite />
      <div className="bg-white">
        <div className="container mb-20 mt-32">
          <div className="mx-auto flex flex-col text-center">
            <Image
              src={icon404}
              width={180}
              height={180}
              className="mx-auto mb-4"
              alt=""
            />
            <div className="text-[40px] font-bold leading-[125%]">404</div>
            <div className="mx-auto mt-2 max-w-[350px] text-base tracking-[0.16px]">
              Looks like the page you are looking for cannot be found!
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
