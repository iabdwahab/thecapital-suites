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
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
