import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Provider } from "urql";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { urqlClient } from "../utils/createUrqlClient";
import I18nProvider from "../i18n/provider";
import { LOCALES } from "../i18n/locales";
import { useEffect, useState } from "react";
import { LangChangeEvent } from "../components/SettingsPanel";

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
      e.value ? setLocale(e.value) : null;
    };

    document.addEventListener("languageChange", localStorageLangHandler, false);
  }, []);

  return (
    <I18nProvider locale={locale}>
      <Provider value={urqlClient}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </I18nProvider>
  );
}

export default MyApp;
