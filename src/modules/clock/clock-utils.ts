import { getDate, getHours, getMinutes, getMonth, getSeconds, getYear } from 'date-fns';
import { DateMap } from './types';

export function createDateMap(date: Date): DateMap {
  return {
    year: getYear(date),
    // by default getMonth() is zero-indexed
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
    monthIndex: getMonth(date),
    day: getDate(date),
    hours: getHours(date),
    minutes: getMinutes(date),
    seconds: getSeconds(date),
  };
}

export function createDateObjectFromMap({
  year,
  monthIndex,
  day,
  hours,
  minutes,
  seconds,
}: DateMap): Date {
  return new Date(year, monthIndex, day, hours, minutes, seconds);
}
