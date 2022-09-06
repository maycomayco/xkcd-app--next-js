/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    locales: ["en", "es"],
    // /comic/1234 -> /es/comic/1234
    defaultLocale: "en", // This is the default locale you want to be used when visiting
  },
};

module.exports = nextConfig;
