import * as React from "react"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "cursor-pointer !rounded-[3px] !text-xs !font-bold text-[#D1D1D1] hover:!text-primary",
      buttonVariants({
        variant: isActive ? "pagination-active" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  isDisabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    aria-disabled={isDisabled}
    className={cn(
      "gap-1 px-2 py-0 hover:!bg-transparent",
      isDisabled && "!cursor-not-allowed hover:!text-[#D1D1D1]",
      className
    )}
    {...props}
  >
    <ArrowLeft
      className={cn(
        "size-5 text-primary hover:text-primary/60",
        isDisabled && "!text-[#d1d1d1] hover:!text-[#d1d1d1]"
      )}
    />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  isDisabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    aria-disabled={isDisabled}
    className={cn(
      "gap-1 px-2 py-0 hover:!bg-transparent",
      isDisabled && "!cursor-not-allowed text-[#D1D1D1] hover:!text-[#D1D1D1]",
      className
    )}
    {...props}
  >
    <ArrowRight
      className={cn(
        "size-5 text-primary hover:text-primary/60",
        isDisabled && "!text-[#d1d1d1] hover:!text-[#d1d1d1]"
      )}
    />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
