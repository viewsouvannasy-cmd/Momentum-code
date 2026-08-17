import { useState, useEffect } from "react";
import { CalendarSelectPage } from "./calendarSelectPage/CalendarSelectPage";
import { CalendarVistual } from "./calendarVistual/CalendarVistual";
import useSideDrawerCalendar from "../context/useOpenSideDrawerCalendar";
import "./CalendarSection.css";

export function CalendarSection() {
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

  return (
    <div className="container-calendar-section-page">
      <CalendarSelectPage isDate={isDate} setIsDate={setIsDate} />

      <CalendarVistual isDate={isDate} />
    </div>
  );
}
