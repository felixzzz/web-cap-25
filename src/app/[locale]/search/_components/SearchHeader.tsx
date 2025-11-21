"use client"

import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { iconSearch } from "@/data/images"
import Image from "next/image"
import { ChangeEvent } from "react"

export default function SearchHeader({
  search,
  handleChange,
  handleSearch,
  totalResult,
}: {
  search: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSearch: any
  totalResult: number
}) {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && search.length > 0) {
      handleSearch()
    }
  }

  return (
    <section className="bg-surface">
      <div className="container pb-6 pt-[88px]">
        <CustomBreadcrumb
          data={[
            {
              url: "/news",
              label: "NEWS",
            },
            {
              url: "/search",
              label: "SEARCH RESULT",
            },
          ]}
          className="mb-[22px]"
        />
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-3/12">
            <div className="text-xl font-bold lg:text-4xl">Search</div>
          </div>
          <div className="w-full lg:w-9/12">
            <div className="mb-5 flex flex-row">
              <div className="relative w-full">
                <Image
                  src={iconSearch}
                  className="absolute left-3 top-[50%] translate-y-[-50%]"
                  width={16}
                  height={16}
                  alt=""
                />
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={search}
                  className="rounded-r-none pl-10"
                  required
                />
              </div>
              <Button
                className="rounded-l-none rounded-r-lg"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            <div className="text-sm text-gray">{totalResult} result found</div>
          </div>
        </div>
      </div>
    </section>
  )
}
