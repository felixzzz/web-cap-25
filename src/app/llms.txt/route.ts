import { getLlmsContent } from "@/lib/api"
import { SITE_URL } from "@/lib/constant"

export const revalidate = 60

function buildFallbackLlmsTxt(): string {
  const baseUrl = SITE_URL.replace(/\/$/, "")
  return `# Chandra Asri Group

> Chandra Asri Group is Indonesia's leading energy, chemical, and infrastructure solutions company, supplying products and services to various manufacturing industries in both domestic and international markets.

Tagline: Your Growth Partner

## Full Context

- [Full LLM Documentation (llms-full.txt)](${baseUrl}/llms-full.txt): Complete reference of Chandra Asri Group corporate profile, business solutions, chemical products, sustainability programs, investor relations, and latest news.
- [XML Sitemap](${baseUrl}/sitemap.xml): Complete index of public URLs in English (\`/en\`) and Indonesian (\`/id\`).

## Core Corporate Sections

- [Home](${baseUrl}/en): Main corporate portal and overview of Chandra Asri Group.
- [About Us - Who We Are](${baseUrl}/en/about/who-we-are): Company history, vision, mission, corporate values, and milestones.
- [Management & Corporate Structure](${baseUrl}/en/about/management-and-structure): Board of Commissioners, Board of Directors, and organizational structure.
- [Awards & Recognition](${baseUrl}/en/about/awards-and-recognition): Corporate achievements, certifications, and industry awards.
- [Our Business](${baseUrl}/en/our-business): Overview of Chemicals, Energy, Infrastructure, and Liner business solutions.
- [Chemical Solutions](${baseUrl}/en/our-business/chemical-solutions): Olefins, Polyolefins, Styrene Monomer, Butadiene, MTBE, Butene-1, and Chlor-Alkali products.
- [Sustainability](${baseUrl}/en/sustainability): ESG strategy, circular economy initiatives, environment, social responsibility, and sustainability governance.
- [Sustainability - Environment](${baseUrl}/en/sustainability/environment): Decarbonization, energy efficiency, water management, and circular economy programs.
- [Sustainability - Social](${baseUrl}/en/sustainability/social): Community development, health, safety, and human capital initiatives.
- [Sustainability - Governance](${baseUrl}/en/sustainability/governance): ESG governance framework and ethical compliance.
- [Sustainability Reports & Publications](${baseUrl}/en/sustainability/reports-and-publications): Annual sustainability reports and ESG disclosures.
- [Sustainability in Action](${baseUrl}/en/sustainability/sustainability-in-action): Case studies and articles on environmental and community programs.
- [Investor Relations](${baseUrl}/en/investor): Financial highlights, shareholder information, and investor updates.
- [Investor Reports](${baseUrl}/en/investor/reports): Annual reports, financial statements, and corporate presentations.
- [Investor Publications](${baseUrl}/en/investor/publication): Prospectuses, RUPS/GMS announcements, and public disclosures.
- [Stocks & Bonds](${baseUrl}/en/investor/stocks-and-bonds): TPIA stock information, bond issuances, and credit ratings.
- [Corporate Governance](${baseUrl}/en/governance): Good Corporate Governance (GCG) policies, charter, and whistleblowing system.
- [News & Publications](${baseUrl}/en/news): Official press releases, corporate updates, and industry insights.
- [Caliber](${baseUrl}/en/caliber): Chandra Asri Group talent and career development program.
- [Contact Us](${baseUrl}/en/contact-us): Head office, plant locations, and business inquiry channels.

## Languages

- [English Version](${baseUrl}/en): Primary English corporate website.
- [Indonesian Version](${baseUrl}/id): Bahasa Indonesia corporate website.
`
}

export async function GET() {
  const data = await getLlmsContent()
  const content =
    data?.llms_txt && data.llms_txt.trim().length > 0
      ? data.llms_txt
      : buildFallbackLlmsTxt()

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
