/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
}

module.exports = nextConfig
