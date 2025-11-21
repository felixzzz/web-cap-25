import { Metadata } from "next"

// setup SEO here
const title = "Chandra Asri"
const description =
  "Chandra Asri Group is Indonesia’s leading chemical and infrastructure solutions company, operating an integrated petrochemical plant that incorporates world-class, state-of-the-art technology and supporting facilities."

export const sharedMetadata: Metadata = {
  metadataBase: new URL(`${process.env.SITE_URL}`),
  title: {
    default: `${title}`,
    template: `%s | ${title}`,
  },
  openGraph: {
    type: "website",
    title: `${title}`,
    description: `${description}`,
    siteName: `${title}`,
    images: [
      {
        url: `/icons/richlink.jpg`,
      },
    ],
  },
  robots: "index, follow",
  alternates: {
    canonical: "./",
  },
  icons: [
    { rel: "icon", url: "/icons/favicon-32x32.png" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
  ],
  twitter: {
    card: "summary_large_image",
    site: `${title}`,
    creator: "Antikode",
    images: `/icons/richlink.jpg`,
  },
  description: `${description}`,
  authors: [{ name: "Chandra Asri", url: process.env.SITE_URL }],
}
