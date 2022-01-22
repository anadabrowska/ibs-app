const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["pl-PL", "en-US"],
    defaultLocale: "pl-PL",
  },
  pwa: {
    dest: "public",
    register: true,
    scope: "/",
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

// module.exports = {
//   i18n: {
//     locales: ["pl-PL", "en-US"],
//     defaultLocale: "pl-PL",
//   },
// };
