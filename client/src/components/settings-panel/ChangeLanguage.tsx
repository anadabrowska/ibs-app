import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { LOCALES } from "../../i18n/locales";

interface ChangeLanguageProps {
  isOpen: boolean;
  screenWidth: number;
  onClose: () => void;
}

export interface LangChangeEvent extends Event {
  key?: string;
  value?: string;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({
  isOpen,
  screenWidth,
  onClose,
}) => {
  const [language, setLanguage] = useState(LOCALES.ENGLISH);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const localeCached = localStorage.getItem("locale");
    localeCached ? setLanguage(localeCached) : null;
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event: LangChangeEvent = new Event("languageChange");
      event.key = key;
      event.value = value;
      document.dispatchEvent(event);

      originalSetItem.apply(this, [key, value]);
    };
  }, []);

  const setLocale = (value: string) => {
    setLanguage(value);
    localStorage.setItem("locale", value);
  };
  return (
    <Drawer
      size={screenWidth > 425 ? "md" : "full"}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <FormattedMessage id="SettingsPanel.change-language" />
        </DrawerHeader>

        <DrawerBody>
          <List>
            <ListItem
              as="button"
              width="100%"
              padding={3}
              backgroundColor={
                language === LOCALES.ENGLISH
                  ? colorMode === "dark"
                    ? "gray.500"
                    : "gray.200"
                  : ""
              }
              onClick={() => setLocale(LOCALES.ENGLISH)}
              display="flex"
              justifyContent="space-between"
            >
              English (US)
            </ListItem>
            <Divider />
            <ListItem
              backgroundColor={
                language === LOCALES.POLISH
                  ? colorMode === "dark"
                    ? "gray.500"
                    : "gray.200"
                  : ""
              }
              as="button"
              width="100%"
              onClick={() => setLocale(LOCALES.POLISH)}
              padding={3}
              display="flex"
              justifyContent="space-between"
            >
              Polski
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangeLanguage;
