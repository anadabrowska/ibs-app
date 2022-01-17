import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
  Container,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FormattedMessage } from "react-intl";

interface AboutUsProps {
  isOpen: boolean;
  screenWidth: number;
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ isOpen, screenWidth, onClose }) => {
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
          <FormattedMessage id="AboutUs.about-us" />
        </DrawerHeader>
        <DrawerBody>
          <Heading as="h1" size="md">
            <FormattedMessage id="AboutUs.what-is-ibs-monitor" />
          </Heading>
          <Box padding={5}>
            <Heading as="h2" size="sm">
              <FormattedMessage id="AboutUs.about-ibs-monitor" />
            </Heading>
            <Container mt={5}>
              <FormattedMessage id="AboutUs.about-ibs-monitor-pt1" />
            </Container>
            <Container mt={2}>
              <FormattedMessage id="AboutUs.about-ibs-monitor-pt2" />
            </Container>
            <Heading as="h2" size="sm" mt={5}>
              <FormattedMessage id="AboutUs.what-we-stand-for" />
            </Heading>
            <Container mt={5}>
              <FormattedMessage id="AboutUs.what-we-stand-for-pt1" />
            </Container>
            <Container mt={2}>
              <FormattedMessage id="AboutUs.what-we-stand-for-pt2" />
            </Container>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AboutUs;
