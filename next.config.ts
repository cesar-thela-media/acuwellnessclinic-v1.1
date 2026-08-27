import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Railway uses standalone output for the slim Node 20 server.js runtime.
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
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || undefined,
  project: process.env.SENTRY_PROJECT || undefined,
  silent: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
  widenClientFileUpload: true,
  webpack: {
    treeshake: { removeDebugLogging: true },
    automaticVercelMonitors: false,
  },
});
