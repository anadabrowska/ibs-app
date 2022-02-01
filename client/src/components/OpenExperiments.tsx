import {
  Center,
  Stack,
  Heading,
  Box,
  Grid,
  GridItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { faArrowRight, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  useOpenExperimentsQuery,
  useStartExperimentMutation,
} from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import FormInput from "./FormInput";
import OfflineAlert from "./OfflineAlert";

const OpenExperiments: React.FC = () => {
  const { loading, data, refetch } = useOpenExperimentsQuery({
    fetchPolicy: "cache-and-network",
  });
  const [startExperiment] = useStartExperimentMutation();
  const [screenWidth, setScreenWidth] = useState(1024);

  const newExperiment = useDisclosure();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

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
          <FormattedMessage id="OpenExperiments.open-experiments" />
        </Heading>
        {navigator.onLine ? null : <OfflineAlert fullData={false} />}
        {data?.openExperiments?.map((experiment) => (
          <Box
            key={experiment.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding={5}
          >
            <Grid templateColumns="repeat(6, 1fr)" gap={2} mb={5}>
              <GridItem>
                <FontAwesomeIcon icon={faUtensils} color="teal" size="2x" />
              </GridItem>
              <GridItem colSpan={4}>
                <Box
                  fontSize={25}
                  fontWeight="bold"
                  lineHeight="tight"
                  color="teal"
                  as="h2"
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
                <Heading
                  as="h3"
                  mt={1}
                  fontWeight="bold"
                  lineHeight="tight"
                  size="sm"
                >
                  <FormattedMessage id="OpenExperiments.start-date" />
                </Heading>
                {getFormattedDate(experiment.startDate)}
              </Box>
              <Button
                width={110}
                isLoading={loading && navigator.onLine}
                disabled={!navigator.onLine}
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/experiment-details/${experiment.id}`);
                }}
              >
                <FormattedMessage id="OpenExperiments.details" />
              </Button>
            </Box>
          </Box>
        ))}
        <Button
          isLoading={loading && navigator.onLine}
          disabled={!navigator.onLine}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          data-testid="new-experiment-button"
          colorScheme="teal"
          variant="outline"
          size="sm"
          onClick={newExperiment.onOpen}
        >
          <FormattedMessage id="OpenExperiments.new-experiment" />
        </Button>
        <Drawer
          size={screenWidth > 425 ? "md" : "full"}
          isOpen={newExperiment.isOpen}
          placement="right"
          onClose={newExperiment.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton data-testid="close-button" />
            <DrawerHeader>
              <FormattedMessage id="OpenExperiments.new-experiment" />
            </DrawerHeader>
            <Formik
              initialValues={{ productName: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await startExperiment({
                  variables: { input: values },
                });
                if (response.data?.startExperiment.errors) {
                  setErrors(
                    mapErrors(response.data.startExperiment.errors, intl)
                  );
                } else if (response.data?.startExperiment.experiment) {
                  newExperiment.onClose();
                  refetch();
                }
              }}
            >
              {(props) => (
                <DrawerBody>
                  <Form>
                    <FormInput
                      name="productName"
                      label={intl.formatMessage({
                        id: "ExperimentDetails.product-name",
                      })}
                      placeholder={intl.formatMessage({
                        id: "ExperimentDetails.product-name-placeholder",
                      })}
                    />
                    <Button
                      mt={4}
                      data-testid="submit-button"
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      <FormattedMessage id="general.submit" />
                    </Button>
                  </Form>
                </DrawerBody>
              )}
            </Formik>
          </DrawerContent>
        </Drawer>
      </Stack>
    </Center>
  );
};

export default OpenExperiments;
