"use client"

import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import DownloadItem, {
  DownloadItemSkeleton,
} from "@/components/global/DownloadItem"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { iconEye, iconPdf, iconPlus } from "@/data/images"
import { MetaDocumentItem, MetaFinancialCalendar } from "@/lib/fragment"
import { useQueryFinancialCalendar } from "@/lib/hooks"
import { PaginationHandlerResponse } from "@/lib/types"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import clsx from "clsx"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

const listTabCalendar = [
  "all",
  "jan",
  "feb",
  "mar",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

type MonthAbbreviation =
  | "all"
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "mei"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec"

type ListTabCalendarValue = {
  [key: string]: number | null // Allows any string as a key, returns undefined if the key doesn't exist
  all: null
  jan: number
  feb: number
  mar: number
  apr: number
  mei: number
  jun: number
  jul: number
  aug: number
  sep: number
  oct: number
  nov: number
  dec: number
}

const listTabCalendarValue: ListTabCalendarValue = {
  all: null,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  mei: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
}

export default function InvestorFinancialCalendar({
  status_en,
  status_id,
  title_en,
  title_id,
  data,
  dataYears,
}: MetaFinancialCalendar & {
  data: PaginationHandlerResponse<MetaDocumentItem[]>
  dataYears: { years: number[] }
}) {
  const t = useTranslations("global")
  const locale = useLocale()
  const [tabCalendar, setTabCalendar] = useState("all")
  const [year, setYear] = useState<number | string>(
    Math.max(...dataYears?.years)
  )

  const {
    data: dataDocuments,
    isLoading,
    isFetching,
  } = useQueryFinancialCalendar({
    options: {
      initialData: data,
    },
    month: listTabCalendarValue[tabCalendar],
    year: year,
  })

  const handleOnValueChange = (value: string | number) => {
    setYear(value)
  }

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <>
      <section className="bg-surface py-8 lg:pb-[80px] lg:pt-[64px]">
        <div className="container">
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="text-xl font-bold lg:text-4xl">
              {getLocalizedContent(locale, title_en, title_id)}
            </div>
            <div className="my-auto ml-auto">
              <Select onValueChange={handleOnValueChange}>
                <SelectTrigger className="w-[158px]">
                  <SelectValue placeholder={year}>{year}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">{t("select_year")}</SelectItem>
                    {dataYears &&
                      dataYears?.years?.map((item, i) => (
                        <SelectItem
                          defaultChecked={item === year}
                          value={`${item}`}
                          key={i}
                        >
                          {item}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative">
            <div className="mt-8 flex w-full flex-row overflow-scroll">
              {listTabCalendar.map((tab) => (
                <div
                  key={tab}
                  className={clsx(
                    "flex flex-shrink-0 flex-grow cursor-pointer justify-center border border-input bg-white px-3 py-[10px] text-center text-xs font-bold uppercase",
                    tabCalendar === tab && "!bg-blue-tint text-white"
                  )}
                  onClick={() => setTabCalendar(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="mt-4">
              {(isLoading || isFetching) && (
                <>
                  <DownloadItemSkeleton />
                </>
              )}
              {!isLoading &&
              !isFetching &&
              dataDocuments?.data?.length === 0 ? (
                <BlankSpaceContent />
              ) : (
                !isLoading &&
                !isFetching &&
                dataDocuments?.data?.map((item) => (
                  <DownloadItem
                    customTitleType="REPORT"
                    key={item.id}
                    {...item}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
