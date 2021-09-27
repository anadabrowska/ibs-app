import { Center, Divider, Grid } from "@chakra-ui/react";
import React from "react";
import styles from "./Calendar.module.css";

interface CalendarProps {}

const Calendar: React.FC = () => {
  const isLeapYear = (year: number) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year: number) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const shortWeekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInMonth = [
    31,
    getFebDays(2021),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const generateMonthlyCalendar = (
    month: number,
    year: number,
    current: boolean
  ) => {
    const firstDay = new Date(year, month, 1);

    const start = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const monthDays = [];

    for (let i = 0; i <= daysInMonth[month] + start - 1; i++) {
      if (i < start) {
        monthDays.push(<Center className={styles.monthDay}></Center>);
      } else {
        monthDays.push(
          <Center className={styles.monthDay}>{i - start + 1}</Center>
        );
      }
    }

    return (
      <div id={current ? "current" : undefined}>
        <div className={styles.calendarHeader}>
          <span>{MonthNames[month]}</span>
          <span>{year}</span>
        </div>
        <div className={styles.calendarBody}>
          <div className={styles.weekDays}>
            <Grid templateColumns="repeat(7, 1fr)" gap={5}>
              {shortWeekNames.map((day) => (
                <div>{day}</div>
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

  const generateYearlyCalendar = (year: number) =>
    Array(12)
      .fill(0)
      .map((_, i) => (
        <>
          {generateMonthlyCalendar(i, year, i === month)}
          <Divider mt={10} mb={10} />
        </>
      ));
  return <div className={styles.calendar}>{generateYearlyCalendar(year)}</div>;
};

export default Calendar;
