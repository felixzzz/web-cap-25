"use client"
import { useCallback, useEffect, useState } from "react"
import type { MutableRefObject } from "react"
import type { SwiperRef } from "swiper/react"

interface UseCustomNavSwiperResult {
  handlePrev: () => void
  handleNext: () => void
  index: number
  allowSlideNext: boolean
  allowSlidePrev: boolean
  isLooping: boolean
}

export const useCustomNavSwiper = (
  swiperRef: MutableRefObject<SwiperRef | null>
): UseCustomNavSwiperResult => {
  const [index, setIndex] = useState<number>(0)
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(true)
  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(true)
  const [isLooping, setIsLooping] = useState<boolean>(false)

  const handlePrev = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }, [swiperRef])

  const handleNext = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }, [swiperRef])

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper

      // Set initial values on mount
      setIndex(swiperInstance.realIndex)
      setIsLooping(swiperInstance.params.loop || false)

      // Update slide control permissions based on loop and edge conditions
      const updateSlideControl = () => {
        setIndex(swiperInstance.realIndex)

        if (swiperInstance.params.loop) {
          // If loop is enabled, always allow slide next/prev
          setAllowSlideNext(true)
          setAllowSlidePrev(true)
        } else {
          // If loop is disabled, update based on beginning and end status
          setAllowSlideNext(!swiperInstance.isEnd)
          setAllowSlidePrev(!swiperInstance.isBeginning)
        }
      }

      // Set initial control state
      updateSlideControl()

      // Listen for slide change events to update control state
      swiperInstance.on("slideChange", updateSlideControl)

      // Clean up event listener on unmount
      return () => {
        swiperInstance.off("slideChange", updateSlideControl)
      }
    }
  }, [swiperRef])

  return {
    handlePrev,
    handleNext,
    index,
    allowSlideNext,
    allowSlidePrev,
    isLooping,
  }
}
