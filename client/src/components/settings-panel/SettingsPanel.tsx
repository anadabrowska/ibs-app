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
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import AboutUs from "./AboutUs";
import ChangeLanguage from "./ChangeLanguage";
import ColorMode from "./ColorMode";
import Faq from "./Faq";

const SettingsPanel: React.FC = () => {
  const { data } = useMeQuery({
    fetchPolicy: "cache-and-network",
  });
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout, { loading }] = useLogoutMutation();

  const langDrawer = useDisclosure();
  const colorDrawer = useDisclosure();
  const faqDrawer = useDisclosure();
  const aboutUsDrawer = useDisclosure();

  const [screenWidth, setScreenWidth] = useState(1024);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

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
        <ListItem as="button" width="100%" onClick={faqDrawer.onOpen}>
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
        <ListItem as="button" width="100%" onClick={aboutUsDrawer.onOpen}>
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

      <ChangeLanguage
        isOpen={langDrawer.isOpen}
        screenWidth={screenWidth}
        onClose={langDrawer.onClose}
      />
      <ColorMode
        isOpen={colorDrawer.isOpen}
        screenWidth={screenWidth}
        onClose={colorDrawer.onClose}
      />
      <Faq
        isOpen={faqDrawer.isOpen}
        screenWidth={screenWidth}
        onClose={faqDrawer.onClose}
      />
      <AboutUs
        isOpen={aboutUsDrawer.isOpen}
        screenWidth={screenWidth}
        onClose={aboutUsDrawer.onClose}
      />
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
