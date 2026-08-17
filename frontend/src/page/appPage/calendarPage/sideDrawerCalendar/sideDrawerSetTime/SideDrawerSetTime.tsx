import { useState } from "react";
import { ClockIcon } from "../../../../../components/icon-svg/clock-icon";
import { DropDownSelectDate } from "../../../../../components/dropDownSelectDate/DropDownSelectDate";
import { calculateSpendingTime } from "../../util/calculateTime";
import { ItemDate } from "./itemDate/ItemDate";
import { sortDateArray } from "../../util/calculateTime";
import useMainTime from "../../context/useMainTime";

import "./SideDrawerSetTime.css";

export interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface SideDrawerSetTimeProp {
  isArraySelectDate: SelectDateType[];
  setIsArraySelectDate: (param: SelectDateType[]) => void;
}

export function SideDrawerSetTime({
  isArraySelectDate,
  setIsArraySelectDate,
}: SideDrawerSetTimeProp) {
  const [isOpenSelectStartTime, setIsOpenSelectStartTime] = useState(false);
  const [isOpenSelectEndTime, setIsOpenSelectEndTime] = useState(false);

  const [isOpenSetDifferentDate, setIsOpenSetDifferentDate] = useState(false);

  const { start_time_main, end_time_main } = useMainTime();

  function handleOpenStartTime() {
    setIsOpenSelectEndTime(isOpenSelectEndTime && false);

    setIsOpenSelectStartTime(!isOpenSelectStartTime);
  }

  function handleOpenEndTime() {
    setIsOpenSelectStartTime(isOpenSelectStartTime && false);

    setIsOpenSelectEndTime(!isOpenSelectEndTime);
  }

  const sortDate = sortDateArray(isArraySelectDate);

  return (
    <div className="container-side-drawer-set-time">
      <p>Time</p>
      <div className="container-set-time-date">
        <div className="box-input-start-time">
          <div onClick={handleOpenStartTime}>
            {start_time_main}
            <ClockIcon />
          </div>
          {isOpenSelectStartTime && (
            <DropDownSelectDate
              time={start_time_main}
              edit="main"
              addTo="start_time_main"
              isArraySelectDate={isArraySelectDate}
              setIsArraySelectDate={setIsArraySelectDate}
            />
          )}
        </div>
        <p>To</p>
        <div className="box-input-end-time">
          <div onClick={handleOpenEndTime}>
            {end_time_main}
            <ClockIcon />
          </div>
          {isOpenSelectEndTime && (
            <DropDownSelectDate
              time={end_time_main}
              edit="main"
              addTo="end_time_main"
              isArraySelectDate={isArraySelectDate}
              setIsArraySelectDate={setIsArraySelectDate}
            />
          )}
        </div>

        <div>{calculateSpendingTime(start_time_main, end_time_main)}</div>
      </div>
      {isArraySelectDate.length > 1 && !isOpenSetDifferentDate && (
        <div className="container-set-time-for-each-date">
          <span>
            Every selected date uses {start_time_main} - {end_time_main}{" "}
          </span>
          <button type="button" onClick={() => setIsOpenSetDifferentDate(true)}>
            different time on one day?
          </button>
        </div>
      )}
      {isOpenSetDifferentDate && (
        <div className="container-display-set-date-different-time">
          {sortDate.map((item) => {
            return (
              <ItemDate
                key={item.date}
                item={item}
                isArraySelectDate={isArraySelectDate}
                setIsArraySelectDate={setIsArraySelectDate}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
