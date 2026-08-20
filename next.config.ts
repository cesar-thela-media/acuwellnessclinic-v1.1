import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Vercel: default Next output (no standalone).
 * Docker / Railway reserve: standalone for slim runtime + server.js.
 */
const isVercel = process.env.VERCEL === "1";
const useStandalone =
  !isVercel && (process.env.OUTPUT_STANDALONE === "1" || process.env.RAILWAY === "1");

const nextConfig: NextConfig = {
  ...(useStandalone ? { output: "standalone" as const } : {}),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  allowedDevOrigins: [
    "*.grok-sandbox.com",
    "*.hades-www.grok-sandbox.com",
    "grok-sandbox.com",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "acuwellnessclinic.com" },
      { protocol: "https", hostname: "www.acuwellnessclinic.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/modern-research",
        destination: "/resources/more-research",
        permanent: true,
      },
      {
        source: "/modern-research/",
        destination: "/resources/more-research",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page_id", value: "17" }],
        destination: "/resources/more-research",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination:
          "/media/wp-content/uploads/2011/10/SSAW-Privacy-Policy-Jan-2017.pdf",
        permanent: true,
      },
      {
        source: "/privacy-policy/",
        destination:
          "/media/wp-content/uploads/2011/10/SSAW-Privacy-Policy-Jan-2017.pdf",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || undefined,
  project: process.env.SENTRY_PROJECT || undefined,
  silent: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: false,
});
