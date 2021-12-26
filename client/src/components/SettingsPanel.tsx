import { useApolloClient } from "@apollo/client";
import {
  Stack,
  Center,
  Box,
  Circle,
  Heading,
  List,
  ListItem,
  Divider,
  Button,
  useDisclosure,
  DrawerOverlay,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useColorMode,
} from "@chakra-ui/react";
import {
  faUserAstronaut,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { LOCALES } from "../i18n/locales";

export interface LangChangeEvent extends Event {
  key?: string;
  value?: string;
}

const SettingsPanel: React.FC = () => {
  const { data } = useMeQuery();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout, { loading }] = useLogoutMutation();

  const langDrawer = useDisclosure();
  const colorDrawer = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [language, setLanguage] = useState(LOCALES.ENGLISH);
  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const localeCached = localStorage.getItem("locale");
    localeCached ? setLanguage(localeCached) : null;
    const originalSetItem = localStorage.setItem;
    setScreenWidth(window.innerWidth);

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
    <Stack width="100%" direction="column">
      <Center>
        <Box
          p={3}
          borderWidth={1}
          px={4}
          width="full"
          maxW="350px"
          borderRadius={3}
          textAlign="center"
          mb={5}
        >
          <Stack direction="row">
            <Circle size={20} borderWidth={3}>
              <FontAwesomeIcon color="gray" size="3x" icon={faUserAstronaut} />
            </Circle>
            <FormattedMessage
              id="SettingsPanel.hello"
              values={{
                firstName: data?.me?.firstName,
                lastName: data?.me?.lastName,
              }}
            />
          </Stack>
        </Box>
      </Center>
      <Heading>
        <FormattedMessage id="SettingsPanel.settings" />
      </Heading>
      <List>
        <ListItem as="button" width="100%" onClick={langDrawer.onOpen}>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            py={3}
          >
            <FormattedMessage id="SettingsPanel.change-language" />
            <FontAwesomeIcon icon={faChevronRight} />
          </Box>
          <Divider />
        </ListItem>

        <ListItem as="button" width="100%" onClick={colorDrawer.onOpen}>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            py={3}
          >
            <FormattedMessage id="SettingsPanel.color-mode" />
            <FontAwesomeIcon icon={faChevronRight} />
          </Box>
          <Divider />
        </ListItem>
        <ListItem>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            py={3}
          >
            <FormattedMessage id="SettingsPanel.faq" />
            <FontAwesomeIcon icon={faChevronRight} />
          </Box>
          <Divider />
        </ListItem>
        <ListItem>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            py={3}
          >
            <FormattedMessage id="SettingsPanel.about-us" />
            <FontAwesomeIcon icon={faChevronRight} />
          </Box>
          <Divider mb={10} />
        </ListItem>
      </List>
      <Drawer
        size={screenWidth > 425 ? "md" : "full"}
        isOpen={langDrawer.isOpen}
        placement="right"
        onClose={langDrawer.onClose}
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
      <Drawer
        size={screenWidth > 425 ? "md" : "full"}
        isOpen={colorDrawer.isOpen}
        placement="right"
        onClose={colorDrawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <FormattedMessage id="SettingsPanel.change-color-mode" />
          </DrawerHeader>

          <DrawerBody>
            <List>
              <ListItem
                padding={3}
                as="button"
                width="100%"
                backgroundColor={colorMode === "dark" ? "gray.500" : ""}
                onClick={() => {
                  colorMode === "dark" ? null : toggleColorMode();
                }}
                display="flex"
                justifyContent="space-between"
              >
                <FormattedMessage id="SettingsPanel.color-mode.dark" />
              </ListItem>
              <Divider />
              <ListItem
                backgroundColor={colorMode === "light" ? "gray.200" : ""}
                as="button"
                width="100%"
                onClick={() => {
                  colorMode === "light" ? null : toggleColorMode();
                }}
                padding={3}
                display="flex"
                justifyContent="space-between"
              >
                <FormattedMessage id="SettingsPanel.color-mode.light" />
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Center>
        <Button
          width={100}
          isLoading={loading}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          colorScheme="teal"
          variant="outline"
          onClick={async () => {
            await logout();
            await apolloClient.clearStore();
            await router.replace("/login");
          }}
        >
          <FormattedMessage id="general.logout" />
        </Button>
      </Center>
    </Stack>
  );
};

export default SettingsPanel;
