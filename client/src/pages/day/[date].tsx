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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import React from "react";
import router from "next/router";
import { useDayFormQuery, useMeQuery } from "../../generated/graphql";
import { MonthNames } from "../../utils/calendarUtils";
import { Circle, CloseButton, Spinner } from "@chakra-ui/react";
import { moodOptions, stressOptions } from "../../utils/dailyFormUtils";
import { Gender } from "../register";
import { FormattedMessage, useIntl } from "react-intl";

enum Direction {
  Prev,
  Next,
}

const DayPage: NextPage<{ date: string }> = ({ date }) => {
  //TODO make this global
  const intl = useIntl();

  const [day, month, year] = date.split("-");

  const { loading, data } = useDayFormQuery({
    variables: { date: `${year}-${month}-${day}` },
  });

  const userQuery = useMeQuery();
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

  return (
    <Center p={5}>
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
        <Center p={5}>
          <Heading>
            <Stack my={5} direction="row">
              <Box
                px={2}
                as="button"
                role="button"
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
              <Text width={[200, 260, 350]} textAlign="center">
                {day} <FormattedMessage id={MonthNames[Number(month) - 1]} />{" "}
                {year}
              </Text>
              <Box
                px={2}
                as="button"
                role="button"
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
        {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        {data?.dayForm && (
          <Stack spacing={4} px={3} pt={10}>
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
                  <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                    <FormattedMessage id="DayPage.mood" />
                  </Box>

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
                  <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                    <FormattedMessage id="DayPage.stress-level" />
                  </Box>

                  <Box>
                    <FormattedMessage id={stress?.title} />
                  </Box>
                </GridItem>
              </Grid>
              <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                <FormattedMessage id="DailyForm.notes" />
              </Box>
              <Box mt={1} borderWidth="1px" borderRadius="lg" padding={3}>
                {data?.dayForm?.notes || "No notes"}
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
                  >
                    <FormattedMessage id="DailyForm.sleep" />
                  </Box>
                </GridItem>
                <GridItem
                  colStart={2}
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                    <FormattedMessage id="DayPage.sleep-length" />
                  </Box>

                  <Box>{data?.dayForm?.sleepLenght}</Box>
                </GridItem>
                <GridItem
                  colStart={2}
                  colSpan={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                    <FormattedMessage id="DayPage.sleep-quality" />
                  </Box>

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
                    >
                      <FormattedMessage id="DailyForm.symptoms" />
                    </Box>
                  </GridItem>
                  {data?.dayForm?.symptoms?.map((symptom, index) => (
                    <GridItem colStart={2} colSpan={4} key={symptom.id}>
                      {index > 0 && <Divider />}
                      <Box my={3}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            mt={1}
                            fontWeight="bold"
                            lineHeight="tight"
                            color="teal.400"
                          >
                            <FormattedMessage id="general.name" />
                          </Box>
                          <Box>{symptom.name}</Box>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            mt={1}
                            fontWeight="bold"
                            lineHeight="tight"
                            color="teal.400"
                          >
                            <FormattedMessage id="DailyForm.intensity" />
                          </Box>
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
                    <FontAwesomeIcon icon={faRunning} color="teal" size="2x" />
                  </GridItem>
                  <GridItem colStart={2} colSpan={4}>
                    <Box
                      fontWeight="bold"
                      lineHeight="tight"
                      color="teal"
                      fontSize={25}
                    >
                      <FormattedMessage id="DayPage.activities" />
                    </Box>
                  </GridItem>
                  {data?.dayForm?.activities?.map((activity, index) => (
                    <GridItem colStart={2} colSpan={4} key={activity.id}>
                      {index > 0 && <Divider />}
                      <Box my={3}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            mt={1}
                            fontWeight="bold"
                            lineHeight="tight"
                            color="teal.400"
                          >
                            <FormattedMessage id="general.name" />
                          </Box>
                          <Box>{activity.type}</Box>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            mt={1}
                            fontWeight="bold"
                            lineHeight="tight"
                            color="teal.400"
                          >
                            <FormattedMessage id="DailyForm.duration" />
                          </Box>
                          <Box>{activity.time}</Box>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            mt={1}
                            fontWeight="bold"
                            lineHeight="tight"
                            color="teal.400"
                          >
                            <FormattedMessage id="DailyForm.mood-after" />
                          </Box>

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
                                  (option) => option.rate === activity.moodAfter
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
                  >
                    <FormattedMessage id="DayPage.stool-types" />
                  </Box>
                </GridItem>
                <GridItem colStart={2} colSpan={4}>
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
                <GridItem colSpan={3}>
                  <Box
                    mb={2}
                    fontWeight="bold"
                    lineHeight="tight"
                    color="teal"
                    fontSize={25}
                  >
                    <FormattedMessage id="DayPage.other" />
                  </Box>
                  <GridItem
                    colStart={2}
                    colSpan={4}
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
                      <FormattedMessage id="DailyForm.weight" />
                    </Box>
                    <Box>{data?.dayForm?.weight}</Box>
                  </GridItem>
                  <GridItem
                    colStart={2}
                    colSpan={4}
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
                      <FormattedMessage id="DayPage.migraine" />
                    </Box>
                    <Box>
                      {data?.dayForm?.migraine
                        ? intl.formatMessage({ id: "general.yes" })
                        : intl.formatMessage({ id: "general.no" })}
                    </Box>
                  </GridItem>
                  <GridItem
                    colStart={2}
                    colSpan={4}
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
                      <FormattedMessage id="DayPage.in-therapy" />
                    </Box>
                    <Box>
                      {data?.dayForm?.inTherapy
                        ? intl.formatMessage({ id: "general.yes" })
                        : intl.formatMessage({ id: "general.no" })}
                    </Box>
                  </GridItem>
                  <GridItem
                    colStart={2}
                    colSpan={4}
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
                      <FormattedMessage id="DayPage.pollakiuria" />
                    </Box>
                    <Box>
                      {data?.dayForm?.pollakiuria
                        ? intl.formatMessage({ id: "general.yes" })
                        : intl.formatMessage({ id: "general.no" })}
                    </Box>
                  </GridItem>
                  {UserData?.gender == (Gender.FEMALE || Gender.MALE) && (
                    <GridItem
                      colStart={2}
                      colSpan={4}
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
                        <FormattedMessage id="DayPage.menstruation" />
                      </Box>
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
        )}
      </Stack>
    </Center>
  );
};

DayPage.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default DayPage;
