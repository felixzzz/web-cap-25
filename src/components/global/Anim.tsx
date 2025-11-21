"use client"
import { fadeInUp } from "@/data/keyframes"
import React, { useEffect, useState } from "react"
import { Reveal, RevealProps } from "react-awesome-reveal"

type Props = {
  children: React.ReactNode
} & RevealProps

const Anim = ({
  delay = 0,
  cascade = true,
  keyframes = fadeInUp,
  className,
  children,
  ...prop
}: Props) => {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <>{children}</>

  return (
    <Reveal
      className={className}
      keyframes={keyframes}
      style={{ opacity: 0 }}
      delay={delay}
      cascade={cascade}
      damping={0.1}
      triggerOnce
      fraction={0.1}
      {...prop}
    >
      {children}
    </Reveal>
  )
}

export default Anim
