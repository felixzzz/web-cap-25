import { MetaDocumentItem } from "@/lib/fragment"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type GeneralStore = {
  isPopupDownloadOpen: boolean
  setIsPopupDownload: (isPopupDownloadOpen: boolean) => void

  storageDownload: MetaDocumentItem[]
  setStorageDownload: (storageDownload: MetaDocumentItem[]) => void
  deleteStorageDownload: (id: number | null, itemLanguage: string) => void
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      isPopupDownloadOpen: false,
      setIsPopupDownload: (isPopupDownloadOpen: boolean) =>
        set({ isPopupDownloadOpen }),

      storageDownload: [],
      setStorageDownload: (storageDownload: MetaDocumentItem[]) =>
        set({ storageDownload }),
      deleteStorageDownload: (id: number | null, itemLanguage: string) =>
        set((state) => {
          const itemLanguageIndex = state.storageDownload.findIndex((item) => item.id === id && itemLanguage === item.itemLanguage)

          if (itemLanguageIndex !== -1) {
            const updatedItemLanguage = [...state.storageDownload]
            updatedItemLanguage.splice(itemLanguageIndex, 1)
            return { storageDownload: updatedItemLanguage }
          }

          return state
        }),
    }),
    {
      name: "download-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
