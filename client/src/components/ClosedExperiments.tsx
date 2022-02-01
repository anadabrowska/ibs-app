import {
  Center,
  Stack,
  Heading,
  GridItem,
  Box,
  Grid,
  useColorMode,
} from "@chakra-ui/react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useClosedExperimentsQuery } from "../generated/graphql";
import OfflineAlert from "./OfflineAlert";

const ClosedExperiments: React.FC = () => {
  const { data } = useClosedExperimentsQuery({
    fetchPolicy: "cache-and-network",
  });
  const intl = useIntl();
  const { colorMode } = useColorMode();

  const getFormattedDate = (date: string) => {
    const dateObj = new Date(parseInt(date));
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    day < 10;
    const year = dateObj.getUTCFullYear();

    return `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;
  };

  return (
    <Center mb={20}>
      <Stack spacing={4} px={3} pt={10} width={400}>
        <Heading
          as="h1"
          mb={10}
          textAlign={"center"}
          color={colorMode === "dark" ? "white" : "black"}
        >
          <FormattedMessage id="ClosedExperiments.closed-experiments" />
        </Heading>

        {/* we want to display data in reverse order */}
        {navigator.onLine ? (
          data?.closedExperiments
            ?.slice(0)
            .reverse()
            .map((experiment) => (
              <Box
                key={experiment.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={5}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                  <GridItem>
                    {experiment.isTolerable ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        color="#38A169"
                        size="2x"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        color="#F56565"
                        size="2x"
                      />
                    )}
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box
                      as="h2"
                      fontSize={25}
                      fontWeight="bold"
                      lineHeight="tight"
                      color={experiment.isTolerable ? "green.500" : "red.400"}
                    >
                      {experiment.productName}
                    </Box>
                  </GridItem>
                </Grid>
                {experiment.isTolerable ? (
                  <Box
                    mt={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Heading
                      fontWeight="bold"
                      lineHeight="tight"
                      size="sm"
                      as="h3"
                    >
                      <FormattedMessage id="ClosedExperiments.tolerated-amount" />
                    </Heading>
                    <Box>{experiment.quantity}</Box>
                  </Box>
                ) : null}
                <Box
                  mt={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Heading
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      mr={3}
                      size="sm"
                      as="h3"
                    >
                      <FormattedMessage id="ClosedExperiments.start-date" />
                    </Heading>
                    {getFormattedDate(experiment.startDate)}
                  </Box>
                  <Box textAlign={"right"}>
                    <Heading
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      size="sm"
                      as="h3"
                      ml={3}
                    >
                      <FormattedMessage id="ClosedExperiments.end-date" />
                    </Heading>
                    {getFormattedDate(experiment.endDate || "")}
                  </Box>
                </Box>
                <Heading
                  mt={5}
                  fontWeight="bold"
                  lineHeight="tight"
                  size="sm"
                  as="h3"
                >
                  <FormattedMessage id="DailyForm.notes" />
                </Heading>
                <Box mt={1} borderWidth="1px" borderRadius="lg" padding={3}>
                  {experiment.notes ||
                    intl.formatMessage({ id: "DayPage.no-notes" })}
                </Box>
              </Box>
            ))
        ) : (
          <OfflineAlert fullData={true} />
        )}
      </Stack>
    </Center>
  );
};

export default ClosedExperiments;
