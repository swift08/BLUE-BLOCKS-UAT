/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  images: {
    unoptimized: true,
  },

  async headers() {
    const isProd =
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production";

    if (isProd) return [];

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
