import { DropDownSelectDate } from "../../../../../../components/dropDownSelectDate/DropDownSelectDate";
import { useState } from "react";
import useMainTime from "../../../context/useMainTime";
import { ClockIcon } from "../../../../../../components/icon-svg/clock-icon";
import { calculateSpendingTime } from "../../../util/calculateTime";

import "./ItemDate.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface ItemDateProp {
  item: SelectDateType;
  isArraySelectDate: SelectDateType[];
  setIsArraySelectDate: (param: SelectDateType[]) => void;
}

export function ItemDate({
  item,
  isArraySelectDate,
  setIsArraySelectDate,
}: ItemDateProp) {
  const [isOpenSelectStartTime, setIsOpenSelectStartTime] = useState(false);
  const [isOpenSelectEndTime, setIsOpenSelectEndTime] = useState(false);

  const [isOpenInputTime, setIsOpenInputTime] = useState(false);

  const { start_time_main, end_time_main } = useMainTime();

  function handleOpenStartTime() {
    setIsOpenSelectEndTime(isOpenSelectEndTime && false);
    setIsOpenSelectStartTime(!isOpenSelectStartTime);
  }

  function handleOpenEndTime() {
    setIsOpenSelectStartTime(isOpenSelectStartTime && false);
    setIsOpenSelectEndTime(!isOpenSelectEndTime);
  }

  // this function is use to open index Time
  // and also protact time that user editing when user try
  // to make chnage main time , time in this date will not change
  function hadnleOpenInputTime() {
    setIsOpenInputTime(true);
    const newSet = isArraySelectDate.map((i) => {
      if (i.date === item.date) {
        return {
          date: i.date,
          start_time: i.start_time,
          end_time: i.end_time,
          isEdit: true,
        };
      }
      return i;
    });
    setIsArraySelectDate(newSet);
  }

  // this function is use to reset time that user
  // try to make change back equal to main time
  function handleCloseInputTime() {
    setIsOpenInputTime(false);
    const newSet = isArraySelectDate.map((i) => {
      if (i.date === item.date) {
        return {
          date: i.date,
          start_time: start_time_main,
          end_time: end_time_main,
          isEdit: false,
        };
      }
      return i;
    });
    setIsArraySelectDate(newSet);
  }

  return (
    <div className="item-set-different-date">
      <p>{item.date}</p>
      {!isOpenInputTime && (
        <button type="button" onClick={hadnleOpenInputTime}>
          different time for this day...
        </button>
      )}
      {isOpenInputTime && (
        <div className="container-input-time-diffrent">
          <div className="box-input-start-time-different">
            <div onClick={handleOpenStartTime}>
              {item.start_time}
              <ClockIcon />
            </div>
            {isOpenSelectStartTime && (
              <DropDownSelectDate
                itemDate={item}
                time={item.start_time}
                edit="specific"
                addTo="start_time"
                isArraySelectDate={isArraySelectDate}
                setIsArraySelectDate={setIsArraySelectDate}
              />
            )}
          </div>
          <p>To</p>
          <div className="box-input-start-time-different">
            <div onClick={handleOpenEndTime}>
              {item.end_time}
              <ClockIcon />
            </div>
            {isOpenSelectEndTime && (
              <DropDownSelectDate
                itemDate={item}
                time={item.end_time}
                edit="specific"
                addTo="end_time"
                isArraySelectDate={isArraySelectDate}
                setIsArraySelectDate={setIsArraySelectDate}
              />
            )}
          </div>
          <span>{calculateSpendingTime(item.start_time, item.end_time)}</span>
          <button type="button" onClick={handleCloseInputTime}>
            reset
          </button>
        </div>
      )}
    </div>
  );
}
