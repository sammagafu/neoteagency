import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  async redirects() {
    return [
      {
        source: "/team",
        destination: "/about#team",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
