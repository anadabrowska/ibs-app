import {
  Box,
  Button,
  Center,
  Circle,
  CloseButton,
  Divider,
  Heading,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import router from "next/router";
import { FormattedMessage } from "react-intl";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useExperimentFormsQuery,
  useExperimentQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import FinishExperimentForm from "../../components/FinishExperimentForm";

const ExperimentDetails: NextPage<{ id: string }> = ({ id }) => {
  Chart.register(CategoryScale);

  const closeExperiment = useDisclosure();

  const experimentData = useExperimentQuery({
    variables: { id: parseInt(id) },
  }).data;

  const { loading, data } = useExperimentFormsQuery({
    variables: { id: parseInt(id) },
  });
  const [labels, setLabels] = useState<string[]>([]);
  const [chartValues, setChartValues] = useState<(number | undefined)[]>([]);
  const [quantities, setQuantities] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const tempLabels: string[] = [];
    const tempValues: (number | undefined)[] = [];
    const tempQuantities: (string | undefined)[] = [];
    Array(8)
      .fill(0)
      .map((_, i) => {
        var date = new Date();
        date.setDate(date.getDate() - (7 - i));
        var start = new Date(date);
        var end = new Date(date);
        start.setUTCHours(0, 0, 0, 0);
        end.setUTCHours(23, 59, 59, 999);
        const dayData = data?.experimentForms?.find(
          (form) =>
            start.getTime() <= parseInt(form.createdAt) &&
            parseInt(form.createdAt) <= end.getTime()
        );
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        tempLabels.push(
          `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`
        );
        tempValues.push(dayData?.generalSensation);
        tempQuantities.push(dayData?.quantity);
      });
    setLabels(tempLabels);
    setChartValues(tempValues);
    setQuantities(tempQuantities);
  }, [data]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "General Sensation",
        data: chartValues,
        borderColor: "#319795",
        backgroundColor: "#B2F5EA",
        fill: true,
      },
    ],
  };
  return (
    <Center
      transformOrigin="top"
      transform={{
        base: "scale(.95)",
        mobile: "scale(1)",
      }}
    >
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
        <Center py={12}>
          <Stack m={2}>
            <Heading textAlign={"center"}>
              <FormattedMessage id="ExperimentDetails.experiment-details" />
            </Heading>
            <Heading textAlign={"center"} size="xl">
              {experimentData?.experiment?.productName}
            </Heading>
          </Stack>
        </Center>
        {loading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <Stack spacing={4} px={3}>
            <Heading textAlign={"center"} size={"md"}>
              {" "}
              <FormattedMessage id="ExperimentDetails.last-week-data" />
            </Heading>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding={5}
            >
              <Box
                fontSize={25}
                mb={5}
                fontWeight="bold"
                lineHeight="tight"
                color="teal"
              >
                <FormattedMessage id="ExperimentDetails.general-sensation" />
              </Box>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: false,
                    },
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    yAxes: {
                      display: true,
                      min: 0,
                      max: 6,
                    },
                  },
                }}
              />
            </Box>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding={5}
            >
              <Box
                fontSize={25}
                mb={3}
                fontWeight="bold"
                lineHeight="tight"
                color="teal"
              >
                <FormattedMessage id="ExperimentDetails.quantity" />
              </Box>
              {labels.map((label, index) => (
                <Box key={label}>
                  {index > 0 && <Divider my={1} />}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      color="teal"
                    >
                      {label}
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      {quantities[index] ? quantities[index] : "-"}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              onClick={closeExperiment.onOpen}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              <FormattedMessage id="ExperimentDetails.finish-experiment" />
            </Button>
          </Stack>
        )}
        <FinishExperimentForm
          isOpen={closeExperiment.isOpen}
          onClose={closeExperiment.onClose}
          experimentData={experimentData}
        />
      </Stack>
    </Center>
  );
};

ExperimentDetails.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default ExperimentDetails;
