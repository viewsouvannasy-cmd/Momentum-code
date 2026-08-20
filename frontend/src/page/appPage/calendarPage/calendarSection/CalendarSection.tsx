import { CalendarSelectPage } from "./calendarSelectPage/CalendarSelectPage";
import { CalendarVistual } from "./calendarVistual/CalendarVistual";

import "./CalendarSection.css";

interface CalendarSectionProp {
  isDate: Date;
  setIsDate: (parma: Date) => void;
}

export function CalendarSection({ isDate, setIsDate }: CalendarSectionProp) {
  return (
    <div className="container-calendar-section-page">
      <CalendarSelectPage isDate={isDate} setIsDate={setIsDate} />

      <CalendarVistual isDate={isDate} />
    </div>
  );
}
