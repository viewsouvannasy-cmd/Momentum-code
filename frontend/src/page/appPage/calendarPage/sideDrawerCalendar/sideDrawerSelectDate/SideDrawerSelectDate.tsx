import { useState } from "react";
import { ButtonArrow } from "../../../../../components/button-icon/ButtonArrow";
import { ButtonDoubleArrow } from "../../../../../components/button-icon/ButtonDoubleArrow";
import { createCellId } from "../../util/checkDate.ts";
import { getClassNameCellCalendar } from "../../util/checkDate.ts";
import useMainTime from "../../context/useMainTime.ts";
import dayjs from "dayjs";

import "./SideDrawerSelectDate.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface SideDrawerSelectDateProp {
  isArraySelectDate: SelectDateType[];
  setIsArraySelectDate: (param: SelectDateType[]) => void;
}

export function SideDrawerSelectDate({
  isArraySelectDate,
  setIsArraySelectDate,
}: SideDrawerSelectDateProp) {
  const [isDate, setIsDate] = useState(new Date());
  const { start_time_main, end_time_main } = useMainTime();

  const today = dayjs(new Date()).format("YYYY-MM-D");

  // m mean month & y mean year
  function handleNextPage(range: "m" | "y") {
    const next = new Date(isDate);
    if (range === "m") {
      next.setMonth(next.getMonth() + 1);
    } else {
      next.setFullYear(next.getFullYear() + 1);
    }
    setIsDate(next);
  }

  function handleBackPage(range: "m" | "y") {
    if (isDate.getTime() < new Date().getTime()) {
      return;
    }
    const next = new Date(isDate);
    if (range === "m") {
      next.setMonth(next.getMonth() - 1);
    } else {
      next.setFullYear(next.getFullYear() - 1);
    }

    setIsDate(next);
  }

  function handleSelectDate(cellId: string) {
    const findDate = isArraySelectDate.find((cell) => cell.date === cellId);
    if (!findDate) {
      const newArray = [
        ...isArraySelectDate,
        {
          date: cellId,
          start_time: start_time_main,
          end_time: end_time_main,
          isEdit: false,
        },
      ];
      setIsArraySelectDate(newArray);
    } else {
      if (isArraySelectDate.length === 1) {
        return;
      }
      setIsArraySelectDate(
        isArraySelectDate.filter((cell) => cell.date !== cellId),
      );
    }
  }

  // this function is use to add today to array select date
  function handleAddtTodayDate() {
    const findDate = isArraySelectDate.find((cell) => cell.date === today);
    if (findDate) {
      return;
    }

    const newArray = [
      ...isArraySelectDate,
      {
        date: today,
        start_time: start_time_main,
        end_time: end_time_main,
        isEdit: false,
      },
    ];
    setIsArraySelectDate(newArray);
  }

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

  return (
    <div className="container-select-date-for-task">
      <div className="container-select-date-fot-task-header">
        <p>{isArraySelectDate.length > 1 ? "Dates" : "Date"}</p>
        <span>
          {isArraySelectDate.length}{" "}
          {isArraySelectDate.length > 1 ? "dates" : "date"} selected
        </span>
      </div>
      <div className="container-mini-vistual-calendar">
        <div className="mini-vistual-calendar-header">
          <button type="button" onClick={() => handleBackPage("y")}>
            <ButtonDoubleArrow />
          </button>
          <button type="button" onClick={() => handleBackPage("m")}>
            <ButtonArrow />
          </button>
          <p>
            {dayjs(isDate).format("MMMM")}
            <span>{dayjs(isDate).format("YYYY")}</span>
          </p>
          <button type="button" onClick={() => handleNextPage("m")}>
            <ButtonArrow />
          </button>
          <button type="button" onClick={() => handleNextPage("y")}>
            <ButtonDoubleArrow />
          </button>
        </div>
        <div className="container-display-day-of-week-mini-calendar">
          <p>SU</p>
          <p>MO</p>
          <p>TU</p>
          <p>WE</p>
          <p>TH</p>
          <p>FR</p>
          <p>SA</p>
        </div>
        <div className="container-display-cell-mini-calendar">
          {new Array(daysInMonths + firstDays).fill(null).map((cell, index) => {
            const date = index + 1 - firstDays;
            const cellId = createCellId(isDate, date);
            if (index + 1 <= firstDays) {
              return <div key={index}>{cell}</div>;
            }
            return (
              <div
                key={cellId}
                className={getClassNameCellCalendar(cellId, isArraySelectDate)}
                role="button"
                onClick={() => handleSelectDate(cellId)}
                style={{
                  display: date > daysInMonths ? "none" : "initial",
                }}
              >
                {date}
              </div>
            );
          })}
        </div>
        <div className="mini-vistual-calendar-footer">
          <button type="button" onClick={handleAddtTodayDate}>
            Today
          </button>
          <span>Click a day to add it &#183; again to remove</span>
        </div>
      </div>
    </div>
  );
}
