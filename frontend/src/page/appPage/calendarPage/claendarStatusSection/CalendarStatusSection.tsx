import { StatusTaskDateSection } from "./statusTaskDateSection/StatusTaskDateSection";
import dayjs from "dayjs";

import "./CalendarStatusSection.css";

interface CalendarStatusSectionProp {
  isDate: Date;
}

export function CalendarStatusSection({ isDate }: CalendarStatusSectionProp) {
  return (
    <div className="container-calendar-status-section-main">
      <h1>Momentum In {dayjs(isDate).format("MM")}</h1>
      <div className="container-calendar-status-grid">
        <div>
          <StatusTaskDateSection status="today" />
          <StatusTaskDateSection status="wait" />
        </div>
        <div>
          <StatusTaskDateSection status="completed" />
          <StatusTaskDateSection status="miss" />
        </div>
      </div>
    </div>
  );
}
