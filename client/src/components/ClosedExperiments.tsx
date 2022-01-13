import {
  Center,
  Stack,
  Heading,
  GridItem,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";
import {
  faArrowRight,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useClosedExperimentsQuery } from "../generated/graphql";

const ClosedExperiments: React.FC = () => {
  const { loading, data } = useClosedExperimentsQuery();
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
        <Heading mb={10} textAlign={"center"}>
          <FormattedMessage id="ClosedExperiments.closed-experiments" />
        </Heading>
        {data?.closedExperiments?.map((experiment) => (
          <Box
            key={experiment.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding={5}
          >
            <Grid templateColumns="repeat(6, 1fr)" gap={2} mb={5}>
              <GridItem>
                {experiment.isTolerable ? (
                  <FontAwesomeIcon icon={faCheck} color="#38A169" size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} color="#F56565" size="2x" />
                )}
              </GridItem>
              <GridItem colSpan={4}>
                <Box
                  fontSize={25}
                  fontWeight="bold"
                  lineHeight="tight"
                  color={experiment.isTolerable ? "green.500" : "red.400"}
                >
                  {experiment.productName}
                </Box>
              </GridItem>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Box
                  mt={1}
                  fontWeight="bold"
                  lineHeight="tight"
                  color="teal.400"
                  mr={3}
                >
                  <FormattedMessage id="ClosedExperiments.start-date" />
                </Box>
                {getFormattedDate(experiment.startDate)}
              </Box>
              <Box textAlign={"right"}>
                <Box
                  mt={1}
                  fontWeight="bold"
                  lineHeight="tight"
                  color="teal.400"
                  ml={3}
                >
                  <FormattedMessage id="ClosedExperiments.end-date" />
                </Box>
                {getFormattedDate(experiment.endDate || "")}
              </Box>
            </Box>
            <Center mt={5}>
              <Button
                width={110}
                isLoading={loading}
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                colorScheme="teal"
                variant="outline"
                size="sm"
              >
                <FormattedMessage id="ClosedExperiments.details" />
              </Button>
            </Center>
          </Box>
        ))}
      </Stack>
    </Center>
  );
};

export default ClosedExperiments;
