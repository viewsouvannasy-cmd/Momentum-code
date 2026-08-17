import dayjs from "dayjs";
import { getTimeUnix } from "./calculateTime";

interface SelectDateType {
  date: string;
  start_time: string | null;
  end_time: string | null;
  isEdit: boolean;
}

// this function use disable user to go back the date that
// lower then date that user create account
export function checkDateLowThenUserDate(
  dateUnix: number,
  created_at: string | undefined,
) {
  if (created_at) {
    const userCreateDate = new Date(created_at);
    if (dateUnix >= userCreateDate.getTime()) {
      return true;
    }
    return false;
  }
}

// this function is use to find current date
export function findTodayDate(cellId: string): boolean {
  const today = dayjs(new Date()).format("YYYY-MM-D");
  return new Date(cellId).getTime() === new Date(today).getTime();
}

// this function is use to create a cell id
// example is 2026-04-29
export function createCellId(isDate: Date, index: number): string {
  return `${isDate.getFullYear()}-${String(isDate.getMonth() + 1).padStart(2, "0")}-${index}`;
}

// this function is use to give a class to cell element
// for specific style
export function getClassNameCellCalendar(
  cellId: string,
  isArraySelectDate: SelectDateType[],
) {
  const today = dayjs(new Date()).format("YYYY-MM-D");
  const findDate = isArraySelectDate.find((cell) => cell.date === cellId);
  if (!findDate && getTimeUnix(today) <= getTimeUnix(cellId)) {
    return "cell-mini-calendar";
  }

  if (findDate) {
    return "cell-mini-calendar-selected";
  }

  if (new Date().getTime() > new Date(cellId).getTime()) {
    return "cell-mini-calendar-past";
  }
}

export function getClassNameCellCalendarMain(cellId: string): string {
  const today = dayjs(new Date()).format("YYYY-MM-D");
  if (getTimeUnix(today) > getTimeUnix(cellId)) {
    return "cell-calendar-past";
  }
  return "cell-calendar";
}

export function checkIsPastDate(cellId: string): boolean {
  const today = dayjs(new Date()).format("YYYY-MM-D");

  if (getTimeUnix(today) > getTimeUnix(cellId)) {
    return true;
  }

  return false;
}
