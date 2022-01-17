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
import React from "react";
import { FormattedMessage } from "react-intl";

interface ColorModeProps {
  isOpen: boolean;
  screenWidth: number;
  onClose: () => void;
}

const ColorMode: React.FC<ColorModeProps> = ({
  isOpen,
  onClose,
  screenWidth,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

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
  );
};

export default ColorMode;
