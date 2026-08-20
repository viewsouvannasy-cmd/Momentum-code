import { useState } from "react";
import { ZoomIcon } from "../../../../../../../components/icon-svg/zoom-icon";
import { ButtonXDelete } from "../../../../../../../components/button-icon/ButtonXDelete";
import { reduceRgbaOpacity } from "../../../../../../../utils/rgbaFormart";
import { LoadButton } from "../../../../../../../components/load-button/LoadButton";
import useTaskDate from "../../../../../../../api/task-date/useTaskDate";

import type { TaskDateType } from "../../../../../../../api/task-date/useTaskDate";

import "./ItemTaskDate.css";

interface ItemTaskDateProp {
  item: TaskDateType;
}

export function ItemTaskDate({ item }: ItemTaskDateProp) {
  const { getFilterMonthYear, deleteTaskDate } = useTaskDate();

  const start = item.start_time.split(":").slice(0, 2).join(":");
  const end = item.end_time.split(":").slice(0, 2).join(":");
  const [isFocus, setIsFocus] = useState("close");

  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const handleDeleteTaskDate = async (
    group_id: number,
    task_id: number,
    date_id: number,
  ) => {
    setIsLoadingPost(true);
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1);
    await deleteTaskDate(group_id, task_id, date_id);
    await getFilterMonthYear(month, year);
    setIsLoadingPost(false);
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
      <div className={`container-option-task-date-item-cell ${isFocus}`}>
        <button
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
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTaskDate(item.group_id, item.task_id, item.date_id);
          }}
        >
          {!isLoadingPost && <ButtonXDelete />}
          {isLoadingPost && <LoadButton />}
          Delete
        </button>
      </div>
    </div>
  );
}
