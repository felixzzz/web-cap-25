import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CategoryBusinessLine } from "@/lib/fragment"
import { assetUrl, cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

type CardBusinessProp = {} & React.HTMLAttributes<HTMLDivElement>

export function CardBusiness({
  children,
  className,
  ...props
}: CardBusinessProp) {
  return (
    <>
      <div className={cn(`relative`, className)} {...props}>
        <div className="border-gray-200 overflow-hidden rounded-2xl border">
          {children}
        </div>
      </div>
    </>
  )
}

type CardBusinessHeaderProp = {
  img?: StaticImageData | string
  background?: StaticImageData | string
  href: string
  label: string
  callbackInView?: (id?: string) => void
} & React.HTMLAttributes<HTMLDivElement>

export function CardBusinessHeader({
  children,
  className,
  img,
  background,
  href,
  label,
  callbackInView,
  ...props
}: CardBusinessHeaderProp) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  })

  useEffect(() => {
    if (inView && callbackInView) {
      callbackInView(props.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div
      ref={ref}
      className={cn(
        `relative flex flex-col items-center justify-between gap-5 p-5 lg:flex-row`,
        className
      )}
      {...props}
    >
      {background && (
        <Image
          src={background}
          alt="img-chemicals"
          className="-z-10 object-cover"
          fill
        />
      )}

      <div className="flex gap-4">
        <div className="relative aspect-[23/8] w-[150px]">
          <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full rounded-full bg-green-900 opacity-80 blur" />
          {img && (
            <Image
              src={img}
              alt="img-card-business"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div>
        {label && href && (
          <Link href={`${href}`}>
            <Button variant="white" size="wide">
              {label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

type CardBusinessContentProp = {} & React.HTMLAttributes<HTMLDivElement>

export function CardBusinessContent({
  children,
  className,
  ...props
}: CardBusinessContentProp) {
  return (
    <div className={cn(`p-6`, className)} {...props}>
      {children}
    </div>
  )
}

type CardBusinessFooterProp = {
  categories: CategoryBusinessLine[]
  small_title?: string
} & React.HTMLAttributes<HTMLDivElement>

export function CardBusinessFooter({
  children,
  className,
  categories,
  title,
  small_title,
  ...props
}: CardBusinessFooterProp) {
  return (
    <>
      <div className={cn("", className)} {...props}>
        <div className="mb-5 px-6 font-bold text-neutral-500">
          {small_title}
        </div>

        {categories?.map((item, i) => (
          <div className="border-t border-zinc-300" key={i}>
            <div className="grid h-full grid-cols-1 lg:grid-cols-12">
              <div className="col-span-3 flex items-center justify-center bg-[#151f40] p-5 text-center text-lg font-bold text-white lg:border-r lg:border-r-zinc-300 lg:p-0">
                <div className="relative">{item.title}</div>
              </div>
              <div className="col-span-9 flex flex-col justify-center space-y-4 bg-slate-50 px-5 py-4">
                <h4 className="text-xs font-bold text-neutral-500">
                  {item.small_title_subsidiary}
                </h4>

                <div className="flex items-center">
                  {item.subsidiary_list.map((subsidiary, i) => (
                    <div key={i} className="flex items-center">
                      <div className="font-bold italic">{subsidiary.title}</div>
                      {item.subsidiary_list.length - 1 != i && (
                        <Separator
                          orientation="vertical"
                          className="mx-5 h-[40px]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
