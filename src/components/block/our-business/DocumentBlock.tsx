import Anim from "@/components/global/Anim"
import DownloadItem, {
  DownloadAndViewItem,
} from "@/components/global/DownloadItem"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MetaDocument, MetaDocumentItem } from "@/lib/fragment"
import { getLocalizedContent, isContentActive } from "@/lib/utils"
import { Eye, PlusCircle } from "lucide-react"
import { useLocale } from "next-intl"

export function OurBusinessDocumentBlock({
  document_desc_en,
  document_desc_id,
  document_title_en,
  document_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
  document_file_id,
  document_file_en,
}: MetaDocument & {
  document_file_id?: {
    path: string
  }
  document_file_en?: {
    path: string
  }
}) {
  const locale = useLocale()

  if (!isContentActive(locale, status_en, status_id)) {
    return <></>
  }

  return (
    <>
      <div className="relative bg-slate-50 py-12 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center">
              <div className="max-w-lg">
                <Anim>
                  <h2 className="mb-6 text-pretty text-xl font-bold lg:mb-0 lg:text-2xl">
                    {getLocalizedContent(locale, title_en, title_id)}
                  </h2>
                </Anim>
              </div>
            </div>
            <div>
              <Anim>
                <Card className="max-w-[439px] p-6 lg:ml-auto">
                  <h3 className="mb-2 text-pretty text-base font-bold lg:text-lg">
                    {getLocalizedContent(
                      locale,
                      document_title_en,
                      document_title_id
                    )}
                  </h3>
                  <div
                    className="mb-6 text-neutral-500"
                    dangerouslySetInnerHTML={{
                      __html: getLocalizedContent(
                        locale,
                        document_desc_en,
                        document_desc_id
                      ),
                    }}
                  />

                  <div className="mr-auto flex w-fit items-center gap-4">
                    <DownloadAndViewItem
                      key={getLocalizedContent(
                        locale,
                        document_file_en?.path,
                        document_file_id?.path
                      )}
                      id={1}
                      isDownloadOnly
                      document_file_en={document_file_en?.path}
                      document_file_id={document_file_id?.path}
                    />
                  </div>
                </Card>
              </Anim>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
