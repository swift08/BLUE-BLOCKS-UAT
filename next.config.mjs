/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  output: 'export',
  trailingSlash:true,
  basePath: "", // keep empty if served at domain root
  assetPrefix: "", // same as above
  images: {
    unoptimized: true,
  }
};

export default nextConfig;