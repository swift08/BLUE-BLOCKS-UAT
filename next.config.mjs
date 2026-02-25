/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
