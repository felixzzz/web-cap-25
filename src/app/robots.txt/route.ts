import { getRobotsContent } from "@/lib/api"
import { SITE_URL } from "@/lib/constant"

export const revalidate = 60

function buildFallbackRobotsTxt(): string {
  const baseUrl = SITE_URL.replace(/\/$/, "")
  return `# robots.txt — Chandra Asri Group

User-agent: Googlebot
Disallow: /
User-agent: Googlebot-Image
Disallow: /
User-agent: Bingbot
Disallow: /
User-agent: Yandex
Disallow: /
User-agent: Baiduspider
Disallow: /
User-agent: Yeti
Disallow: /
User-agent: Applebot
Disallow: /
User-agent: DuckDuckBot
Disallow: /
User-agent: Slurp
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: OAI-SearchBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: anthropic-ai
Disallow: /
User-agent: PerplexityBot
Disallow: /
User-agent: Perplexity-User
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: Amazonbot
Disallow: /
User-agent: Applebot-Extended
Disallow: /
User-agent: Meta-ExternalAgent
Disallow: /
User-agent: cohere-ai
Disallow: /
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: MJ12bot
Disallow: /
User-agent: DotBot
Disallow: /
User-agent: BLEXBot
Disallow: /
User-agent: DataForSeoBot
Disallow: /
User-agent: archive.org_bot
Disallow: /
User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml
`
}

export async function GET() {
  const data = await getRobotsContent()
  const content =
    data?.robots_txt && data.robots_txt.trim().length > 0
      ? data.robots_txt
      : buildFallbackRobotsTxt()

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
