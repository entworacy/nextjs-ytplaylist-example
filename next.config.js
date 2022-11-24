/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiBaseUrl: "https://www.googleapis.com/youtube/v3/playlistItems",
    apiKey: "" //YOUR APIKEY HERE
  }
}

module.exports = nextConfig
