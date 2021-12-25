const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    scope: "/",
    disable: process.env.NODE_ENV === "development",
    sw: "sw.js",
  },
});
