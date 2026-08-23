// library
import { useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

// components
import { checkIsPastDate } from "../../../util/checkDate";
import { ItemTaskDate } from "./itemTaskDate/ItemTaskDate";

// helper function
import { findTodayDate } from "../../../util/checkDate";
import { sortByTime } from "../../../util/calculateTime";

// context apt
import useSelectDateCell from "../../../context/useSelectDateOnCalendar";
import useSideDrawerCalendar from "../../../context/useOpenSideDrawerCalendar";

// api
import useTaskDate from "../../../../../../api/task-date/useTaskDate";

// css
import "./CellItem.css";

interface CellItemProp {
  cellId: string;
  date: number;
}

export function CellItem({ cellId, date }: CellItemProp) {
  const navigate = useNavigate();

  const { selectDateCell } = useSelectDateCell();
  const { openSideDrawer } = useSideDrawerCalendar();

  const { taskDateData, moveStatusTaskDate } = useTaskDate();

  function hadnleSelectCellDate(cellId: string) {
    if (checkIsPastDate(cellId)) {
      navigate(`/app/preview/${cellId}`);
      return;
    }

    selectDateCell(cellId);
    openSideDrawer();
  }

  const isToday = findTodayDate(cellId);
  // filter date that equal to cell id
  const filterData = useMemo(() => {
    const result = taskDateData.filter(
      (item) => dayjs(item.task_date).format("YYYY-MM-D") === cellId,
    );

    return sortByTime(result);
  }, [taskDateData, cellId]);

  // this is use to change date status to today
  useEffect(() => {
    const setCurrentStatus = async () => {
      if (findTodayDate(cellId)) {
        for (const item of filterData) {
          if (
            item.date_status === "today" ||
            item.date_status === "completed"
          ) {
            continue;
          }
          await moveStatusTaskDate(
            item.group_id,
            item.task_id,
            item.date_id,
            "today",
          );
        }
      }
    };

    setCurrentStatus();
  }, [filterData, cellId, moveStatusTaskDate]);

  // this is use chnage the previous date to miss status if
  // it not get mark done
  useEffect(() => {
    const setCurrentStatus = async () => {
      const previousDate = new Date();
      previousDate.setDate(previousDate.getDate() - 1);
      if (cellId === dayjs(previousDate).format("YYYY-MM-D")) {
        for (const item of filterData) {
          if (item.date_status === "miss" || item.date_status === "completed") {
            continue;
          }
          await moveStatusTaskDate(
            item.group_id,
            item.task_id,
            item.date_id,
            "miss",
          );
        }
      }
    };

    setCurrentStatus();
  }, [cellId, filterData, moveStatusTaskDate]);

  return (
    <div
      role="button"
      onClick={() => hadnleSelectCellDate(cellId)}
      className={
        checkIsPastDate(cellId) ? "cell-calendar-past" : "cell-calendar"
      }
    >
      <div>
        <p className={`number-cell ${isToday ? "today" : ""}`}>{date}</p>

        <button type="button">
          <img src="/icon/add.png" />
        </button>
      </div>

      <div className="container-item-task-calendar">
        {filterData.map((item) => {
          return <ItemTaskDate key={item.date_id} item={item} />;
        })}
      </div>
    </div>
  );
}
