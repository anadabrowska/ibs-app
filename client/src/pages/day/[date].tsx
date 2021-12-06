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
import { Circle, CloseButton, Spinner, Textarea } from "@chakra-ui/react";
import { moodOptions, stressOptions } from "../../utils/dailyFormUtils";
import { Gender } from "../register";

enum Direction {
  Prev,
  Next,
}

const DayPage: NextPage<{ date: string }> = ({ date }) => {
  //TODO make this global
  const [day, month, year] = date.split("-");

  const [{ fetching, data }] = useDayFormQuery({
    variables: { date: `${year}-${month}-${day}` },
  });

  const userQuery = useMeQuery();
  const UserData = userQuery[0].data?.me;

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
        <Heading mb={5}>
          <Stack direction="row">
            <Box
              px={2}
              cursor="pointer"
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
            <Text width={[280, 350]} textAlign="center">
              {day} {MonthNames[Number(month) - 1]} {year}
            </Text>
            <Box
              px={2}
              cursor="pointer"
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
        {fetching && (
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
                    General day rate
                  </Box>

                  <Box>{dayRate?.title}</Box>
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
                    Mood
                  </Box>

                  <Box>{mood?.title}</Box>
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
                    Stress level
                  </Box>

                  <Box>{stress?.title}</Box>
                </GridItem>
              </Grid>
              <Box mt={1} fontWeight="bold" lineHeight="tight" color="teal">
                Notes
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
                    Sleep
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
                    Sleep length
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
                    Sleep quality
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
                      Symptoms
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
                            Name
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
                            Intensity
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
                      Activities
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
                            Name
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
                            Duration
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
                            Mood after
                          </Box>

                          <Box display="flex" mt="2" alignItems="center">
                            <Box px={2}>
                              {
                                moodOptions.find(
                                  (option) => option.rate === activity.moodAfter
                                )?.title
                              }
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
                    Stool types
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
                    Other
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
                      Weight
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
                      Migraine
                    </Box>
                    <Box>{data?.dayForm?.migraine ? "Yes" : "No"}</Box>
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
                      In thereapy
                    </Box>
                    <Box>{data?.dayForm?.inTherapy ? "Yes" : "No"}</Box>
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
                      Pollakuria
                    </Box>
                    <Box>{data?.dayForm?.pollakiuria ? "Yes" : "No"}</Box>
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
                        Menstruation
                      </Box>
                      <Box>{data?.dayForm?.menstruation ? "Yes" : "No"}</Box>{" "}
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
