import { createCellId } from "../../util/checkDate";
import { CellItem } from "./cellItem/CellItem";

import "./CalendarVistual.css";

interface CalendarVistualProp {
  isDate: Date;
}

export function CalendarVistual({ isDate }: CalendarVistualProp) {
  const firstDays = new Date(
    isDate.getFullYear(),
    isDate.getMonth(),
    1,
  ).getDay();
  const daysInMonths = new Date(
    isDate.getFullYear(),
    isDate.getMonth() + 1,
    0,
  ).getDate();

  const nextDaysCount = (7 - ((daysInMonths + firstDays) % 7)) % 7;

  return (
    <>
      <div className="container-date-of-week">
        <p>Sun</p>
        <p>Mon</p>
        <p>Tue</p>
        <p>Wet</p>
        <p>Thu</p>
        <p>Fri</p>
        <p>Sat</p>
      </div>

      <div className="container-display-date-of-calendar">
        {new Array(daysInMonths + firstDays + nextDaysCount)
          .fill(null)
          .map((_, index) => {
            const date = index + 1 - firstDays;
            const cellId = createCellId(isDate, date);
            if (index + 1 <= firstDays) {
              return (
                <div key={index} className="cell-calendar-empty-top"></div>
              );
            }
            if (date <= daysInMonths) {
              return <CellItem key={cellId} cellId={cellId} date={date} />;
            }
            return (
              <div key={index} className="cell-calendar-empty-bottom"></div>
            );
          })}
      </div>
    </>
  );
}
