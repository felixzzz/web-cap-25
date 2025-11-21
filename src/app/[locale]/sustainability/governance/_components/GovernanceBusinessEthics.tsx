import { ImageContentBlock } from "@/components/block/ContentLeftRightBlock"
import { mockDescription } from "@/components/block/mock"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { iconPdf, imgTempCardItem } from "@/data/images"
import { FragmentDocument, MetaIntro } from "@/lib/fragment"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { Eye } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function GovernanceBusinessEthics({
  description_en,
  description_id,
  image_en,
  image_id,
  status_en,
  status_id,
  title_en,
  title_id,
  document_en,
  document_id,
  document_type_en,
  document_type_id,
}: MetaIntro & FragmentDocument) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <section className="relative py-10 lg:py-20">
      <ImageContentBlock
        img={assetUrl(image_id)}
        title={getLocalizedContent(locale, title_en, title_id)}
        reverse
        text={getLocalizedContent(locale, description_en, description_id)}
      >
        <Card className="flex items-center justify-between p-6">
          <h3 className="font-bold">Our Code of Conduct</h3>

          <div className="flex items-start gap-5">
            <Image src={iconPdf} alt="" className="cursor-pointer" />
            {getLocalizedContent(
              locale,
              document_en.path,
              document_id.path
            ) && (
              <Link
                target="_blank"
                href={`${assetUrl(getLocalizedContent(locale, document_en.path, document_id.path))}`}
              >
                <Button variant={"outline-primary"} className="min-w-0">
                  <Eye strokeWidth={2} className="mr-2" />
                  View
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </ImageContentBlock>
    </section>
  )
}
