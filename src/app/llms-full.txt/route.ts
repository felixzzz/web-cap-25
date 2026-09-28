import { getLlmsContent } from "@/lib/api"
import { SITE_URL } from "@/lib/constant"

export const revalidate = 60

function buildFallbackLlmsFullTxt(): string {
  const baseUrl = SITE_URL.replace(/\/$/, "")
  return `# Chandra Asri Group — Full Context Documentation (llms-full.txt)

> Chandra Asri Group is Indonesia's leading energy, chemical, and infrastructure solutions company, supplying products and services to various manufacturing industries in both domestic and international markets.

## Organization Profile

- **Organization**: Chandra Asri Group (PT Chandra Asri Pacific Tbk / IDX: TPIA)
- **Tagline**: Your Growth Partner
- **Website**: ${baseUrl}
- **Languages**: English (\`${baseUrl}/en\`) and Bahasa Indonesia (\`${baseUrl}/id\`)
- **Summary Index**: ${baseUrl}/llms.txt

---

## 1. Corporate Overview & Business Sectors

### About Chandra Asri Group
- **URL (EN)**: ${baseUrl}/en/about/who-we-are
- **URL (ID)**: ${baseUrl}/id/about/who-we-are

Chandra Asri Group is a leading chemical, energy, and infrastructure solutions company in Southeast Asia. Operating Indonesia's integrated petrochemical complex and expanding into regional energy, chemical, port, tankage, electricity, water, and liner logistics infrastructure, Chandra Asri serves as "Your Growth Partner" for strategic industrial sectors.

### Chemical Solutions
- **URL (EN)**: ${baseUrl}/en/our-business/chemical-solutions
- **URL (ID)**: ${baseUrl}/id/our-business/chemical-solutions

Key product lines include Olefins (Ethylene, Propylene, Py-Gas, Crude C4), Polyolefins (Polyethylene - Asrene®, Polypropylene - Trilene®), Styrene Monomer, Butadiene, MTBE, Butene-1, and Chlor-Alkali / Ethylene Dichloride solutions.

### Sustainability & ESG
- **URL (EN)**: ${baseUrl}/en/sustainability
- **URL (ID)**: ${baseUrl}/id/sustainability

Committed to operational excellence, decarbonization, circular economy (plastic asphalt, pyrolysis oil, mechanical & chemical recycling), biodiversity conservation, community empowerment, and strong ESG governance.

### Investor Relations & Corporate Governance
- **URL (EN)**: ${baseUrl}/en/investor
- **URL (ID)**: ${baseUrl}/id/investor

Listed on the Indonesia Stock Exchange (IDX: TPIA). Provides transparent financial statements, annual reports, sustainability reports, bond and stock disclosures, and Good Corporate Governance (GCG) frameworks.
`
}

export async function GET() {
  const data = await getLlmsContent()
  const content =
    data?.llms_full_txt && data.llms_full_txt.trim().length > 0
      ? data.llms_full_txt
      : buildFallbackLlmsFullTxt()

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
