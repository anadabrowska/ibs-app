import { Flex, Stack, Circle, CloseButton, Heading } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

const DailyFormWrapper: React.FC = ({ children }) => {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={[3, 6, 9]}>
        <Circle
          position="absolute"
          top={[3, 5]}
          left={[3, 5]}
          borderWidth={2}
          onClick={() => {
            router.replace("/");
          }}
        >
          <CloseButton size="md" />
        </Circle>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>How was your day?</Heading>
        </Stack>
        {children}
      </Stack>
    </Flex>
  );
};

export default DailyFormWrapper;
