import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import clsx from "clsx"

import React from "react"

export function CustomBreadcrumb({
  data,
  className,
}: {
  data: { url?: string; label: string; isPrimary?: boolean }[]
  className?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.url && (
                  <BreadcrumbLink
                    className={clsx(
                      item.isPrimary && "text-sm font-normal text-primary"
                    )}
                    href={item.url}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
                {!item.url && (
                  <BreadcrumbPage
                    className={clsx(item.isPrimary ? "text-sm" : "text-xs")}
                  >
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < data.length - 1 && (
                <BreadcrumbSeparator isPrimary={item.isPrimary} />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
