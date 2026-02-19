import { useCustomNavSwiper } from "@/hooks/useCustomNavSwiper"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import ItemImageGallery from "./ItemImageGallery"

export default function ContentTabSwiper({
  hideOverflow,
  ...item
}: {
  index: number
  status: string
  title: string
  description?: string
  hideOverflow?: boolean
  list: {
    status: string
    image: string
    title?: string
    description: string
    supporting_images?: Array<{
      image: string
      alt: string
    }>
  }[]
}) {
  const swiperRef = useRef<SwiperRef>(null)
  const { handleNext, handlePrev, allowSlidePrev, allowSlideNext } =
    useCustomNavSwiper(swiperRef)

  return (
    <div
      key={item.index}
      className={cn({ "bg-[#F8FAFD]": item.index % 2 }, "py-20")}
    >
      <div className="container flex items-center justify-between">
        <div className="mb-10">
          <h5 className="text-3xl font-bold">{item.title}</h5>
          {item.description && (
            <div
              className="mt-4 prose prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>p]:mb-4 [&>p]:text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
        </div>

        {typeof item.list === "object" && item.list.length > 1 && (
          <div className="mr-16 hidden gap-x-4 max-md:mr-0 lg:flex">
            <button
              className={cn("h-10 w-10 rounded-full p-2", {
                "border border-blue-tint border-opacity-40": !allowSlidePrev,
                "bg-blue-tint": allowSlidePrev,
              })}
              onClick={handlePrev}
            >
              <ArrowLeft
                width={24}
                height={24}
                color={allowSlidePrev ? "#FFFFFF" : "#337ABC"}
                opacity={allowSlidePrev ? 1 : 0.4}
              />
            </button>
            <button
              className={cn("h-10 w-10 rounded-full p-2", {
                "bg-blue-tint": allowSlideNext,
                "border border-blue-tint border-opacity-40": !allowSlideNext,
              })}
              onClick={handleNext}
            >
              <ArrowRight
                width={24}
                height={24}
                color={allowSlideNext ? "#FFFFFF" : "#337ABC"}
                opacity={allowSlideNext ? 1 : 0.4}
              />
            </button>
          </div>
        )}
      </div>
      <Swiper
        className={cn(
          hideOverflow ? "overflow-hidden" : "!overflow-visible",
          "mb-6 lg:mb-0"
        )}
        slidesPerView={1}
        ref={swiperRef}
        autoHeight
      >
        {item.list.map((listItem, listImageIndex) => (
          <SwiperSlide key={listImageIndex}>
            <div className="container">
              <div className="flex flex-col items-center justify-center gap-y-6 lg:flex-row lg:gap-x-24 lg:gap-y-0">
                {/* Image Section (Nested Gallery) */}
                <div className="w-full max-w-[516px] xl:max-w-[516px]">
                  <ItemImageGallery
                    mainImage={listItem.image}
                    supportingImages={listItem.supporting_images}
                    title={listItem.title || item.title}
                  />
                </div>

                {/* Text Section (Static for the item) */}
                <div className="[&>h2]:mb-4 [&>h2]:text-xl [&>p]:mb-4 [&>ul]:grid [&>ul]:grid-cols-1 [&>ul]:gap-y-6 [&>ul]:list-disc [&>ul]:ml-4 [&>ul>li::marker]:text-[#53C3D9] flex-1">
                  {listItem.title && (
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">
                      {listItem.title}
                    </h2>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: listItem.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mr-16 flex gap-x-4 max-md:mr-0 lg:hidden container justify-end">
        <button
          className={cn("h-10 w-10 rounded-full p-2", {
            "border border-blue-tint border-opacity-40": !allowSlidePrev,
            "bg-blue-tint": allowSlidePrev,
          })}
          onClick={handlePrev}
        >
          <ArrowLeft
            width={24}
            height={24}
            color={allowSlidePrev ? "#FFFFFF" : "#337ABC"}
            opacity={allowSlidePrev ? 1 : 0.4}
          />
        </button>
        <button
          className={cn("h-10 w-10 rounded-full p-2", {
            "bg-blue-tint": allowSlideNext,
            "border border-blue-tint border-opacity-40": !allowSlideNext,
          })}
          onClick={handleNext}
        >
          <ArrowRight
            width={24}
            height={24}
            color={allowSlideNext ? "#FFFFFF" : "#337ABC"}
            opacity={allowSlideNext ? 1 : 0.4}
          />
        </button>
      </div>
    </div>
  )
}
