import type { NextConfig } from "next";

const configuredHosts = new Set(["pub-xxxxx.r2.dev", "bookstation.my.canva.site"]);
const configuredPublicUrl =
  process.env.CLOUDFLARE_R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

if (configuredPublicUrl) {
  try {
    configuredHosts.add(new URL(configuredPublicUrl).hostname);
  } catch {
    // Ignore invalid URLs in local development until environment variables are configured.
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: Array.from(configuredHosts).map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
