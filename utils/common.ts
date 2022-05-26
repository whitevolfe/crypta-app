import TimeAgo, { FormatStyleName } from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export const timeAgoFormat = (date: Date, round?: FormatStyleName) => {
  return timeAgo.format(date, round);
};

export const dollarFormatter = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(value);

  return formatter;
};
