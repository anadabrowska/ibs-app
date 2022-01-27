import { Stack, Circle, CloseButton, Heading, Center } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";

const DailyFormWrapper: React.FC = ({ children }) => {
  const intl = useIntl();
  return (
    <Center
      transformOrigin="top"
      transform={{
        base: "scale(.9)",
        mobileS: "scale(.95)",
        mobile: "scale(1)",
      }}
    >
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "general.daily-form",
          })}
        </title>
      </Helmet>
      <Stack mb={10}>
        <Circle
          position="absolute"
          top={{ base: 3, mobileS: 4, mobile: 4 }}
          left={{ base: -2, mobileS: 1, mobile: 4 }}
          borderWidth={2}
          onClick={() => {
            router.replace("/");
          }}
        >
          <CloseButton size="md" />
        </Circle>
        <Center pt={16}>
          <Heading as="h1" fontSize={"4xl"}>
            <FormattedMessage id="DailyForm.header" />
          </Heading>
        </Center>
        {children}
      </Stack>
    </Center>
  );
};

export default DailyFormWrapper;
