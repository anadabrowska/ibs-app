import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/layout";
import {
  faBed,
  faBriefcaseMedical,
  faChevronLeft,
  faChevronRight,
  faInfo,
  faRunning,
  faToiletPaper,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import React from "react";
import router from "next/router";
import { useDayFormQuery, useMeQuery } from "../../generated/graphql";
import { MonthNames } from "../../utils/calendarUtils";
import {
  Alert,
  AlertIcon,
  Circle,
  CloseButton,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import {
  generalSensationOptions,
  moodOptions,
  stressOptions,
} from "../../utils/dailyFormUtils";
import { Gender } from "../register";
import { FormattedMessage, useIntl } from "react-intl";
import OfflineAlert from "../../components/OfflineAlert";
import { Helmet } from "react-helmet";

enum Direction {
  Prev,
  Next,
}

const DayPage: NextPage<{ date: string }> = ({ date }) => {
  const intl = useIntl();
  const { colorMode } = useColorMode();

  const [day, month, year] = date.split("-");

  const { loading, data } = useDayFormQuery({
    variables: { date: `${year}-${month}-${day}` },
    fetchPolicy: "cache-and-network",
  });

  const userQuery = useMeQuery({
    fetchPolicy: "cache-and-network",
  });
  const UserData = userQuery.data?.me;

  const getDifferentDayPath = (
    day: number,
    month: number,
    year: number,
    direction: Direction
  ) => {
    const dateObj = new Date(year, month, day);
    direction === Direction.Prev
      ? dateObj.setDate(dateObj.getDate() - 1)
      : dateObj.setDate(dateObj.getDate() + 1);
    const newDay = dateObj.getDate();
    const newMonth = dateObj.getMonth();
    const newYear = dateObj.getFullYear();
    // months in Date are from 0 to 11
    return `${newDay}-${newMonth + 1}-${newYear}`;
  };

  const dayRate = moodOptions.find(
    (option) => option.rate === data?.dayForm?.dayRate
  );

  const stress = stressOptions.find(
    (option) => option.rate === data?.dayForm?.stressLevel
  );

  const mood = moodOptions.find(
    (option) => option.rate === data?.dayForm?.mood
  );

  const haveSymptoms =
    data?.dayForm?.symptoms && data.dayForm.symptoms.length > 0;

  const haveActivities =
    data?.dayForm?.activities && data.dayForm.activities.length > 0;

  const haveExperiments =
    data?.dayForm?.experiments && data.dayForm.experiments.length > 0;

  return (
    <>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "general.day-page",
          })}
        </title>
      </Helmet>
      <Center>
        <Stack>
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
          <Center mx={16} pt={16}>
            <Heading
              color={colorMode === "dark" ? "white" : "black"}
              as="h1"
              aria-label="date"
            >
              <Stack direction="row">
                <Box
                  px={1}
                  as="button"
                  role="button"
                  aria-label="arrow left"
                  onClick={() => {
                    const newDate = getDifferentDayPath(
                      Number(day),
                      Number(month) - 1,
                      Number(year),
                      Direction.Prev
                    );
                    router.push(`/day/${newDate}`);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Box>
                <Text width={[200, 260, 300]} textAlign="center">
                  {day} <FormattedMessage id={MonthNames[Number(month) - 1]} />{" "}
                  {year}
                </Text>
                <Box
                  px={1}
                  as="button"
                  role="button"
                  aria-label="arrow right"
                  onClick={() => {
                    const newDate = getDifferentDayPath(
                      Number(day),
                      Number(month) - 1,
                      Number(year),
                      Direction.Next
                    );
                    router.push(`/day/${newDate}`);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Box>
              </Stack>
            </Heading>
          </Center>
          {loading && !data && (
            <>
              {navigator.onLine ? (
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
                <OfflineAlert fullData={true} />
              )}
            </>
          )}
          {data?.dayForm ? (
            <Stack spacing={4} px={3} py={10}>
              {(data?.dayForm?.id || 0) < 0 && !navigator.onLine && (
                <Alert status="info">
                  <AlertIcon />
                  <FormattedMessage id="DayPage.offline-message" />
                </Alert>
              )}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={5}
              >
                <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                  <GridItem mb={5}>
                    <FontAwesomeIcon
                      icon={dayRate?.icon || "coffee"}
                      color="teal"
                      size="3x"
                    />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box
                      fontWeight="bold"
                      fontSize={25}
                      lineHeight="tight"
                      color="teal"
                      as="h2"
                    >
                      <FormattedMessage id="DayPage.general-day-rate" />
                    </Box>

                    <Box>
                      <FormattedMessage id={dayRate?.title} />
                    </Box>
                  </GridItem>
                  <GridItem>
                    <FontAwesomeIcon
                      icon={mood?.icon || "coffee"}
                      color="teal"
                      size="2x"
                    />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Heading
                      as="h3"
                      mt={1}
                      size="sm"
                      fontWeight="bold"
                      lineHeight="tight"
                    >
                      <FormattedMessage id="DayPage.mood" />
                    </Heading>

                    <Box>
                      <FormattedMessage id={mood?.title} />
                    </Box>
                  </GridItem>
                  <GridItem>
                    <FontAwesomeIcon
                      icon={stress?.icon || "coffee"}
                      color="teal"
                      size="2x"
                    />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Heading
                      as="h3"
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      size="sm"
                    >
                      <FormattedMessage id="DayPage.stress-level" />
                    </Heading>

                    <Box>
                      <FormattedMessage id={stress?.title} />
                    </Box>
                  </GridItem>
                </Grid>
                <Heading
                  mt={1}
                  fontWeight="bold"
                  lineHeight="tight"
                  size="sm"
                  as="h3"
                >
                  <FormattedMessage id="DailyForm.notes" />
                </Heading>
                <Box mt={1} borderWidth="1px" borderRadius="lg" padding={3}>
                  {data?.dayForm?.notes ||
                    intl.formatMessage({ id: "DayPage.no-notes" })}
                </Box>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={5}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                  <GridItem>
                    <FontAwesomeIcon icon={faBed} color="teal" size="2x" />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box
                      fontSize={25}
                      fontWeight="bold"
                      lineHeight="tight"
                      color="teal"
                      as="h2"
                    >
                      <FormattedMessage id="DailyForm.sleep" />
                    </Box>
                  </GridItem>
                  <GridItem
                    colStart={1}
                    colSpan={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Heading
                      as="h3"
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      size="sm"
                    >
                      <FormattedMessage id="DayPage.sleep-length" />
                    </Heading>

                    <Box>{data?.dayForm?.sleepLenght}</Box>
                  </GridItem>
                  <GridItem
                    colStart={1}
                    colSpan={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Heading
                      as="h3"
                      mt={1}
                      fontWeight="bold"
                      lineHeight="tight"
                      size="sm"
                    >
                      <FormattedMessage id="DayPage.sleep-quality" />
                    </Heading>

                    <Box display="flex" mt="2" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={
                              i < (data?.dayForm?.sleepQuality || 0)
                                ? "teal.500"
                                : "gray.300"
                            }
                          />
                        ))}
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
              {haveSymptoms && (
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding={5}
                >
                  <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                    <GridItem>
                      <FontAwesomeIcon
                        icon={faBriefcaseMedical}
                        color="teal"
                        size="2x"
                      />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Box
                        fontSize={25}
                        fontWeight="bold"
                        lineHeight="tight"
                        color="teal"
                        as="h2"
                      >
                        <FormattedMessage id="DailyForm.symptoms" />
                      </Box>
                    </GridItem>
                    {data?.dayForm?.symptoms?.map((symptom, index) => (
                      <GridItem colStart={1} colSpan={6} key={symptom.id}>
                        {index > 0 && <Divider />}
                        <Box my={3}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="sm"
                            >
                              <FormattedMessage id="general.name" />
                            </Heading>
                            <Box>{symptom.name}</Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="sm"
                            >
                              <FormattedMessage id="DailyForm.intensity" />
                            </Heading>
                            <Box display="flex" mt="2" alignItems="center">
                              {Array(5)
                                .fill("")
                                .map((_, i) => (
                                  <Circle
                                    key={i}
                                    size={4}
                                    margin={0.45}
                                    bg={
                                      i < (symptom.intensity || 0)
                                        ? "teal.500"
                                        : "gray.300"
                                    }
                                  />
                                ))}
                            </Box>
                          </Box>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              )}
              {haveActivities && (
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding={5}
                >
                  <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                    <GridItem>
                      <FontAwesomeIcon
                        icon={faRunning}
                        color="teal"
                        size="2x"
                      />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Box
                        fontWeight="bold"
                        lineHeight="tight"
                        color="teal"
                        as="h2"
                        fontSize={25}
                      >
                        <FormattedMessage id="DayPage.activities" />
                      </Box>
                    </GridItem>
                    {data?.dayForm?.activities?.map((activity, index) => (
                      <GridItem colStart={1} colSpan={6} key={activity.id}>
                        {index > 0 && <Divider />}
                        <Box my={3}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              size="sm"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                            >
                              <FormattedMessage id="general.name" />
                            </Heading>
                            <Box>{activity.type}</Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="sm"
                            >
                              <FormattedMessage id="DailyForm.duration" />
                            </Heading>
                            <Box>{activity.time}</Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="sm"
                            >
                              <FormattedMessage id="DailyForm.mood-after" />
                            </Heading>

                            <Box display="flex" mt="2" alignItems="center">
                              <Box px={2}>
                                <FormattedMessage
                                  id={
                                    moodOptions.find(
                                      (option) =>
                                        option.rate === activity.moodAfter
                                    )?.title
                                  }
                                />
                              </Box>
                              <FontAwesomeIcon
                                icon={
                                  moodOptions.find(
                                    (option) =>
                                      option.rate === activity.moodAfter
                                  )?.icon || "coffee"
                                }
                                color="teal"
                                size="2x"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              )}
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                  <GridItem>
                    <FontAwesomeIcon
                      icon={faToiletPaper}
                      color="teal"
                      size="2x"
                    />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box
                      fontSize={25}
                      fontWeight="bold"
                      lineHeight="tight"
                      color="teal"
                      as="h2"
                    >
                      <FormattedMessage id="DayPage.stool-types" />
                    </Box>
                  </GridItem>
                  <GridItem colStart={1} colSpan={6}>
                    <Box display="flex" mt="2" alignItems="center">
                      {data?.dayForm?.stoolTypes?.map((type) => (
                        <Circle
                          marginX={1}
                          key={type}
                          borderWidth={3}
                          borderColor="teal"
                          padding={2}
                        >
                          <Box fontWeight="bold" lineHeight="tight">
                            {type}
                          </Box>
                        </Circle>
                      ))}
                    </Box>
                  </GridItem>
                </Grid>
              </Box>

              {haveExperiments && (
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding={5}
                >
                  <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                    <GridItem>
                      <FontAwesomeIcon
                        icon={faUtensils}
                        color="teal"
                        size="2x"
                      />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Box
                        fontSize={25}
                        fontWeight="bold"
                        lineHeight="tight"
                        color="teal"
                        as="h2"
                      >
                        <FormattedMessage id="DayPage.experiemnts" />
                      </Box>
                    </GridItem>
                    {data?.dayForm?.experiments?.map((experiment, index) => (
                      <GridItem
                        colStart={1}
                        colSpan={6}
                        key={experiment.experimentId}
                      >
                        {index > 0 && <Divider />}
                        <Box my={3}>
                          <Text textAlign={"center"} fontSize="lg" my={3}>
                            {experiment.productName}
                          </Text>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="md"
                            >
                              <FormattedMessage id="DayPage.quantity" />
                            </Heading>
                            <Box>{experiment.quantity}</Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              as="h3"
                              mt={1}
                              fontWeight="bold"
                              lineHeight="tight"
                              size="sm"
                            >
                              <FormattedMessage id="DayPage.general-sensation" />
                            </Heading>

                            <Box display="flex" mt="2" alignItems="center">
                              <Box px={2}>
                                <FormattedMessage
                                  id={
                                    generalSensationOptions.find(
                                      (option) =>
                                        option.rate ===
                                        experiment.generalSensation
                                    )?.title
                                  }
                                />
                              </Box>
                              <FontAwesomeIcon
                                icon={
                                  generalSensationOptions.find(
                                    (option) =>
                                      option.rate ===
                                      experiment.generalSensation
                                  )?.icon || "coffee"
                                }
                                color="teal"
                                size="2x"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              )}

              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={5}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                  <GridItem>
                    <FontAwesomeIcon icon={faInfo} color="teal" size="2x" />
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box
                      mb={2}
                      fontWeight="bold"
                      lineHeight="tight"
                      color="teal"
                      as="h2"
                      fontSize={25}
                    >
                      <FormattedMessage id="DayPage.other" />
                    </Box>
                    <GridItem
                      colStart={1}
                      colSpan={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading
                        as="h3"
                        mt={1}
                        fontWeight="bold"
                        lineHeight="tight"
                        size="sm"
                      >
                        <FormattedMessage id="DailyForm.weight" />
                      </Heading>
                      <Box>{data?.dayForm?.weight}</Box>
                    </GridItem>
                    <GridItem
                      colStart={1}
                      colSpan={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading
                        as="h3"
                        mt={1}
                        fontWeight="bold"
                        lineHeight="tight"
                        size="sm"
                      >
                        <FormattedMessage id="DayPage.migraine" />
                      </Heading>
                      <Box>
                        {data?.dayForm?.migraine
                          ? intl.formatMessage({ id: "general.yes" })
                          : intl.formatMessage({ id: "general.no" })}
                      </Box>
                    </GridItem>
                    <GridItem
                      colStart={1}
                      colSpan={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading
                        as="h3"
                        mt={1}
                        fontWeight="bold"
                        lineHeight="tight"
                        size="sm"
                      >
                        <FormattedMessage id="DayPage.in-therapy" />
                      </Heading>
                      <Box>
                        {data?.dayForm?.inTherapy
                          ? intl.formatMessage({ id: "general.yes" })
                          : intl.formatMessage({ id: "general.no" })}
                      </Box>
                    </GridItem>
                    <GridItem
                      colStart={1}
                      colSpan={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading
                        as="h3"
                        mt={1}
                        fontWeight="bold"
                        lineHeight="tight"
                        size="sm"
                      >
                        <FormattedMessage id="DayPage.pollakiuria" />
                      </Heading>
                      <Box>
                        {data?.dayForm?.pollakiuria
                          ? intl.formatMessage({ id: "general.yes" })
                          : intl.formatMessage({ id: "general.no" })}
                      </Box>
                    </GridItem>
                    {UserData?.gender == (Gender.FEMALE || Gender.MALE) && (
                      <GridItem
                        colStart={1}
                        colSpan={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Heading
                          as="h3"
                          mt={1}
                          fontWeight="bold"
                          lineHeight="tight"
                          size="sm"
                        >
                          <FormattedMessage id="DayPage.menstruation" />
                        </Heading>
                        <Box>
                          {data?.dayForm?.menstruation
                            ? intl.formatMessage({ id: "general.yes" })
                            : intl.formatMessage({ id: "general.no" })}
                        </Box>{" "}
                      </GridItem>
                    )}
                  </GridItem>
                </Grid>
              </Box>
            </Stack>
          ) : (
            data &&
            data.dayForm === null && (
              <Heading py={10} as="h2" size="lg" textAlign={"center"}>
                <FormattedMessage id="DayPage.no-data" />
              </Heading>
            )
          )}
        </Stack>
      </Center>
    </>
  );
};

DayPage.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default DayPage;
