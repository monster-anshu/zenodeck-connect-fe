import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";
export function getFormattedTimeDifference(date: Date): string {
  const now = new Date();
  const minutesAgo = differenceInMinutes(now, date);
  const hoursAgo = differenceInHours(now, date);
  const daysAgo = differenceInDays(now, date);
  const weeksAgo = differenceInWeeks(now, date);
  const monthsAgo = differenceInMonths(now, date);
  const yearsAgo = differenceInYears(now, date);

  if (minutesAgo < 60) {
    return `${minutesAgo} min ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo < 7) {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (weeksAgo < 4) {
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}
