import { SITE_URL } from "@/lib/constant"
import { getLocalizedContent } from "@/lib/utils"

interface JsonLdRendererProps {
  meta: any
  locale: "en" | "id"
  pageType:
    | "home"
    | "who-we-are"
    | "investor"
    | "governance"
    | "business-solution-overview"
    | "chemical-solutions"
    | "business-line"
  customProps?: {
    title?: string
    description?: string
    url?: string
  }
}

export default function JsonLdRenderer({
  meta,
  locale,
  pageType,
  customProps,
}: JsonLdRendererProps) {
  // Try to parse the custom JSON-LD from CMS first
  const customSchemaRaw = getLocalizedContent(
    locale,
    meta?.seo?.seo_schema_en,
    meta?.seo?.seo_schema_id
  )

  let schemaObj: any = null

  if (customSchemaRaw) {
    try {
      schemaObj =
        typeof customSchemaRaw === "string"
          ? JSON.parse(customSchemaRaw)
          : customSchemaRaw
    } catch (e) {
      console.error("Invalid custom JSON-LD schema provided from CMS:", e)
    }
  }

  // Fallback schemas
  if (!schemaObj) {
    const defaultCompany = {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "PT Chandra Asri Pacific Tbk",
      "alternateName": "Chandra Asri Group",
      "url": SITE_URL,
      "logo": `${SITE_URL}/icons/apple-touch-icon.png`,
      "description":
        locale === "id"
          ? "Chandra Asri Group adalah perusahaan solusi kimia dan infrastruktur terkemuka di Indonesia."
          : "Chandra Asri Group is Indonesia's leading chemical and infrastructure solutions company.",
      "sameAs": [
        "https://www.linkedin.com/company/pt-chandra-asri",
        "https://www.instagram.com/chandraasri.id",
        "https://www.youtube.com/channel/UCoqBsqI8crt0OLCuD7f1UyQ",
        "https://www.tiktok.com/@chandraasri.id",
        "https://x.com/ChandraasriID",
        "https://www.facebook.com/ChandraAsriGroup/",
      ],
    }

    if (pageType === "home") {
      schemaObj = defaultCompany
    } else if (pageType === "governance") {
      schemaObj = {
        "@context": "https://schema.org",
        "@graph": [
          defaultCompany,
          {
            "@type": "WebPage",
            "@id": `${SITE_URL}/${locale}/governance`,
            "url": `${SITE_URL}/${locale}/governance`,
            "name":
              locale === "id"
                ? "Tata Kelola | Chandra Asri Group"
                : "Governance | Chandra Asri Group",
            "description": customProps?.description ?? "",
            "isPartOf": { "@id": `${SITE_URL}#website` },
          },
        ],
      }
    } else if (pageType === "who-we-are") {
      schemaObj = {
        ...defaultCompany,
        "address": {
          "@type": "PostalAddress",
          "streetAddress":
            "Wisma Barito Pacific Tower A, 7th Floor, Jl. Let. Jend. S. Parman kav.62-63",
          "addressLocality": "Jakarta",
          "postalCode": "11410",
          "addressCountry": "ID",
        },
        "telephone": "+62-21-530-7950",
        "faxNumber": "+62-21-530-8930",
      }
    } else if (pageType === "investor") {
      schemaObj = {
        "@context": "https://schema.org",
        "@graph": [
          defaultCompany,
          {
            "@type": "Service",
            "name":
              locale === "id"
                ? "Hubungan Investor Chandra Asri Group"
                : "Chandra Asri Group Investor Relations",
            "provider": {
              "@type": "Corporation",
              "name": "PT Chandra Asri Pacific Tbk",
            },
            "description":
              locale === "id"
                ? "Layanan dan laporan keuangan hubungan investor PT Chandra Asri Pacific Tbk."
                : "PT Chandra Asri Pacific Tbk investor relations services and financial reports.",
          },
        ],
      }
    } else if (pageType === "business-solution-overview") {
      schemaObj = {
        "@context": "https://schema.org",
        "@graph": [
          defaultCompany,
          {
            "@type": "Service",
            "name":
              locale === "id"
                ? "Solusi Bisnis Chandra Asri Group"
                : "Chandra Asri Group Business Solutions",
            "provider": {
              "@type": "Corporation",
              "name": "PT Chandra Asri Pacific Tbk",
            },
            "description":
              locale === "id"
                ? "Menyediakan solusi kimia, infrastruktur, energi, dan perdagangan yang terintegrasi."
                : "Providing integrated chemical, infrastructure, energy, and trading solutions.",
          },
        ],
      }
    } else if (
      pageType === "chemical-solutions" ||
      pageType === "business-line"
    ) {
      const pageTitle =
        customProps?.title ??
        (pageType === "chemical-solutions"
          ? "Chemical Solutions"
          : "Business Solutions")
      const pageDesc = customProps?.description ?? ""
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": pageTitle,
        "description": pageDesc,
        "brand": {
          "@type": "Brand",
          "name": "Chandra Asri Group",
        },
        "offers": {
          "@type": "Offer",
          "seller": {
            "@type": "Corporation",
            "name": "PT Chandra Asri Pacific Tbk",
          },
        },
      }
    }
  }

  if (!schemaObj) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
    />
  )
}
