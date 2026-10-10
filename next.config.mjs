import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: {
    appIsrStatus: false,
  },

  // Static export requires unoptimized images (no server-side processing).
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

    reactCompiler: false,
  },

  async redirects() {
    return [
      {
        source: "/team/:slug([a-zA-Z0-9_-]+)/",
        destination: "/about-us/?guide=:slug",
        permanent: true,
      },
      {
        source: "/team/:slug([a-zA-Z0-9_-]+)",
        destination: "/about-us/?guide=:slug",
        permanent: true,
      },
      {
        source: "/ami-training",
        destination: "/ami-montessori-training/",
        permanent: true,
      },
      {
        source: "/ami-training/",
        destination: "/ami-montessori-training/",
        permanent: true,
      },
      {
        source: "/video-catalogue",
        destination: "/video-catalog/",
        permanent: true,
      },
      {
        source: "/video-catalogue/",
        destination: "/video-catalog/",
        permanent: true,
      },
      {
        source: "/annoucement-centre",
        destination: "/announcement-centre/",
        permanent: true,
      },
      {
        source: "/annoucement-centre/",
        destination: "/announcement-centre/",
        permanent: true,
      },
      {
        source: "/parents",
        destination: "/announcement-centre/",
        permanent: true,
      },
      {
        source: "/parents/:path*",
        destination: "/announcement-centre/",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "/video-catalog/",
        permanent: true,
      },
      {
        source: "/videos/",
        destination: "/video-catalog/",
        permanent: true,
      },
      {
        source: "/papers",
        destination: "/research-institute/",
        permanent: true,
      },
      {
        source: "/papers/:path*",
        destination: "/research-institute/",
        permanent: true,
      },
      {
        source: "/publications",
        destination: "/research-institute/",
        permanent: true,
      },
      {
        source: "/publications/:path*",
        destination: "/research-institute/",
        permanent: true,
      },
      {
        source: "/innovation/cubesat-mission",
        destination: "/achievements/",
        permanent: true,
      },
      {
        source: "/innovation/cubesat-mission/",
        destination: "/achievements/",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/wp-json/:path*",
        destination: "https://wp.blueblocks.in/wp-json/:path*",
      },
    ];
  },
};

const withBA = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBA(nextConfig);
