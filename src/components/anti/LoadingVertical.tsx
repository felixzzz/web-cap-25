import { cn } from "@/lib/utils"
import { HTMLProps } from "react"

type LoadingVerticalProp = {
  loadingLineClassName?: HTMLProps<HTMLElement>["className"]
  firstInnerClassName?: HTMLProps<HTMLElement>["className"]
  secondInnerClassName?: HTMLProps<HTMLElement>["className"]
  labelClassName?: HTMLProps<HTMLElement>["className"]
  showShadow?: boolean
  loadingWrapperClassName?: HTMLProps<HTMLElement>["className"]
  containerClass?: HTMLProps<HTMLElement>["className"]
}

const LoadingVertical = ({
  firstInnerClassName,
  secondInnerClassName,
  loadingLineClassName,
  labelClassName,
  showShadow,
  loadingWrapperClassName,
  containerClass
}: LoadingVerticalProp) => {
  return (
    <div className={`absolute bottom-0 right-20 z-10 ${cn(containerClass)}`}>
      <div className={cn("absolute bottom-0 cursor-pointer flex items-center flex-col w-fit gap-y-2", loadingWrapperClassName)}>
        <div className="relative">
          {showShadow && <div className="absolute w-[137px] h-[311px] top-[-200px] right-0 left-0 -translate-x-1/2 scale-[1.25] rounded-[900px] opacity-90 blur-[90px] bg-dark-blue" />}
          <div className={cn("w-[1px] whitespace-nowrap flex -rotate-90 items-center text-xs font-medium uppercase tracking-widest", labelClassName)}>
            Explore More
          </div>
        </div>
        <div className="w-[1px] h-20">
          <div className={cn("h-full relative", loadingLineClassName)}>
            <div className="h-full animate-kf_loading_line origin-0-100">
              <div className={cn("absolute w-full h-full origin-0-0 lopacity-0 animate-kf_loading_line_inner--1", firstInnerClassName)} />
              <div className={cn("absolute w-full h-full origin-0-0 opacity-100 animate-kf_loading_line_inner--2", secondInnerClassName)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingVertical
