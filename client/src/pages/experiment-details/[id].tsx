import { Center, Circle, CloseButton, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import router from "next/router";
import { FormattedMessage } from "react-intl";

const ExperimentDetails: NextPage<{ id: string }> = ({ id }) => {
  return (
    <Center>
      <Stack>
        <Circle
          position="absolute"
          top={[3, 5]}
          left={[3, 5]}
          borderWidth={2}
          onClick={() => {
            router.replace({
              pathname: "/",
              query: {
                tabName: "open-experiments",
              },
            });
          }}
        >
          <CloseButton size="md" />
        </Circle>
        <Center py={10}>
          <Heading textAlign={"center"}>
            <FormattedMessage id="ExperimentDetails.experiment-details" />
          </Heading>
        </Center>
      </Stack>
    </Center>
  );
};

ExperimentDetails.getInitialProps = ({ query }) => {
  return {
    id: query.date as string,
  };
};

export default ExperimentDetails;
