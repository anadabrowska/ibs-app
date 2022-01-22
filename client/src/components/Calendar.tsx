import {
  Center,
  Circle,
  Divider,
  Grid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import styles from "./Calendar.module.css";
import router from "next/router";
import { useDatesFromTimeRangeQuery } from "../generated/graphql";
import {
  daysInMonth,
  isToday,
  MonthNames,
  shortWeekNames,
} from "../utils/calendarUtils";
import { FormattedMessage } from "react-intl";

const Calendar: React.FC = () => {
  useEffect(() => {
    var scrollDiv = document?.getElementById("current")?.offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: "auto" });
  }, []);

  const { colorMode } = useColorMode();

  const generateMonthlyCalendar = (
    month: number,
    year: number,
    current: boolean,
    dates: number[]
  ) => {
    const firstDay = new Date(year, month, 1);

    const start = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const monthDays = [];

    for (let i = 0; i <= daysInMonth[month] + start - 1; i++) {
      const day = i - start + 1;
      const currentDate = new Date(`${year}-${month + 1}-${day}`);
      const hasForm = dates.includes(currentDate.setHours(0, 0, 0, 0));
      if (i < start) {
        monthDays.push(<Center key={day} className={styles.monthDay}></Center>);
      } else {
        if (isToday(day, month, year)) {
          monthDays.push(
            <Center
              key={day}
              as="button"
              role="button"
              aria-label={`${day} current day`}
              onClick={() => {
                router.push(`/day/${day}-${month + 1}-${year}`);
              }}
              className={styles.monthDay}
            >
              <Circle size={{ base: 31, mobile: 35 }} bg="teal" color="white">
                <Text fontSize="lg">{day}</Text>
              </Circle>
            </Center>
          );
        } else {
          monthDays.push(
            <Center
              key={day}
              as="button"
              role="button"
              aria-label={
                hasForm ? `${day} day with form` : `${day} day without form`
              }
              onClick={() => {
                router.push(`/day/${day}-${month + 1}-${year}`);
              }}
              className={styles.monthDay}
            >
              {hasForm ? (
                <Circle
                  size={{ base: 31, mobile: 35 }}
                  bg={colorMode === "dark" ? "gray.600" : "gray.200"}
                  opacity={40}
                  color={colorMode === "dark" ? "white" : "black"}
                >
                  {day}
                </Circle>
              ) : (
                day
              )}
            </Center>
          );
        }
      }
    }

    return (
      <div id={current ? "current" : undefined}>
        <h1 className={styles.calendarHeader}>
          <span>
            <FormattedMessage id={MonthNames[month]} />
          </span>
          <span>{year}</span>
        </h1>
        <div>
          <div role="group" className={styles.weekDays}>
            <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 3, mobile: 5 }}>
              {shortWeekNames.map((day) => (
                <div key={day}>
                  <FormattedMessage id={day} />
                </div>
              ))}
            </Grid>
          </div>
          <div className={styles.monthDays}>
            <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 3, mobile: 5 }}>
              {monthDays}
            </Grid>
          </div>
        </div>
      </div>
    );
  };

  const currDate = new Date();
  const month = currDate.getMonth();
  const year = currDate.getFullYear();

  const generateYearlyCalendar = (year: number) => {
    const { data } = useDatesFromTimeRangeQuery({
      variables: { before: `${year}-12-31`, after: `${year}-01-01` },
      fetchPolicy: "cache-first",
    });

    const dates = data?.formsFromTimeRange?.map((form) =>
      new Date(Number(form.createdAt)).setHours(0, 0, 0, 0)
    );

    return Array(12)
      .fill(0)
      .map((_, i) => (
        <div key={i}>
          {generateMonthlyCalendar(i, year, i === month, dates || [])}
          {i < 11 ? <Divider mt={10} mb={10} /> : null}
        </div>
      ));
  };
  return <div className={styles.calendar}>{generateYearlyCalendar(year)}</div>;
};

export default Calendar;
