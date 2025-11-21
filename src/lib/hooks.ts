import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"
import {
  API,
  getNavbarOurBusinessReactQuery,
  getPostListReactQuery,
} from "./api"
import { useSearchParams } from "next/navigation"
import { PaginationHandlerResponse } from "./types"
import {
  MetaDocumentItem,
  MetaSearchItem,
  Post,
  PostManagement,
  PostNews,
} from "./fragment"
import { useLocale } from "next-intl"
import { urlEncodedString } from "./utils"

type ArticleSustainabilityProp = {
  options?: Omit<
    UseQueryOptions<ArticleSustainabilityReturn>,
    "queryKey" | "queryFn"
  >
}

type AboutUsManagementsProp = {
  options?: Omit<
    UseQueryOptions<AboutUsManagementsReturn>,
    "queryKey" | "queryFn"
  >
}

type DocumentListProp = {
  options?: Omit<UseQueryOptions<DocumentsReturn>, "queryKey" | "queryFn">
}

type SearchListProp = {
  options?: Omit<UseQueryOptions<SearchsReturn>, "queryKey" | "queryFn">
}

type ArticleSustainabilityReturn = PaginationHandlerResponse<Post[]>
type AboutUsManagementsReturn = PaginationHandlerResponse<PostManagement[]>
type DocumentsReturn = PaginationHandlerResponse<MetaDocumentItem[]>
type SearchsReturn = PaginationHandlerResponse<MetaSearchItem[]>

export function useNavbarOurBusiness() {
  return useQuery({
    queryKey: ["our-business-data"],
    queryFn: async () => await getNavbarOurBusinessReactQuery(),
  })
}

export function useArticleSustainability({
  options,
  limit = 12,
}: ArticleSustainabilityProp & { limit?: number }) {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const currentParams = Object.fromEntries(searchParams.entries())

  const params = {
    ...currentParams,
    type: "articles-sustainability",
    order: "DESC",
    lang: locale,
    sort: "published_at",
    limit: limit,
  }

  return useQuery({
    queryKey: ["articles-sustainability", params],
    queryFn: async () => await getPostListReactQuery(params),
    ...options,
  })
}

export function useArticleNews({ options }: ArticleSustainabilityProp) {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const currentParams = Object.fromEntries(searchParams.entries())
  const { search, ...restParams } = currentParams

  const params = {
    ...restParams,
    type: "news",
    order: "DESC",
    lang: locale,
    sort: "published_at",
    limit: 12,
  }

  return useQuery({
    queryKey: ["articles-news", params],
    queryFn: async () => await getPostListReactQuery(params),
    ...options,
  })
}

export function useManagements({
  options,
  page,
  category_slug,
}: AboutUsManagementsProp & { page: number; category_slug: string }) {
  const getManagements = (page = 1, category_slug?: string) =>
    API.get(
      "/posts?limit=16&sort=sort&order=ASC&type=managements&page=" +
        page +
        "&category_slug=" +
        category_slug
    ).then((res) => res.data.data)

  return useQuery({
    queryKey: ["managements", page, category_slug],
    queryFn: async () => await getManagements(page, category_slug),
    ...options,
  })
}

export function usePostList({ options, params }: any) {
  return useQuery({
    queryKey: ["post-list-articles"],
    queryFn: async () => await getPostListReactQuery(params),
    ...options,
  })
}

export function useQueryGovernancePolicy({
  options,
  page,
  search,
}: DocumentListProp & { page: number; search?: string }) {
  const getDocuments = (page = 1, search?: string) =>
    API.get(
      "/documents?per_page=9&document_page=governance&section=policy&order=ASC&page=" +
        page +
        "&search=" +
        search
    ).then((res) => res.data.data)

  return useQuery({
    queryKey: ["documents-governance-policy", page, search],
    queryFn: async () => await getDocuments(page, search),
    ...options,
  })
}

