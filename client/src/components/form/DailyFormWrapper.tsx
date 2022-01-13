import { Stack, Circle, CloseButton, Heading, Center } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

const DailyFormWrapper: React.FC = ({ children }) => {
  return (
    <Center
      transformOrigin="top"
      transform={{
        base: "scale(.77)",
        mobileS: "scale(.85)",
        mobile: "scale(1)",
      }}
    >
      <Stack>
        <Circle
          position="absolute"
          top={{ base: 3, mobileS: 4, mobile: 4 }}
          left={{ base: -8, mobileS: -3, mobile: 4 }}
          borderWidth={2}
          onClick={() => {
            router.replace("/");
          }}
        >
          <CloseButton size="md" />
        </Circle>
        <Center paddingTop={16}>
          <Heading fontSize={"4xl"}>
            <FormattedMessage id="DailyForm.header" />
          </Heading>
        </Center>
        {children}
      </Stack>
    </Center>
  );
};

export default DailyFormWrapper;
