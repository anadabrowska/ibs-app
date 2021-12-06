import { Center, Circle, Divider, Grid, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Calendar.module.css";
import router from "next/router";
import { useDatesFromTimeRangeQuery } from "../generated/graphql";
import {
  daysInMonth,
  isToday,
  MonthNames,
  shortWeekNames,
} from "../utils/calendarUtils";

const Calendar: React.FC = () => {
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
      if (i < start) {
        monthDays.push(<Center key={day} className={styles.monthDay}></Center>);
      } else {
        if (isToday(day, month, year)) {
          monthDays.push(
            <Center
              key={day}
              cursor="pointer"
              onClick={() => {
                router.push(`/day/${day}-${month + 1}-${year}`);
              }}
              className={styles.monthDay}
            >
              <Circle size={35} bg="teal" color="white">
                <Text as="b" fontSize="lg">
                  {day}
                </Text>
              </Circle>
            </Center>
          );
        } else {
          monthDays.push(
            <Center
              key={day}
              cursor="pointer"
              onClick={() => {
                router.push(`/day/${day}-${month + 1}-${year}`);
              }}
              className={styles.monthDay}
            >
              {dates.includes(currentDate.setHours(0, 0, 0, 0)) ? (
                <Circle size={35} bg="gray" opacity={40} color="white">
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
        <div className={styles.calendarHeader}>
          <span>{MonthNames[month]}</span>
          <span>{year}</span>
        </div>
        <div>
          <div className={styles.weekDays}>
            <Grid templateColumns="repeat(7, 1fr)" gap={5}>
              {shortWeekNames.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </Grid>
          </div>
          <div className={styles.monthDays}>
            <Grid templateColumns="repeat(7, 1fr)" gap={5}>
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
    const [{ data }] = useDatesFromTimeRangeQuery({
      variables: { before: `${year}-12-31`, after: `${year}-01-01` },
    });

    const dates = data?.formsFromTimeRange?.map((form) =>
      new Date(Number(form.createdAt)).setHours(0, 0, 0, 0)
    );

    return Array(12)
      .fill(0)
      .map((_, i) => (
        <div key={i}>
          {generateMonthlyCalendar(i, year, i === month, dates || [])}
          <Divider mt={10} mb={10} />
        </div>
      ));
  };
  return <div className={styles.calendar}>{generateYearlyCalendar(year)}</div>;
};

export default Calendar;
