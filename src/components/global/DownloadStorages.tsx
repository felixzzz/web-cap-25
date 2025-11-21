"use client"

import { ChevronUp, DownloadIcon, Loader2, X } from "lucide-react"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import clsx from "clsx"
import { useGeneralStore } from "@/store/general"
import { getLocalizedContent } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { useBulkDownload, usePostDownloadSession } from "@/lib/hooks"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"

export default function DownloadStorages() {
  const locale = useLocale()
  const [isLoadingBulk, setIsLoadingBulk] = useState(false)
  const t = useTranslations("global")
  const {
    setIsPopupDownload,
    isPopupDownloadOpen,
    storageDownload,
    setStorageDownload,
  } = useGeneralStore()

  const {
    mutate: mutatePostDownloadSession,
    isSuccess,
    error: errorPostSession,
    isPending: isPendingSession,
  } = usePostDownloadSession()

  const {
    mutate: mutateBulkDownload,
    error: errorBulkDownload,
    isError,
    isPending: isPendingBulkDownload,
    isSuccess: isSuccessBulkDownload,
    data: dataBulkDownload,
  } = useBulkDownload()

  const handleBulkDownload = async () => {
    const dataBulk: any = {
      session_id: `session-${Math.random().toString(36).slice(2, 14)}`,
      documents: storageDownload.map((item) => {
        return {
          document_id: item.id,
          lang: item.itemLanguage ? item.itemLanguage : locale,
        }
      }),
    }

    mutatePostDownloadSession(dataBulk)
    setIsLoadingBulk(true)
    setTimeout(() => {
      mutateBulkDownload({
        session_id: dataBulk.session_id,
      })
    }, 2000)
  }

  useEffect(() => {
    if (isError) {
      setIsLoadingBulk(false)
      toast({
        title: "Download Error",
        duration: 2000,
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccessBulkDownload) {
      setIsLoadingBulk(false)
      toast({
        title: t("success_download"),
        duration: 2000,
      })
      window.open(dataBulkDownload?.data?.data, "_blank")
      setStorageDownload([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBulkDownload?.data, isSuccessBulkDownload])

  const handleRemoveFile = (id: number | null) => {
    setStorageDownload(storageDownload?.filter((item) => item.id !== id))
  }

  if (storageDownload.length === 0) return <></>

  return (
    <>
      <Collapsible open={isPopupDownloadOpen} onOpenChange={setIsPopupDownload}>
        <div className="box-shadow-card fixed bottom-0 right-4 z-[1002] lg:right-[80px] lg:w-[320px]">
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer rounded-t-2xl bg-dark-cornflower-blue p-5 text-md font-bold text-white">
              <div className="my-auto">
                {t("my_downloads")} ({storageDownload.length})
              </div>
              <ChevronUp
                className={clsx(
                  "my-auto ml-auto transition-all",
                  !isPopupDownloadOpen && "rotate-180",
                  isPopupDownloadOpen && "rotate-0"
                )}
                size={24}
                color="white"
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent">
            {storageDownload.length > 0 &&
              storageDownload.map((document) => (
                <div
                  key={`${document.id}-${document.itemLanguage}-${getLocalizedContent(
                    locale,
                    document.document_file_en,
                    document.document_file_id
                  )}`}
                  className="flex flex-row border-b bg-white px-5 py-4"
                >
                  <div className="my-auto line-clamp-1 max-w-[244px] text-sm">
                    {getLocalizedContent(
                      locale,
                      document.document_name_en,
                      document.document_name_id
                    )}
                  </div>
                  <X
                    className="my-auto ml-auto cursor-pointer"
                    size={16}
                    color="#337ABC"
                    onClick={() => handleRemoveFile(document.id)}
                  />
                </div>
              ))}
            <div className="flex flex-row border-b bg-blue-tint-10 px-5 py-4">
              <div
                className="my-auto line-clamp-1 max-w-[244px] cursor-pointer text-sm font-bold text-blue-tint"
                onClick={() => setStorageDownload([])}
              >
                {t("clear")}
              </div>
              <Button
                variant="primary"
                disabled={
                  isPendingSession || isPendingBulkDownload || isLoadingBulk
                }
                className="ml-auto h-9 cursor-pointer"
                onClick={handleBulkDownload}
              >
                <div className="flex flex-row gap-[10px]">
                  {(isPendingSession ||
                    isPendingBulkDownload ||
                    isLoadingBulk) && (
                    <Loader2
                      size={20}
                      className="my-auto animate-spin"
                      color="white"
                    />
                  )}
                  <div className="text-sm font-semibold text-white">
                    {isPendingSession || isPendingBulkDownload || isLoadingBulk
                      ? "Loading..."
                      : t("download_all")}
                  </div>
                  <DownloadIcon size={20} className="my-auto" color="white" />
                </div>
              </Button>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </>
  )
}
