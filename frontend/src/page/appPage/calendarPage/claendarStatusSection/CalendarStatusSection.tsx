import dayjs from "dayjs";
import { ItemTaskDateStatus } from "./itemTaskDateStatus/ItemTaskDateStatus";
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
          <div>
            <p>Today</p>
            <div>
              <ItemTaskDateStatus status="today" />
            </div>
          </div>
          <div>All Task To Do</div>
        </div>
        <div>
          <div>Mark Done</div>
          <div>Missing</div>
        </div>
      </div>
    </div>
  );
}
