/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['firebasestorage.googleapis.com'] },
  experimental: {
    swcFileReading: false
  }
}

module.exports = nextConfig
