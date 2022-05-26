/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  'Cache-Control': 'public, max-age=31536000, immutable',
  compress: true,
  images: {
    domains: ['media.graphassets.com'],
  },
}
