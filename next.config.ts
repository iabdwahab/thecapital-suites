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
        hostname: "wp.thecapitalsuites.sa",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
    dangerouslyAllowLocalIP: true,
  },

  output: "export",
};

export default nextConfig;
