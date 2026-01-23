"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

const BANNER_STORAGE_KEY = "sticky-banner-closed"

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if banner was previously closed
    const isClosed = localStorage.getItem(BANNER_STORAGE_KEY)
    if (!isClosed) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(BANNER_STORAGE_KEY, "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-16 z-[999] w-full bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
      <div className="container relative flex items-center justify-between gap-4 py-3">
        {/* Banner Content */}
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-medium text-blue-900 lg:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              rerum.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-blue-200"
          aria-label="Close banner"
        >
          <X className="h-5 w-5 text-blue-900" />
        </button>
      </div>
    </div>
  )
}
