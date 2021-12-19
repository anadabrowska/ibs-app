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
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const [{ fetching }, logout] = useLogoutMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [language, setLanguage] = useState(LOCALES.ENGLISH);
  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const localeCached = localStorage.getItem("locale");
    localeCached ? setLanguage(localeCached) : null;
    const originalSetItem = localStorage.setItem;
    console.log(window.innerWidth);
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
        <ListItem
          cursor={"pointer"}
          alignItems="center"
          onClick={onOpen}
          display="flex"
          justifyContent="space-between"
          py={3}
        >
          <FormattedMessage id="SettingsPanel.change-language" />
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider />
        <ListItem
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          py={3}
        >
          <FormattedMessage id="SettingsPanel.faq" />
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider />
        <ListItem
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          py={3}
        >
          <FormattedMessage id="SettingsPanel.about-us" />
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider mb={10} />
      </List>
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
                padding={3}
                cursor={"pointer"}
                backgroundColor={
                  language === LOCALES.ENGLISH ? "whiteAlpha.100" : ""
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
                  language === LOCALES.POLISH ? "whiteAlpha.100" : ""
                }
                cursor={"pointer"}
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
      <Center>
        <Button
          width={100}
          isLoading={fetching}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          <FormattedMessage id="general.logout" />
        </Button>
      </Center>
    </Stack>
  );
};

export default SettingsPanel;
