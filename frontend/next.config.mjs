/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.coingecko.com", "cryptologos.cc"],
  },
}

export default nextConfig
