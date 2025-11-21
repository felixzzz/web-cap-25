"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import gsap from "gsap"
import { useCursorStore } from "@/store/cursor"
import { usePathname } from "next/navigation"

export function Cursor() {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const { isHovered, text, setText, setIsHovered } = useCursorStore(
    (state) => state
  )
  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })
  const circle = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)
  const size = isHovered ? 72 : 0

  useEffect(() => {
    setIsClient(true)
  }, [])

  const lerp = useCallback(
    (x: number, y: number, a: number) => x * (1 - a) + y * a,
    []
  )

  const manageMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }, [])

  const animate = useCallback(() => {
    const { x, y } = delayedMouse.current

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.25),
      y: lerp(y, mouse.current.y, 0.25),
    }

    if (
      Math.abs(x - mouse.current.x) > 0.1 ||
      Math.abs(y - mouse.current.y) > 0.1
    ) {
      if (circle.current) {
        gsap.set(circle.current, {
          x: delayedMouse.current.x + 24,
          y: delayedMouse.current.y + 24,
          xPercent: -50,
          yPercent: -50,
        })
      }
    }

    rafId.current = window.requestAnimationFrame(animate)
  }, [lerp])

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove)
    rafId.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", manageMouseMove)
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
      }
    }
  }, [animate, manageMouseMove])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText("")
      setIsHovered(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [pathname, setIsHovered, setText])

  if (!isClient) return <></>

  return (
    <div
      style={{
        width: size,
        height: size,
        transition: `height 0.3s ease-out, width 0.3s ease-out`,
        transform: `translate(-50%, -50%)`,
      }}
      className={`pointer-events-none fixed left-0 top-0 z-[70] hidden h-10 w-10 items-center justify-center rounded-full bg-white lg:flex`}
      ref={circle}
    >
      {text && (
        <p className="transition-default mx-auto max-w-[40px] text-center text-xs font-bold text-primary">
          {text}
        </p>
      )}
    </div>
  )
}
