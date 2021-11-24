export const MonthNames = [
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

export const shortWeekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const isToday = (day: number, month: number, year: number): boolean => {
  const currDate = new Date();
  const currMonth = currDate.getMonth();
  const currYear = currDate.getFullYear();
  const currDay = currDate.getDate();

  return day === currDay && month === currMonth && year === currYear;
};

const isLeapYear = (year: number) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year: number) => {
  return isLeapYear(year) ? 29 : 28;
};

export const daysInMonth = [
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
