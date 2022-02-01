import {
  Box,
  Circle,
  Stack,
  Tab,
  TabList,
  Tag,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  faCalendarAlt,
  faPlus,
  faCogs,
  faPen,
  faFlask,
  faArchive,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import React from "react";
import { useDayFormQuery } from "../generated/graphql";

const BottomNavigation: React.FC = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const day = today.getDate();

  const { loading, data } = useDayFormQuery({
    variables: { date: `${year}-${month + 1}-${day}` },
    fetchPolicy: "cache-and-network",
  });

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      overflow="hidden"
      zIndex={5}
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      py={2}
    >
      <TabList py={4} display="flex" justifyContent="space-between">
        <Stack
          direction="row"
          width="30%"
          display="flex"
          justifyContent="space-between"
        >
          <Tab id="calendar" aria-label="calendar">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </Tab>
          <Tab id="openExperiments" aria-label="openExperiments">
            <FontAwesomeIcon icon={faFlask} />
          </Tab>
        </Stack>
        <Box width="40%">
          <Circle
            role="button"
            as="button"
            aria-label="daily form"
            size={16}
            transform={"translateX(-50%)"}
            position="fixed"
            left="50%"
            bottom={10}
            backgroundColor="teal.100"
            borderColor="teal.300"
            borderWidth={5}
            onClick={() => {
              data?.dayForm != null
                ? router.push(`/update-form/${day}-${month + 1}-${year}`)
                : router.push(`/create-form/${day}-${month + 1}-${year}`);
            }}
          >
            <FontAwesomeIcon
              color="gray"
              icon={data?.dayForm != null ? faPen : faPlus}
            />
          </Circle>
        </Box>
        <Stack
          direction="row"
          width="30%"
          display="flex"
          justifyContent="space-between"
        >
          <Tab id="closedExperiments" aria-label="closedExperiments">
            <FontAwesomeIcon icon={faArchive} />
          </Tab>
          <Tab id="settings" aria-label="settings">
            <FontAwesomeIcon icon={faCogs} />
          </Tab>
        </Stack>
        {!navigator.onLine && (
          <Tag
            position="fixed"
            left="50%"
            bottom={2}
            transform={"translateX(-50%)"}
            variant="outline"
            colorScheme="blue"
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ marginRight: "5px" }}
            />
            <TagLabel>Offline</TagLabel>
          </Tag>
        )}
      </TabList>
    </Box>
  );
};

export default BottomNavigation;
