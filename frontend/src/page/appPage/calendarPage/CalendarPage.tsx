import { useEffect } from "react";
import useTask from "../../../api/task/useTask.ts";
import { CalendarHeader } from "./calenderHeaderSection/CalendarHeader";
import { CalendarSection } from "./calendarSection/CalendarSection.tsx";
import { SideDrawerCalendar } from "./sideDrawerCalendar/SideDrawerCalendar.tsx";

export function CalendarPage() {
  const { getTask } = useTask();

  useEffect(() => {
    document.title = "Calendar";
    getTask();
  }, [getTask]);

  return (
    <>
      <CalendarHeader />

      <CalendarSection />

      <SideDrawerCalendar />
    </>
  );
}
