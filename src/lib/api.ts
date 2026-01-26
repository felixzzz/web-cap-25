import { API_URL } from "./constant"
import { MetaDocumentItem, Post, PostManagement } from "./fragment"
import {
  BodyContactUs,
  DynamicProps,
  HttpHandlerResponse,
  PaginationHandlerResponse,
} from "./types"
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios"

export const API = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

const reqInterceptor = (req: InternalAxiosRequestConfig<any>) => {
  return req
}

const resOnFulfilled = (response: AxiosResponse<{}>): AxiosResponse<{}> => {
  return response
}

API.interceptors.request.use(reqInterceptor)
API.interceptors.response.use(resOnFulfilled)

export async function getPostListReactQuery(
  params: any
): Promise<PaginationHandlerResponse<Post[]>> {
  return API.get(`/posts`, {
    params,
  }).then((res) => res.data.data)
}

export async function getDocumentListReactQuery(
  params: any
): Promise<PaginationHandlerResponse<MetaDocumentItem[]>> {
  return API.get(`/documents`, {
    params,
  }).then((res) => res.data.data)
}

export async function getPostManagementReactQuery(
  params: any
): Promise<PaginationHandlerResponse<PostManagement[]>> {
  return API.get(`/posts`, {
    params,
  }).then((res) => res.data.data)
}

export async function getNavbarOurBusinessReactQuery(): Promise<
  HttpHandlerResponse<DynamicProps[]>
> {
  return API.get(`pages/dynamic`).then((res) => res.data)
}

async function fetchAPI(
  path: string,
  method: string,
  body?: BodyInit,
  options?: RequestInit
) {
  const headers =
    method === "POST" ? undefined : { "Content-Type": "application/json" }

  try {
    const res = await fetch(`${API_URL}/api/${path}`, {
      method,
      body,
      headers,
      ...options,
    })
    if (res.ok) {
      const json = await res.json()
      if (json.errors) {
        throw new Error("Failed to fetch API")
      }
      return json.data || json.meta || json
    }

    // throw res
  } catch (errors) {
    throw new Error("Failed to fetch API")
  }
}

export async function getPage(page: string) {
  const data = await fetchAPI(`pages/${page}`, "GET")
  return data
}

export async function getProducts() {
  const data = await fetchAPI(`products`, "GET")
  return data
}

export async function getMultiplePage(query: string) {
  const data = await fetchAPI(`pages${query}`, "GET")
  return data
}

export async function getPostList(query: string) {
  const data = await fetchAPI(`posts${query}`, "GET")
  return data
}

export async function getDetailPost(slug: string) {
  const data = await fetchAPI(`posts/${slug}`, "GET")
  return data
}

export async function getDocuments(query: string) {
  const data = await fetchAPI(`documents${query}`, "GET")
  return data
}

export async function getDocumentsPublishedYears() {
  const data = await fetchAPI(`documents/published-years`, "GET")
  return data
}

export async function getDocumentsCategories(query: string) {
  const data = await fetchAPI(`documents/categories${query}`, "GET")
  return data
}

export async function getPostCategories(query: string) {
  const data = await fetchAPI(`posts/categories${query}`, "GET")
  return data
}

export async function postContactUs(body: BodyContactUs) {
  const data = await API.post(`contact-us`, JSON.stringify(body))
  return data
}

export async function getActiveBanners(slug: string) {
  try {
    const data = await fetchAPI(`banner/${slug}`, "GET", undefined, {
      next: { tags: ["active-banners"], revalidate: 60 },
    })
    return data ?? null
  } catch (e) {
    return null
  }
}

export async function getHomeBanners(locale: string): Promise<{
  navbar: any[]
  "journey-growth": any[]
  "financial-reports": any[]
} | null> {
  try {
    const data = await fetchAPI(
      `home-banners?lang=${locale}`,
      "GET",
      undefined,
      {
        next: { tags: ["home-banners"], revalidate: 60 },
      }
    )
    return data ?? null
  } catch (e) {
    return null
  }
}
