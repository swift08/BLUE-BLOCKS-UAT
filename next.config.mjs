import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,

  // Static export requires unoptimized images (no server-side processing).
  // Images are pre-compressed at source via scripts/compress-gallery.js.
  images: {
    unoptimized: true,
  },

  // Transpile ES modules from node_modules for server-side compatibility
  transpilePackages: ["yet-another-react-lightbox"],

  // Compress responses (gzip) in the dev server.
  compress: true,

  experimental: {
    // Tree-shake large package subpath imports — reduces initial JS bundle.
    optimizePackageImports: [
      "framer-motion",
      "embla-carousel-react",
      "@radix-ui/react-dialog",
      "yet-another-react-lightbox",
    ],

    // React Compiler — automatically memoizes components and hooks,
    // eliminating the need for manual useMemo/useCallback in many places.
    // babel-plugin-react-compiler is already installed as a devDependency.
    reactCompiler: true,
  },
};

const withBA = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBA(nextConfig);
