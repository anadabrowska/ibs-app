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
    disable: process.env.NODE_ENV === "development",
    sw: "sw.js",
  },
});

//for dev tesintg turn of pwa fuctionalitites

// module.exports = {
//   i18n: {
//     locales: ["pl-PL", "en-US"],
//     defaultLocale: "pl-PL",
//   },
// };
