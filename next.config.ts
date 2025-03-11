/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  // Enable server components
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
