/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  poweredByHeader: false,

  // Static export requires unoptimized images (no server-side processing).
  // Image quality is improved via proper width/height/alt/loading attributes.
  images: {
    unoptimized: true,
  },

  // Compress responses (gzip) in the dev server and static export.
  compress: true,

  // Reduce bundle size by tree-shaking package subpath imports.
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "embla-carousel-react",
      "@radix-ui/react-dialog",
      "yet-another-react-lightbox",
    ],
  },
};

export default nextConfig;
