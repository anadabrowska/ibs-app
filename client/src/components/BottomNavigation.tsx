import { Box, Circle, Tab, TabList, useColorModeValue } from "@chakra-ui/react";
import {
  faCalendarAlt,
  faPlus,
  faCogs,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <Tab>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Tab>
        <Circle
          boxSize={16}
          cursor="pointer"
          transform={"translateX(-50%)"}
          position="fixed"
          left="50%"
          bottom={5}
          backgroundColor="teal.100"
          borderColor="teal.300"
          borderWidth={5}
          onClick={() => {
            !loading && data?.dayForm != null
              ? router.push(`/update-form/${day}-${month + 1}-${year}`)
              : router.push(`/create-form/${day}-${month + 1}-${year}`);
          }}
        >
          <FontAwesomeIcon
            color="gray"
            icon={!loading && data?.dayForm != null ? faPen : faPlus}
          />
        </Circle>
        <Tab>
          <FontAwesomeIcon icon={faCogs} />
        </Tab>
      </TabList>
    </Box>
  );
};

export default BottomNavigation;
