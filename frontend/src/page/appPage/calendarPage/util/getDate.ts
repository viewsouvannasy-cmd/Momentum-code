import dayjs from "dayjs";

export function getToday() {
  return dayjs(new Date()).format("YYYY-MM-DD");
}
