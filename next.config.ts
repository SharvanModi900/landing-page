import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  async rewrites() {
    return [
      // Rewrite API requests to the Tendermint RPC
      {
        source: "/api/rpc/:path*",
        destination: "http://localhost:26657/:path*",
      },
      // Rewrite API requests to the Cosmos REST API
      {
        source: "/api/rest/:path*",
        destination: "http://localhost:1317/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 ADD THIS LINE
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `net` module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
        dgram: false,
      };
    }
    return config;
  },
};

export default nextConfig;
