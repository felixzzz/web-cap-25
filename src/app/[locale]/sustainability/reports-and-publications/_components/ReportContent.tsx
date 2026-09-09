"use client"
import { getYear, parseISO } from "date-fns"
import { Card, CardContent, CardImage } from "@/components/global/card/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { iconPdf, imgDefaultNews } from "@/data/images"
import { Search, X } from "lucide-react"
import Image from "next/image"
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MetaDocumentItem } from "@/lib/fragment"
import { assetUrl, cn, getLocalizedContent } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import useDebounce from "@/hooks/useDebounce"
import { DownloadAndViewItem } from "@/components/global/DownloadItem"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"
import { BlankSpaceContent } from "@/components/global/BlankSpaceContent"
import { DocumentsCategories } from "@/lib/types"
import Anim from "@/components/global/Anim"

type Prop = {
  documents: MetaDocumentItem[]
  categories: DocumentsCategories[]
}

export default function ReportContent({ documents, categories }: Prop) {
  const locale = useLocale()
  const t = useTranslations("global")

  const [search, setSearch] = useState<string>("")
  const [year, setYear] = useState<string>("all")
  const [category, setCategory] = useState<number | undefined>(
    categories?.[0]?.id
  )
  const [selectedPublication, setSelectedPublication] =
    useState<MetaDocumentItem | null>(null)
  const debounceSearch = useDebounce(search, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleOnValueChange = (value: string) => {
    setYear(value)
  }

  const getAvailableYear = useMemo(() => {
    const years = documents?.map((item) =>
      getYear(parseISO(item?.published_at!))
    )
    return Array.from(new Set(years))?.sort((a, b) => Number(b) - Number(a))
  }, [documents])

  const filteredDocuments = useMemo(() => {
    return documents?.filter((item) => {
      if (year === "all" && debounceSearch === "" && !category) {
        return item
      }

      if (debounceSearch !== "") {
        const matchesSearch =
          debounceSearch === "" ||
          getLocalizedContent(
            locale,
            item.document_name_en,
            item.document_name_id
          )
            ?.toLowerCase()
            ?.includes(debounceSearch.toLowerCase())

        return matchesSearch
      }

      const matchesYear =
        year === "all" ||
        getYear(parseISO(item.published_at!)) === parseInt(year)
      const matchesCategory =
        !category || item.category_id === category.toString()

      return matchesYear && matchesCategory
    })
  }, [year, debounceSearch, category, documents, locale])

  const findDocFromHash = useCallback(
    (hash: string) => {
      if (!hash || !documents || documents.length === 0) return null
      const raw = hash.replace(/^#/, "").trim()
      if (!raw) return null

      // Exact match (e.g., #123)
      const exactMatch = documents.find((doc) => doc.id?.toString() === raw)
      if (exactMatch) return exactMatch

      // Prefix match (e.g., #publication-123, #publication123, #publication_123)
      const match = raw.match(/^(?:publication[-_]?)?(\d+)$/i)
      if (match) {
        const id = match[1]
        return documents.find((doc) => doc.id?.toString() === id) || null
      }

      return null
    },
    [documents]
  )

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (!hash) {
        setSelectedPublication(null)
        return
      }

      const found = findDocFromHash(hash)
      if (found) {
        setSelectedPublication(found)
        if (found.category_id) {
          const catId = Number(found.category_id)
          if (!isNaN(catId)) {
            setCategory(catId)
          }
        }
      } else {
        setSelectedPublication(null)
      }
    }

    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("popstate", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("popstate", handleHashChange)
    }
  }, [findDocFromHash])

  const handleOpenPublication = (item: MetaDocumentItem) => {
    setSelectedPublication(item)
    window.history.pushState(null, "", `#${item.id}`)
  }

  const handleClosePublication = () => {
    setSelectedPublication(null)
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      )
    }
  }

  return (
    <section className="relative py-10 lg:py-12">
      <div className="container">
        <div className="mb-4 flex flex-wrap items-center lg:mb-0 lg:justify-between">
          <div className="relative mb-4 w-full lg:mb-6 lg:w-[300px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search color="#337ABC" size={20} />
            </div>
            <Input
              placeholder="Search"
              className="pl-10"
              onChange={handleChange}
            />
          </div>
          <div>
            <Select
              onValueChange={handleOnValueChange}
              value={debounceSearch ? "all" : year}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Year</SelectItem>
                  {getAvailableYear?.map((item, i) => (
                    <SelectItem value={`${item}`} key={i}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4">
          {categories?.length > 0 &&
            categories?.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setCategory(item.id)
                }}
              >
                <Button
                  variant={`outline-blue`}
                  className={cn(
                    ``,
                    !debounceSearch &&
                      category == item.id &&
                      `bg-light-blue text-white`
                  )}
                >
                  {getLocalizedContent(locale, item.name_en, item.name_id)}
                </Button>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filteredDocuments?.length === 0 && (
            <div className="col-span-3">
              <BlankSpaceContent className="text-center" />
            </div>
          )}

          {filteredDocuments?.map((item, i) => (
            <div className="w-full" key={i}>
              <ReportAndPublicationItem
                item={item}
                onOpenPublication={handleOpenPublication}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedPublication}
        onOpenChange={(open) => {
          if (!open) {
            handleClosePublication()
          }
        }}
      >
        <DialogContent className="py-10 sm:max-w-7xl">
          <div className="mb-8 flex items-end justify-end">
            <X
              className="cursor-pointer"
              onClick={handleClosePublication}
              color="#347ABC"
              size={32}
            />
          </div>
          {selectedPublication && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="col-span-12 lg:col-span-4">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={
                      selectedPublication.image
                        ? `${assetUrl(selectedPublication.image)}`
                        : imgDefaultNews
                    }
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <h3 className="mb-4 text-2xl font-bold">
                  {getLocalizedContent(
                    locale,
                    selectedPublication.document_name_en,
                    selectedPublication.document_name_id
                  )}
                </h3>
                <p className="mb-10">
                  {getLocalizedContent(
                    locale,
                    selectedPublication.description_en,
                    selectedPublication.description_id
                  )}
                </p>

                <div className="space-y-2">
                  {selectedPublication.language && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Language</div>
                      <div>{selectedPublication.language}</div>
                    </div>
                  )}

                  {selectedPublication.author && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Author</div>
                      <div>{selectedPublication.author}</div>
                    </div>
                  )}

                  {selectedPublication.publisher && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Publisher</div>
                      <div>{selectedPublication.publisher}</div>
                    </div>
                  )}

                  {selectedPublication.release_year && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Release Year</div>
                      <div>{selectedPublication.release_year}</div>
                    </div>
                  )}

                  {selectedPublication.pages && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Pages</div>
                      <div>{selectedPublication.pages}</div>
                    </div>
                  )}

                  {selectedPublication.format && (
                    <div className="flex items-center gap-4">
                      <div className="w-[125px]">Format</div>
                      <div>{selectedPublication.format}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-12 flex items-end justify-end">
                <Button
                  variant={"default"}
                  className="w-full min-w-0 cursor-pointer text-sm font-bold group-hover:underline lg:w-auto"
                  asChild
                >
                  <Link
                    href={`${assetUrl(
                      getLocalizedContent(
                        locale,
                        selectedPublication?.document_file_en,
                        selectedPublication?.document_file_id
                      )
                    )}`}
                    target="_blank"
                  >
                    <span>{t("view_detail")}</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

type ReportAndPublicationItemProp = {
  item: MetaDocumentItem
  onOpenPublication: (item: MetaDocumentItem) => void
}

function ReportAndPublicationItem({
  item,
  onOpenPublication,
}: ReportAndPublicationItemProp) {
  const locale = useLocale()
  const isPublication = getLocalizedContent(
    locale,
    item.category?.name_en,
    item.category?.name_id
  )
    ?.toLowerCase()
    ?.includes("publi")

  const handleClickView = () => {
    if (isPublication) {
      onOpenPublication(item)
      return
    }
  }

  return (
    <Anim>
      <Card>
        <CardImage
          className="aspect-square rounded-2xl"
          img={item?.image ? assetUrl(item?.image)! : imgDefaultNews}
        />
        <CardContent
          title={getLocalizedContent(
            locale,
            item?.document_name_en,
            item?.document_name_id
          )}
        >
          <div
            className="prose mt-1 line-clamp-2 text-gray"
            dangerouslySetInnerHTML={{
              __html: getLocalizedContent(
                locale,
                item?.description_en,
                item?.description_id
              ),
            }}
          />
          <div className="flex items-center justify-between pt-5">
            <div>
              <Image src={iconPdf} alt="" width={30} height={30} />
            </div>
            <div>
              <div className="ml-auto flex w-fit items-center gap-4">
                <DownloadAndViewItem
                  key={getLocalizedContent(
                    locale,
                    item?.document_name_en,
                    item?.document_name_id
                  )}
                  size={"sm"}
                  onClickView={handleClickView}
                  isDialog={isPublication}
                  {...item}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Anim>
  )
}

