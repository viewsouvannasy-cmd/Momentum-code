import { useState } from "react";
import { ZoomIcon } from "../../../../../../../components/icon-svg/zoom-icon";
import { ButtonXDelete } from "../../../../../../../components/button-icon/ButtonXDelete";
import { reduceRgbaOpacity } from "../../../../../../../utils/rgbaFormart";
import { LoadButton } from "../../../../../../../components/load-button/LoadButton";
import { TickIcon } from "../../../../../../../components/icon-svg/TickIcon";
import useTaskDate from "../../../../../../../api/task-date/useTaskDate";
import { getToday } from "../../../../util/getDate";
import { MissIconStatus } from "../../../../../../../components/icon-svg/missIconStatus/MissIconStatus";
import { TickIconStatus } from "../../../../../../../components/icon-svg/tickIconStatus/TickIconStatus";
import dayjs from "dayjs";

import type { TaskDateType } from "../../../../../../../types/task-date-type";

import "./ItemTaskDate.css";

interface ItemTaskDateProp {
  item: TaskDateType;
}

export function ItemTaskDate({ item }: ItemTaskDateProp) {
  const { deleteTaskDate, moveStatusTaskDate } = useTaskDate();

  const start = item.start_time.split(":").slice(0, 2).join(":");
  const end = item.end_time.split(":").slice(0, 2).join(":");
  const [isFocus, setIsFocus] = useState("close");

  const [isLoadingPostDelete, setIsLoadingPostDelete] = useState(false);
  const [isLoadingPostMarkDone, setIsLoadingPostMarkDone] = useState(false);

  const handleDeleteTaskDate = async (
    group_id: number,
    task_id: number,
    date_id: number,
  ) => {
    setIsLoadingPostDelete(true);
    await deleteTaskDate(group_id, task_id, date_id);
    setIsLoadingPostDelete(false);
  };

  const handleMoveStatusTaskDate = async (
    group_id: number,
    task_id: number,
    date_id: number,
    toStatus: string,
  ) => {
    setIsLoadingPostMarkDone(true);
    await moveStatusTaskDate(group_id, task_id, date_id, toStatus);
    setIsLoadingPostMarkDone(false);
    setIsFocus("close");
  };

  return (
    <div
      tabIndex={0}
      className="item-task-date-cell-outer"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsFocus(isFocus === "open" ? "close" : "open");
      }}
      onBlur={() => setIsFocus("close")}
    >
      <div
        className="item-task-date-cell"
        style={{
          backgroundColor: reduceRgbaOpacity(item.group_color, "0.5"),
        }}
      >
        <div style={{ backgroundColor: item.group_color }}></div>
        <div>
          <p>{item.task_name}</p>
          <span>
            {start} - {end}
          </span>
        </div>
      </div>

      {/* drop down option */}
      <div className={`container-option-task-date-item-cell ${isFocus}`}>
        {dayjs(item.task_date).format("YYYY-MM-DD") === getToday() && (
          <button
            className="btn-mark-done-drop-down-task-date"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleMoveStatusTaskDate(
                item.group_id,
                item.task_id,
                item.date_id,
                "completed",
              );
            }}
          >
            {isLoadingPostMarkDone && <LoadButton />}
            {!isLoadingPostMarkDone && <TickIcon />}
            Mark Done
          </button>
        )}
        <button
          className="btn-preview-drop-down-task-date"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ZoomIcon />
          Preview
        </button>
        <button
          className="btn-delete-drop-down-task-date"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();

            handleDeleteTaskDate(item.group_id, item.task_id, item.date_id);
          }}
        >
          {!isLoadingPostDelete && <ButtonXDelete />}
          {isLoadingPostDelete && <LoadButton />}
          Delete
        </button>
      </div>

      {/* icon above the task date */}
      {item.date_status === "wait" ? (
        ""
      ) : (
        <div className="container-show-status-of-task-date-cell">
          {item.date_status === "miss" && <MissIconStatus />}

          {item.date_status === "completed" && <TickIconStatus />}

          {item.task_status === "done" && (
            <div className="status-task-done">Done</div>
          )}
        </div>
      )}
    </div>
  );
}
