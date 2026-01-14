// @ts-check
const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   typedRoutes: true,
  // },
  env: {
    SITE_URL: process.env.SITE_URL || "",
    API_URL: process.env.API_URL || "",
    GTM_ID: process.env.GTM_ID || "",
    IMAGE_URL: process.env.IMAGE_URL || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.antikode.dev",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.chandra-asri.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.youtu.be",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.youtube.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
