"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"

const queryClient = new QueryClient()

type PageContextType = {
  pageId: string | null
  setPageId: (id: string | null) => void
}

const PageIdContext = createContext<PageContextType>({
  pageId: null,
  setPageId: () => {},
})

export const usePageId = () => useContext(PageIdContext)

export function PageIdSetter({ id }: { id: string }) {
  const { setPageId } = usePageId()

  useEffect(() => {
    setPageId(id)
  }, [id, setPageId])

  return null
}

export function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [pageId, setPageId] = useState<string | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <PageIdContext.Provider value={{ pageId, setPageId }}>
        {children}
      </PageIdContext.Provider>
    </QueryClientProvider>
  )
}
