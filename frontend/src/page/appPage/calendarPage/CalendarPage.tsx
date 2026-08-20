import { useEffect, useState } from "react";
import useTask from "../../../api/task/useTask.ts";
import { CalendarHeader } from "./calenderHeaderSection/CalendarHeader";
import { CalendarSection } from "./calendarSection/CalendarSection.tsx";
import { SideDrawerCalendar } from "./sideDrawerCalendar/SideDrawerCalendar.tsx";
import { CalendarStatusSection } from "./claendarStatusSection/CalendarStatusSection.tsx";
import useSideDrawerCalendar from "./context/useOpenSideDrawerCalendar.ts";
import useTaskDate from "../../../api/task-date/useTaskDate.ts";

export function CalendarPage() {
  const { getTask } = useTask();
  const { getFilterMonthYear } = useTaskDate();

  const [isDate, setIsDate] = useState(new Date());

  const { isOpenSideDrawer } = useSideDrawerCalendar();

  useEffect(() => {
    if (isOpenSideDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  });

  useEffect(() => {
    document.title = "Calendar";
    getTask();
    getFilterMonthYear(
      String(isDate.getMonth() + 1),
      String(isDate.getFullYear()),
    );
  }, [getTask, getFilterMonthYear, isDate]);

  return (
    <>
      <CalendarHeader />

      <CalendarSection isDate={isDate} setIsDate={setIsDate} />

      <CalendarStatusSection isDate={isDate} />

      <SideDrawerCalendar />
    </>
  );
}