export function useQueryPressReleases({
  options,
  page,
  search,
}: DocumentListProp & { page: number; search?: string }) {
  const getDocuments = (page = 1, search?: string) => 
    API.get(
      `/documents?${urlEncodedString({per_page: 9, document_page: 'news', order: 'DESC', page, search, sort: 'published_at'})}`)
      .then((res) => res.data.data)

  return useQuery({
    queryKey: ["documents-press-releases", page, search],
    queryFn: async () => await getDocuments(page, search),
    ...options,
  })
}

export function useQueryFinancialCalendar({
  options,
  month,
  year,
}: DocumentListProp & {
  month?: number | null
  year?: string | number | null
}) {
  const getDocuments = async (month = 1, year: number | string | null) => {
    let url = `/documents?per_page=20&document_page=investor_reports&order=DESC&sort=published_at`

    if (year !== null && year !== undefined && year !== "all") {
      url += `&year=${year}`
    }

    if (month !== null && month !== undefined) {
      url += `&month=${month}`
    }

    const res = await API.get(url)
    return res.data.data
  }

  return useQuery({
    queryKey: ["documents-financial-calendar", month, year],
    queryFn: async () => await getDocuments(month!, year!),
    ...options,
  })
}

export function useQueryInvestorUpdate() {
  const getDocuments = () =>
    API.get(
      "/documents?per_page=3&document_page=investor_reports&order=DESC&sort=published_at"
    ).then((res) => res.data.data)

  return useQuery({
    queryKey: ["documents-reports-update"],
    queryFn: async () => await getDocuments(),
  })
}

export function useQueryInvestorReports({
  options,
  page,
  category_id,
}: DocumentListProp & { page: number; category_id: string }) {
  const getDocuments = (page = 1, category_id: string) =>
    API.get(
      "/documents?per_page=10&document_page=investor_reports&sort=published_at&order=DESC&page=" +
        page +
        "&category_id=" +
        category_id
    ).then((res) => res.data.data)

  return useQuery({
    queryKey: ["documents-reports", page, category_id],
    queryFn: async () => await getDocuments(page, category_id),
    ...options,
  })
}

export function useQueryInvestorPublications({
  options,
  page,
  category_id,
}: DocumentListProp & { page: number; category_id: string }) {
  const getDocuments = (page = 1, category_id: string) =>
    API.get(
      "/documents?per_page=5&document_page=investor_publicatios&order=ASC&page=" +
        page +
        "&category_id=" +
        category_id
    ).then((res) => res.data.data)

  return useQuery({
    queryKey: ["documents-publications", page, category_id],
    queryFn: async () => await getDocuments(page, category_id),
    ...options,
  })
}

export function useNavbarArticle() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const currentParams = Object.fromEntries(searchParams.entries())
  const params = {
    ...currentParams,
    type: "news",
    order: "DESC",
    lang: locale,
    sort: "published_at",
    limit: 3,
    news_dynamic: "yes",
  }

  return useQuery({
    queryKey: ["navbar-article"],
    queryFn: async () => await getPostListReactQuery(params),
  })
}

export function usePostDownloadSession() {
  return useMutation({
    mutationFn: (dataBulk: any) => {
      return API.post("/documents/post-by-session", dataBulk)
    },
  })
}

export function useBulkDownload() {
  return useMutation({
    mutationFn: (sessionId: any) => {
      return API.post("/documents/bulk-download", sessionId)
    },
  })
}

export function useGeneralSearch({
  options,
  page,
  search,
  media,
  locale
}: SearchListProp & { page: number; search: string | null; media: string[]; locale: string }) {
  const getSearch = async (
    page = 1,
    search: string | null,
    media: string[]
  ) => {
    const mediaParams = media.map((type) => `type[]=${type}`).join("&")
    const res = await API.get(
      `/general-search?lang=${locale}&limit=5&page=${page}&search=${search}&${mediaParams}`
    )
    return res.data.results
  }

  return useQuery({
    queryKey: ["general-search", page, search],
    queryFn: async () => await getSearch(page, search, media),
    ...options,
  })
}
