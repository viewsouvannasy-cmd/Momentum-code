// library
import { useState } from "react";
import dayjs from "dayjs";

// components
import { ZoomIcon } from "../../../../../../components/icon-svg/zoom-icon";
import { ButtonXDelete } from "../../../../../../components/button-icon/ButtonXDelete";
import { TickIcon } from "../../../../../../components/icon-svg/TickIcon";
import { LoadButton } from "../../../../../../components/load-button/LoadButton";

// api
import useTaskDate from "../../../../../../api/task-date/useTaskDate";

//type
import type { TaskDateType } from "../../../../../../types/task-date-type";

import "./ItemTaskDateStatus.css";

interface ItemTaskDateStatusProp {
  item: TaskDateType;
  status: "wait" | "today" | "miss" | "completed";
}

export function ItemTaskDateStatus({ item, status }: ItemTaskDateStatusProp) {
  const { deleteTaskDate, moveStatusTaskDate } = useTaskDate();

  const [isLoadingPostDelete, setIsLoadingPostDelete] = useState(false);
  const [isLoadingPostMarkDone, setIsLoadingPostMarkDone] = useState(false);

  const handleDeleteTaskDate = async () => {
    setIsLoadingPostDelete(true);
    await deleteTaskDate(item.group_id, item.task_id, item.date_id);
    setIsLoadingPostDelete(false);
  };

  const handleMoveStatusTaskDate = async () => {
    setIsLoadingPostMarkDone(true);
    await moveStatusTaskDate(
      item.group_id,
      item.task_id,
      item.date_id,
      "completed",
    );

    setIsLoadingPostMarkDone(false);
  };

  const start = item.start_time.split(":").slice(0, 2).join(":");
  const end = item.end_time.split(":").slice(0, 2).join(":");
  return (
    <div className="item-task-date-status">
      <div>
        <p>{item.task_name}</p>
        <div>
          <div
            style={{
              backgroundColor: item.group_color,
            }}
          >
            {item.group_name}
          </div>
          <span>
            {status !== "today" &&
              `${dayjs(item.task_date).format("YYYY-MM-DD")} ·`}{" "}
            {start} - {end}
          </span>
        </div>
      </div>
      <div>
        <div>
          {status === "wait" && (
            <>
              <button className="preview-btn-task-date">
                <ZoomIcon />
              </button>
              <button
                className="delete-btn-task-date"
                onClick={handleDeleteTaskDate}
              >
                {isLoadingPostDelete && <LoadButton />}
                {!isLoadingPostDelete && <ButtonXDelete />}
              </button>
            </>
          )}
          {status === "today" && (
            <button
              className="mark-done-btn-task-date"
              onClick={handleMoveStatusTaskDate}
            >
              {isLoadingPostMarkDone && <LoadButton />}
              {!isLoadingPostMarkDone && <TickIcon />}
            </button>
          )}
          {status === "completed" && (
            <span className="message-completed-task-date">Completed</span>
          )}
          {status === "miss" && (
            <span className="message-miss-task-date">Miss</span>
          )}
        </div>
      </div>
    </div>
  );
}
