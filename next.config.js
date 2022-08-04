/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  redirects: async () => [
    {
      source: "/login",
      has: [
        {
          type: "header",
          key: "Cookie",
        },
      ],
      permanent: false,
      destination: "/profile",
    },
  ],
};

module.exports = nextConfig;
