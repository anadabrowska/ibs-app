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

library.add(far, fas);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider locale={LOCALES.ENGLISH}>
      <Provider value={urqlClient}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </I18nProvider>
  );
}

export default MyApp;
