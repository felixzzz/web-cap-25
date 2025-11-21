"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type Prop = {
  children: React.ReactNode
}

const queryClient = new QueryClient()
export function QueryClientProviderWrapper({ children }: Readonly<Prop>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
