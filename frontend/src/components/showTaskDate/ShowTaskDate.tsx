// library
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { useEffect } from "react";

//components
import { ButtonArrow } from "../button-icon/ButtonArrow";
import { BtnOpenNavBarMB } from "../button-open-navber-mp/BtnOpenNavBarMB";
import { ItemTaskTodayList } from "./itemTaskDateTodayList/ItemTaskDateTodayList";
import { NotHaveTask } from "../not-have-task/NotHaveTask";
import { PopupChangeTime } from "../popup/popupTaskDate/popup-change-time/PopupChangeTime";

// helper function
import { findTodayDate } from "../../page/appPage/calendarPage/util/checkDate";
import { sortByTime } from "../../page/appPage/calendarPage/util/calculateTime";

// api
import useTaskDate from "../../api/task-date/useTaskDate";

// type
import type { TaskDateType } from "../../types/task-date-type";

// css
import "./ShowTaskDate.css";

interface ShowTaskDateProp {
  page: "today-list" | "preview";
  data: TaskDateType[];
  date: string;
}

export function ShowTaskDate({ page, data, date }: ShowTaskDateProp) {
  const navigate = useNavigate();

  const { isLoadingTaskDate, moveStatusTaskDate } = useTaskDate();

  function handleMoveDate(move: "back" | "forward") {
    let newDate: string | Date = new Date(date);
    if (move === "back") {
      newDate = dayjs(newDate.setDate(newDate.getDate() - 1)).format(
        "YYYY-MM-DD",
      );
      if (findTodayDate(newDate)) {
        navigate("/app/today-lists");
        return;
      }
      navigate(`/app/preview/${newDate}`);
      return;
    }

    newDate = dayjs(newDate.setDate(newDate.getDate() + 1)).format(
      "YYYY-MM-DD",
    );
    if (findTodayDate(newDate)) {
      navigate("/app/today-lists");
      return;
    }
    navigate(`/app/preview/${newDate}`);
  }

  const sortData = sortByTime(data);

  useEffect(() => {
    const setCurrentStatusTaskDate = async () => {
      data.forEach(async (item) => {
        if (item.date_status === "today" && findTodayDate(item.task_date)) {
          await moveStatusTaskDate(
            item.group_id,
            item.task_id,
            item.date_id,
            "miss",
          );
        }
      });
    };
    setCurrentStatusTaskDate();
  }, [data, moveStatusTaskDate]);

  return (
    <>
      <div className="container-today-list-page-main">
        <div className="container-today-list-page">
          <div>
            <div>
              <div className="container-title-today-list">
                <BtnOpenNavBarMB />
                <div>
                  <h1>
                    {page === "today-list" && "Today Lists"}
                    {page === "preview" && "Preview"}
                  </h1>
                  <span>My Day {date}</span>
                </div>
              </div>

              <div className="contanier-change-date-preview">
                <button onClick={() => handleMoveDate("back")}>
                  <ButtonArrow />
                </button>
                <span>{date}</span>
                <button onClick={() => handleMoveDate("forward")}>
                  <ButtonArrow />
                </button>
              </div>
            </div>
            <div>
              <span>
                {data.length === 0
                  ? "You not have task in this date"
                  : "  Let start with the first task"}
              </span>
              <span>
                {data.length} {data.length > 1 ? "tasks" : "task"}
              </span>
            </div>
          </div>

          <div className="container-display-task-in-date">
            {!isLoadingTaskDate &&
              sortData.map((item) => {
                return <ItemTaskTodayList key={item.date_id} item={item} />;
              })}
            {data.length === 0 && !isLoadingTaskDate && <NotHaveTask />}
            {isLoadingTaskDate && (
              <>
                <div className="loading-element"></div>
                <div className="loading-element"></div>
                <div className="loading-element"></div>
              </>
            )}
          </div>
          <p>
            when pass this day the task will be miss if it not get mark done
          </p>
        </div>
      </div>

      <PopupChangeTime page="t-p" />
    </>
  );
}
