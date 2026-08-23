import { ReactNode } from "react"
import "./globals.css"

export const dynamic = "force-dynamic"

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
