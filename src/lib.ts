import { floorDivMod, floorMod, toUTC } from "./util.ts";

export interface DateDiff {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function dateDiff(start: Date, end: Date): DateDiff {
  const diffMilliseconds = toUTC(end) - toUTC(start);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diffDays = diffMilliseconds / millisecondsPerDay;
  const [years, yearsRem] = floorDivMod(diffDays, 365);
  const [months, monthsRem] = floorDivMod(yearsRem, 30);
  const [days, daysRem] = floorMod(monthsRem);
  const [hours, hoursRem] = floorMod(daysRem * 24);
  const [minutes, minutesRem] = floorMod(hoursRem * 60);
  const [seconds, secondsRem] = floorMod(minutesRem * 60);
  const [milliseconds] = floorMod(secondsRem * 1000);
  return { years, months, days, hours, minutes, seconds, milliseconds };
}
