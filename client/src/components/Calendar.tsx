import {
  Center,
  Circle,
  Divider,
  Grid,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import OfflineAlert from "./OfflineAlert";

const calendarYearHeight = 5250;

interface CalendarProps {
  active?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ active }) => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();
  const [years, setYears] = useState([currYear]);

  const startDate = years[0];
  const endDate = years[years.length - 1];

  const { data, loading } = useDatesFromTimeRangeQuery({
    variables: { before: `${endDate}-12-31`, after: `${startDate}-01-01` },
    fetchPolicy: "cache-and-network",
  });

  const dates = data?.formsFromTimeRange?.map(
    (form) => new Date(Number(form.createdAt)).toISOString().split("T")[0]
  );

  useEffect(() => {
    const scrollDiv = document?.getElementById("current")?.offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: "auto" });
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const handleScroll = () => {
      if (window.scrollY > 0 || loading) return;

      setYears([years[0] - 1, ...years]);
      window.scrollTo({ top: calendarYearHeight });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [years, loading, active]);

  const { colorMode } = useColorMode();

  const generateMonthlyCalendar = (
    month: number,
    year: number,
    current: boolean,
    dates: string[]
  ) => {
    const firstDay = new Date(year, month, 1);

    const start = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const monthDays = [];

    for (let i = 0; i <= daysInMonth[month] + start - 1; i++) {
      const day = i - start + 1;
      const currentDate = new Date(Date.UTC(year, month, day))
        .toISOString()
        .split("T")[0];
      const hasForm = dates.includes(currentDate);
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

  return (
    <div className={styles.calendar}>
      {loading &&
        (navigator.onLine ? (
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
          <OfflineAlert fullData={false} />
        ))}
      {years.map((year) =>
        Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              {generateMonthlyCalendar(
                i,
                year,
                i === currMonth && year === currYear,
                dates || []
              )}
              {currYear === year && i === 11 ? null : (
                <Divider mt={10} mb={10} />
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default Calendar;
