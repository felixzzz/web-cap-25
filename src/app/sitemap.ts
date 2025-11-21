import { MetadataRoute } from "next";
import { locales, pathnames } from "@/config";
import { getPathname } from "@/navigation";
import { SITE_URL } from "@/data/data";
import { getPage, getPostList } from "@/lib/api";
import { PostNews, ProductChemical } from "@/lib/fragment";
import { BusinessSolutionsProp, DynamicProps, HttpGeneralResponse, PaginationHandlerResponse } from "@/lib/types";
import { getLocalizedContent } from "@/lib/utils";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes = locales.flatMap((locale) =>
    (Object.keys(pathnames) as Array<keyof typeof pathnames>).map((key) => ({
      url: `${SITE_URL}/${locale}${getPathname({ locale, href: key }) === "/" ? "" : getPathname({ locale, href: key })}`,
      lastModified: now,
    }))
  );

  const allDynamicRoutes = await Promise.all(
    locales.map(async (locale) => {
      const [news, blogs, sustainability, products, business] = await Promise.all([
        generateSitemapNews(locale, "news"),
        generateSitemapNews(locale, "blog"),
        generateSitemapEsgInAction(locale),
        generateSitemapProducts(locale),
        generateSitemapBusinessLineAndUnit(locale),
      ]);
      return [...news, ...blogs, ...sustainability, ...products, ...business];
    })
  );

  return [...staticRoutes, ...allDynamicRoutes.flat()];
}

// Shared pagination-based generator
async function generatePaginatedSitemap(
  baseUrl: string,
  query: string,
  locale: string
): Promise<{ url: string; lastModified: string }[]> {
  const routes: { url: string; lastModified: string }[] = [];
  let page = 1;
  const limit = 10;
  let hasMore = true;

  while (hasMore) {
    const posts: PaginationHandlerResponse<PostNews[]> = await getPostList(
      `${query}&page=${page}&limit=${limit}&sort=published_at&order=DESC&lang=${locale}`
    );

    if (!posts?.data) break;

    routes.push(
      ...posts.data.map((item) => ({
        url: `${SITE_URL}/${locale}/${baseUrl}/${locale === "en" ? item.slug_en : item.slug}`,
        lastModified: new Date(item.updated_at).toISOString(),
      }))
    );

    hasMore = page < posts.last_page;
    page++;
  }

  return routes;
}

function generateSitemapNews(locale: string, type: "news" | "blog") {
  return generatePaginatedSitemap(type, `?type=${type}`, locale);
}

function generateSitemapEsgInAction(locale: string) {
  return generatePaginatedSitemap("sustainability/sustainability-in-action", "?type=articles-sustainability", locale);
}

async function generateSitemapProducts(locale: string): Promise<
  { url: string; lastModified: string }[]
> {
  const products: PaginationHandlerResponse<ProductChemical[]> = await getPostList(`?type=products&lang=${locale}`);
  if (!products?.data) return [];

  const now = new Date().toISOString();
  return products.data.map((item) => ({
    url: `${SITE_URL}/${locale}/our-business/chemical-solutions/${item.slug}`,
    lastModified: now,
  }));
}

async function generateSitemapBusinessLineAndUnit(locale: string): Promise<
  { url: string; lastModified: string }[]
> {
  const data: HttpGeneralResponse<BusinessSolutionsProp> =
      await getPage('solusi-infrastruktur')
  if (!data?.meta) return [];

  const now = new Date().toISOString();
  const content_left_right = getLocalizedContent(locale, data?.meta?.content_left_right?.list_en, data.meta.content_left_right?.list_id)
  return content_left_right?.flatMap((item) => [
    {
      url: `${SITE_URL}/${locale}/our-business/${item.cta_url}`,
      lastModified: now,
    },
  ]);
}
