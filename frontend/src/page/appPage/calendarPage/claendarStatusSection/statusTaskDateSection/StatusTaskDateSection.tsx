// library
import { useMemo, useState } from "react";
import dayjs from "dayjs";

// mian components
import { ItemTaskDateStatus } from "./itemTaskDateStatus/ItemTaskDateStatus";

// components
import { NotHaveTask } from "../../../../../components/not-have-task/NotHaveTask";

// api
import useTaskDate from "../../../../../api/task-date/useTaskDate";

// type
import type { TaskDateType } from "../../../../../types/task-date-type";

// css
import "./StatusTaskDateSection.css";

interface StatusTaskDateSectionProp {
  status: "wait" | "completed" | "miss" | "today";
}

export function StatusTaskDateSection({ status }: StatusTaskDateSectionProp) {
  const { taskDateData, isLoadingTaskDate } = useTaskDate();

  const [isLength, setIsLength] = useState<number>(5);

  const filterStatus: TaskDateType[] = useMemo(() => {
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    if (status === "today") {
      return taskDateData
        .filter((item) => dayjs(item.task_date).format("YYYY-MM-DD") === today)
        .filter((item) => item.date_status !== "completed")
        .filter((item) => item.date_status !== "miss");
    }

    if (status === "wait") {
      return taskDateData
        .filter((item) => item.date_status === "wait")
        .filter((item) => dayjs(item.task_date).format("YYYY-MM-DD") !== today);
    }

    return taskDateData.filter((item) => item.date_status === status);
  }, [status, taskDateData]);

  return (
    <div className="container-status-task-date">
      <div>
        <p>
          {status === "today" && "Today"}
          {status === "wait" && "All Task To Do"}
          {status === "completed" && "Mark Done"}
          {status === "miss" && "Miss"}
        </p>
        <span>
          {filterStatus.length} {filterStatus.length > 1 ? "items" : "item"}
        </span>
      </div>
      <div>
        {!isLoadingTaskDate &&
          filterStatus.map((item, index) => {
            if (index + 1 <= isLength) {
              return (
                <ItemTaskDateStatus
                  key={item.date_id}
                  item={item}
                  status={status}
                />
              );
            }
          })}
        {isLoadingTaskDate && (
          <>
            <div className="loading-state-task-date"></div>
            <div className="loading-state-task-date"></div>
          </>
        )}
        {filterStatus.length === 0 && !isLoadingTaskDate && <NotHaveTask />}
      </div>
      {filterStatus.length > isLength && (
        <button
          className="btn-view-more-item-task-state"
          onClick={() => setIsLength(isLength + 5)}
        >
          view more
        </button>
      )}

      {filterStatus.length <= isLength && filterStatus.length > 4 && (
        <button
          className="btn-view-less-item-task-state"
          onClick={() => setIsLength(5)}
        >
          view less
        </button>
      )}
    </div>
  );
}
