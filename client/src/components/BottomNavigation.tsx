import { Box, Circle, Tab, TabList, useColorModeValue } from "@chakra-ui/react";
import {
  faCalendarAlt,
  faPlus,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import React from "react";

const BottomNavigation: React.FC = () => {
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
          transform={"translateX(-50%)"}
          position="fixed"
          left="50%"
          bottom={5}
          backgroundColor="teal.100"
          borderColor="teal.300"
          borderWidth={5}
          onClick={() => {
            router.push("/create-form");
          }}
        >
          <FontAwesomeIcon color="gray" icon={faPlus} />
        </Circle>
        <Tab>
          <FontAwesomeIcon icon={faCogs} />
        </Tab>
      </TabList>
    </Box>
  );
};

export default BottomNavigation;
