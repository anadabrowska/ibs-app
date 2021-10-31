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
} from "@chakra-ui/react";
import {
  faUserAstronaut,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const SettingsPanel: React.FC = () => {
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const [{ fetching }, logout] = useLogoutMutation();

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
            <div>
              Hi {data?.me?.firstName} {data?.me?.lastName}!
            </div>
          </Stack>
        </Box>
      </Center>
      <Heading>Settings</Heading>
      <List>
        <ListItem display="flex" justifyContent="space-between" py={3}>
          <div>Change Language</div>
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider />
        <ListItem display="flex" justifyContent="space-between" py={3}>
          <div>FAQ</div>
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider />
        <ListItem display="flex" justifyContent="space-between" py={3}>
          <div>O nas</div>
          <FontAwesomeIcon icon={faChevronRight} />
        </ListItem>
        <Divider mb={10} />
      </List>
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
          Logout
        </Button>
      </Center>
    </Stack>
  );
};

export default SettingsPanel;
