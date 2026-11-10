"use client"

import React from "react"
import { usePathname } from "next/navigation"

export function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Hide footer on admin routes such as /admin/flow-editor
  if (pathname && pathname.includes("/admin/")) {
    return null
  }

  return <>{children}</>
}

