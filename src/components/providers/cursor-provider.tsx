"use client"

import { useEffect, useState } from "react"
import { Cursor } from "../global/Cursor"
import { useWindowSize } from "usehooks-ts"

type Prop = {
  children: React.ReactNode
}

export function CursorProvider({ children }: Readonly<Prop>) {
  // client
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { width = 0 } = useWindowSize()

  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true)
      return
    }
  }, [width])

  return (
    <>
      {isMobile ? <></> : <Cursor />}

      {children}
    </>
  )
}
