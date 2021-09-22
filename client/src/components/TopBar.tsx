import React from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Circle,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { useLogoutMutation } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

const TopBar: React.FC = ({}) => {
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Circle borderWidth={2} size="40px">
                <FontAwesomeIcon icon={faCogs} />
              </Circle>
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  logout();
                  router.replace("/login");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
