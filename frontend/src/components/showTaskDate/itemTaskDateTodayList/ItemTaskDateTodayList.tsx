// library
import { useState } from "react";
import dayjs from "dayjs";

// components
import { ClockIcon } from "../../icon-svg/clock-icon";
import { ButtonXDelete } from "../../button-icon/ButtonXDelete";
import { TickIcon } from "../../icon-svg/TickIcon";
import { IconEdit } from "../../icon-svg/IconEdit";
import { LoadButton } from "../../load-button/LoadButton";

// helper
import { checkIsPastDate } from "../../../page/appPage/calendarPage/util/checkDate";

//api
import useTaskDate from "../../../api/task-date/useTaskDate";

// type
import type { TaskDateType } from "../../../types/task-date-type";

// css
import "./ItemTaskTodayList.css";

interface ItemTaskTodayListProp {
  item: TaskDateType;
}

export function ItemTaskTodayList({ item }: ItemTaskTodayListProp) {
  const [isLoadingDeleteTaskDate, setIsLoadingDeleteTaskDate] = useState(false);
  const [isLoadingMarkDone, setIsLoadingMarkDone] = useState(false);

  const { deleteTaskDate, moveStatusTaskDate, getFilterByDate } = useTaskDate();

  const start = item.start_time.split(":").slice(0, 2).join(":");
  const end = item.end_time.split(":").slice(0, 2).join(":");

  const handleDeleteTaskDate = async () => {
    const date = dayjs(item.task_date).format("YYYY-MM-DD");
    setIsLoadingDeleteTaskDate(true);
    await deleteTaskDate(item.group_id, item.task_id, item.date_id);
    await getFilterByDate(date);
    setIsLoadingDeleteTaskDate(false);
  };

  const handleMarkDoneTaskDate = async () => {
    const date = dayjs(item.task_date).format("YYYY-MM-DD");
    setIsLoadingMarkDone(true);
    await moveStatusTaskDate(
      item.group_id,
      item.task_id,
      item.date_id,
      "completed",
    );
    await getFilterByDate(date);
    setIsLoadingMarkDone(false);
  };

  return (
    <div className="item-task-date-to-do">
      <div>
        <div>
          <ClockIcon />
          <span>
            {start} - {end}
          </span>
        </div>
        <div style={{ backgroundColor: item.group_color }}>
          {item.group_name}
        </div>
      </div>
      <p>{item.task_name}</p>
      <div>
        <div>
          {item.date_status === "miss" && <span className="miss">Miss</span>}
          {item.date_status === "completed" && (
            <span className="completed">Completed</span>
          )}
          {item.task_status === "done" && (
            <span className="done">
              <TickIcon />
              Done
            </span>
          )}
        </div>
        <div>
          <button
            className="btn-delete-task-date-to-do"
            onClick={handleDeleteTaskDate}
          >
            {!isLoadingDeleteTaskDate && <ButtonXDelete />}
            {isLoadingDeleteTaskDate && <LoadButton />}
          </button>
          {!checkIsPastDate(dayjs(item.task_date).format("YYYY-MM-D")) && (
            <button className="btn-edit-task-date-to-do">
              <IconEdit />
            </button>
          )}
          {item.date_status === "today" && (
            <button
              className="btn-tick-complete-task-date-to-do"
              onClick={handleMarkDoneTaskDate}
            >
              {!isLoadingMarkDone && <TickIcon />}
              {isLoadingMarkDone && <LoadButton />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
