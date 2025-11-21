"use client"

import { iconChecklist, iconEye, iconPdf, iconPlus } from "@/data/images"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { MetaDocumentItem } from "@/lib/fragment"
import { assetUrl, cn, dateFormater, getLocalizedContent } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useGeneralStore } from "@/store/general"
import { ArrowRight, Check, Eye, PlusCircle } from "lucide-react"
import clsx from "clsx"
import { Skeleton } from "../ui/skeleton"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"

export default function ShePdfCard({
  category,
  created_at,
  deleted_at,
  document_file_en,
  document_file_id,
  document_name_en,
  document_name_id,
  document_type,
  id,
  page,
  published_at,
  section,
  updated_at,
  author,
  description_en,
  description_id,
  format,
  image,
  pages,
  publisher,
  release_year,
  className,
  classNameTitle,
  category_id,
  language,
  isCard = false,
  onlyTitle = false,
  isHaveCheckbox = false,
  customTitleType,
  isHaveDescription = false,
}: MetaDocumentItem & {
  className?: string
  isCard?: boolean
  onlyTitle?: boolean
  classNameTitle?: string
  isHaveCheckbox?: boolean
  customTitleType?: string
  isHaveDescription?: boolean
}) {
  const locale = useLocale()
  const { storageDownload, setStorageDownload } = useGeneralStore()
  const [itemLanguage, setItemLanguage] = useState<string[]>([])

  const isFileAlreadyAdded = () => {
    return storageDownload.some((item) => item.id === id)
  }

  const handleAddFile = () => {
    if (isFileAlreadyAdded()) {
      setStorageDownload(storageDownload?.filter((item) => item.id !== id))
    } else {
      setStorageDownload([
        ...storageDownload,
        {
          category,
          created_at,
          deleted_at,
          document_file_en,
          document_file_id,
          document_name_en,
          document_name_id,
          document_type,
          id,
          page,
          published_at,
          section,
          updated_at,
          image,
          author,
          description_en,
          description_id,
          format,
          pages,
          publisher,
          release_year,
          category_id,
          language,
          itemLanguage:
            itemLanguage.length === 0
              ? locale
              : itemLanguage.length > 1
                ? "all"
                : itemLanguage[0],
        },
      ])
    }
  }

  const handleCheckboxChange = (language: string, isChecked: boolean) => {
    setItemLanguage((prev) =>
      isChecked ? [...prev, language] : prev.filter((lang) => lang !== language)
    )
  }

  return (
    <div
      className={clsx(
        "flex flex-col justify-between",
        isCard
          ? "h-full rounded-xl border bg-white p-6"
          : "border-b py-4 lg:flex-row lg:py-6",
        className
      )}
    >
      <div
        className={cn("my-auto text-sm font-bold lg:text-md", classNameTitle)}
      >
        {customTitleType && (
          <div className="text-sm font-semibold uppercase tracking-[1.4px] text-gray">
            {customTitleType}
          </div>
        )}
        {isHaveCheckbox && published_at && (
          <div className="text-sm font-semibold uppercase tracking-[1.4px] text-gray">
            {dateFormater(published_at, "dd-MM-yyyy")}
          </div>
        )}
        <div className="mt-1 w-full max-w-[660px]">
          {getLocalizedContent(locale, document_name_en, document_name_id)}
        </div>
        {isHaveDescription &&
          getLocalizedContent(locale, description_en, description_id) && (
            <div className="my-auto text-sm font-normal text-gray lg:text-md">
              {getLocalizedContent(locale, description_en, description_id)}
            </div>
          )}
      </div>
      {!onlyTitle &&
        isCard &&
        getLocalizedContent(locale, description_en, description_id) && (
          <div className="my-auto mb-10 text-sm text-gray lg:text-md">
            {getLocalizedContent(locale, description_en, description_id)}
          </div>
        )}
      <div className="mt-2 flex flex-row gap-x-10 lg:mt-0">
        {isHaveCheckbox && (
          <div className="my-auto mr-auto flex flex-row gap-x-3 lg:ml-auto">
            <div className="flex items-center gap-x-2 rounded-full border px-2 py-1 lg:h-[35px]">
              <Checkbox
                id={`english-${id}`}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange("en", checked)
                }
              />
              <label
                htmlFor={`english-${id}`}
                className="lg:text-bold cursor-pointer text-xs font-bold leading-none text-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-sm"
              >
                English
              </label>
            </div>
            <div className="flex items-center gap-x-2 rounded-full border px-2 py-1 lg:h-[35px]">
              <Checkbox
                id={`indonesia-${id}`}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange("id", checked)
                }
              />
              <label
                htmlFor={`indonesia-${id}`}
                className="lg:text-bold cursor-pointer text-xs font-bold leading-none text-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-sm"
              >
                Indonesia
              </label>
            </div>
          </div>
        )}
        <div
          className={cn(
            "my-auto mr-auto flex flex-row lg:ml-auto lg:mr-0 lg:mt-3",
            !isCard && "lg:my-auto"
          )}
        >
          {!isCard && !isHaveCheckbox && (
            <Image
              className="my-auto mr-10 hidden lg:block"
              src={iconPdf}
              alt=""
            />
          )}
          <Link
            href={
              assetUrl(
                getLocalizedContent(locale, document_file_en, document_file_id)
              ) || ""
            }
            className="block text-sm font-bold text-primary lg:hidden"
          >
            View
          </Link>
          <div className="hidden gap-x-3 lg:flex">
            <Button
              className="group cursor-pointer px-3"
              variant="outline-primary"
              asChild
            >
              <Link
                className="flex gap-x-2"
                href={
                  assetUrl(
                    getLocalizedContent(
                      locale,
                      document_file_en,
                      document_file_id
                    )
                  ) || ""
                }
                target="_blank"
              >
                <Image
                  className="my-auto group-hover:brightness-0 group-hover:invert"
                  src={iconEye}
                  alt=""
                />
                View
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DownloadAndViewItem = ({
  category,
  created_at,
  deleted_at,
  document_file_en,
  document_file_id,
  document_name_en,
  document_name_id,
  document_type,
  id,
  page,
  published_at,
  section,
  updated_at,
  size = "default",
  onClickView,
  image,
  author,
  description_en,
  description_id,
  format,
  pages,
  publisher,
  release_year,
  category_id,
  language,
  isDialog = false,
  isDownloadOnly = false,
}: MetaDocumentItem & {
  size?: "default" | "sm" | "lg" | "wide" | "icon" | null | undefined
  onClickView?: () => void
  isDialog?: boolean
  isDownloadOnly?: boolean
}) => {
  const locale = useLocale()
  const { storageDownload, setStorageDownload } = useGeneralStore()

  const isFileAlreadyAdded = () => {
    return storageDownload.some((item) => item.id === id)
  }

  const handleAddFile = () => {
    if (isFileAlreadyAdded()) {
      setStorageDownload(storageDownload?.filter((item) => item.id !== id))
    } else {
      setStorageDownload([
        ...storageDownload,
        {
          category,
          created_at,
          deleted_at,
          document_file_en,
          document_file_id,
          document_name_en,
          document_name_id,
          document_type,
          id,
          page,
          published_at,
          section,
          updated_at,
          image,
          author,
          description_en,
          description_id,
          format,
          pages,
          publisher,
          release_year,
          category_id,
          language,
        },
      ])
    }
  }

  return (
    <>
      {isDialog && (
        <Button
          variant={"outline-primary"}
          className="min-w-0 rounded-full"
          size={size}
          onClick={onClickView}
        >
          <Eye strokeWidth={2} className="mr-2" />
          View
        </Button>
      )}

      {!isDialog && !isDownloadOnly && (
        <Link
          href={`${assetUrl(
            getLocalizedContent(locale, document_file_en, document_file_id)
          )}`}
          target="_blank"
        >
          <Button
            variant={"outline-primary"}
            className="min-w-0 rounded-full"
            size={size}
          >
            <Eye strokeWidth={2} className="mr-2" />
            View
          </Button>
        </Link>
      )}
      {!isDownloadOnly && (
        <Button
          variant={isFileAlreadyAdded() ? "primary" : "outline-primary"}
          className="min-w-0 rounded-full"
          onClick={handleAddFile}
          size={size}
        >
          {isFileAlreadyAdded() ? (
            <>
              <Check strokeWidth={2} className="mr-2" />
            </>
          ) : (
            <>
              <PlusCircle strokeWidth={2} className="mr-2" />
            </>
          )}
          Download
        </Button>
      )}
      {isDownloadOnly && (
        <Link
          href={`${assetUrl(
            getLocalizedContent(locale, document_file_en, document_file_id)
          )}`}
          target="_blank"
        >
          <Button variant={"link"} className="min-w-0 px-0">
            Download PDF
            <ArrowRight size={22} strokeWidth={2} className="ml-1" />
          </Button>
        </Link>
      )}
    </>
  )
}

export const DownloadItemSkeleton = () => {
  return (
    <div className="flex flex-col justify-between border-b py-4 lg:flex-row lg:py-6">
      <div className="space-y-2">
        <Skeleton className="h-[23px] w-[400px] bg-gray/30" />
      </div>
      <div className="ml-auto flex flex-row gap-3">
        <Skeleton className="my-auto mr-[28px] size-[32px] bg-gray/30" />
        <Skeleton className="h-[40px] w-[91px] bg-gray/30" />
        <Skeleton className="h-[40px] w-[127px] bg-gray/30" />
      </div>
    </div>
  )
}
