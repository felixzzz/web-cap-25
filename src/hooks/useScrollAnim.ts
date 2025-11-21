"use client"
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

/**
 *
 * @param {*} animation
 * @returns
 *
 * this custom hooks is not ready yet
 */
const className = ["delay-100"]
type variants = "fadeIn"

// if you want tailwind intellisense here, you need to add class attributes on settings first
const animVariants = {
  fadeIn: ["transition-opacity duration-700", "opacity-0", "opacity-100"],
}

export default function useScrollAnim(
  threshold: number[] = [0.25, 0.5, 0.75],
  animation: variants = "fadeIn",
  triggerOnce: boolean = true
) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  })

  const [animate, setAnimate] = useState(() => {
    return {
      initialClass: animVariants[animation][1],
      hasSet: false,
    }
  })

  const anim = useCallback(
    (delay: number) => {
      return animate.hasSet
        ? `${animVariants[animation][0]} ${animVariants[animation][2]} delay-${delay}`
        : animate.initialClass
    },
    [animate, animation]
  )

  useEffect(() => {
    if (inView) {
      setAnimate((prevState) => {
        return {
          ...prevState,
          hasSet: true,
        }
      })
    }
  }, [inView])

  return { ref, anim, inView }
}
