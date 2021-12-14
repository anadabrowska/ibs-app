import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";
import messages from "./messages";

interface ProviderProps {
  children: React.ReactNode;
  locale: any;
}

const I18nProvider: React.FC<ProviderProps> = ({
  children,
  locale = LOCALES.ENGLISH,
}) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

export default I18nProvider;
