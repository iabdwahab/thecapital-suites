import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "thecapital-suites.local",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "salmon-reindeer-627957.hostingersite.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
