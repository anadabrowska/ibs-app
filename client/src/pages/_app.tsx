import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import Head from "next/head";

import theme from "../theme";
import { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import I18nProvider from "../i18n/provider";
import { LOCALES } from "../i18n/locales";
import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../utils/createApolloClient";
import { Helmet } from "react-helmet";
import { LangChangeEvent } from "../components/settings-panel/ChangeLanguage";

library.add(far, fas);

function MyApp({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    // get language from browser
    let locale = window.navigator.language;
    // or local storeage if set
    const localeCached = localStorage.getItem("locale");
    if (localeCached) {
      locale = localeCached;
    }

    setLocale(locale === "pl-PL" ? LOCALES.POLISH : LOCALES.ENGLISH);
    localStorage?.setItem(
      "locale",
      locale === "pl-PL" ? LOCALES.POLISH : LOCALES.ENGLISH
    );

    const localStorageLangHandler = function (e: LangChangeEvent) {
      e.key === "locale" && e.value ? setLocale(e.value) : null;
    };

    document.addEventListener("languageChange", localStorageLangHandler, false);
  }, []);

  const client = createApolloClient();

  return (
    <>
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        />

        <link rel="manifest" href="/manifest.json" />
        <script defer src="/fontawesome/js/all.js"></script>
        <link href="/fontawesome/css/all.css" rel="stylesheet" />
      </Head>
      <I18nProvider locale={locale}>
        <ApolloProvider client={client}>
          <ChakraProvider resetCSS theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Helmet htmlAttributes={{ lang: locale }}>
              <title>IBS App</title>
            </Helmet>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </I18nProvider>
    </>
  );
}

export default MyApp;
