"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function BlankSpaceContent({ className }: { className?: string }) {
  const t = useTranslations("global")

  return (
    <div className="mt-6">
      <div className={cn("text-md font-bold lg:text-lg", className)}>
        {t("no_result_found")}
      </div>
      <div className="mt-3 text-sm tracking-[0.14px] text-foreground/60 lg:text-md">
        {t("no_result_found_desc")}
      </div>
    </div>
  )
}
