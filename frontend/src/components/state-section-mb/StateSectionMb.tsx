// library
import { useState } from "react";

// main components
import { DisplayItemToDo } from "../../page/appPage/inboxPage/stateSection/displayState/displayItemToDo/DisplayItemToDo";

// components
import { NotHaveTask } from "../not-have-task/NotHaveTask";

// context api
import usePopup from "../../context/usePopup";

// api
import useTask from "../../api/task/useTask";

// type
import "./StateSectionMb.css";

interface TaskType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
}

interface StateSectionMbProp {
  taskData: TaskType[];
}

export function StateSectionMb({ taskData }: StateSectionMbProp) {
  const { isLoadingTask } = useTask();

  const [isSelectState, setIsSelectState] = useState<"todo" | "doing" | "done">(
    "todo",
  );

  const { openPopup } = usePopup();

  const [isLength, setIsLength] = useState<number>(4);

  function handleSelectState(state: "todo" | "doing" | "done") {
    setIsSelectState(state);
  }

  const filterTaskState = taskData.filter(
    (task) => task.task_status === isSelectState,
  );

  if (isSelectState === "todo") {
    filterTaskState.reverse();
  }

  function handleOpenPopup() {
    if (filterTaskState.length === 0) {
      openPopup("create");
      return;
    }
    openPopup("add-task");
  }

  const countToDo = taskData.filter(
    (task) => task.task_status === "todo",
  ).length;

  const countDoing = taskData.filter(
    (task) => task.task_status === "doing",
  ).length;

  const countDone = taskData.filter(
    (task) => task.task_status === "done",
  ).length;

  return (
    <div className="container-state-section-mb">
      <div className="header-state-section-mb">
        <h3>My Momuntum</h3>
        <button onClick={handleOpenPopup}>+ Add Task</button>
      </div>
      <div className={`state-section-mb-header ${isSelectState}`}>
        <button onClick={() => handleSelectState("todo")}>
          To Do <span>{countToDo}</span>
        </button>
        <button onClick={() => handleSelectState("doing")}>
          In Process <span>{countDoing}</span>
        </button>
        <button onClick={() => handleSelectState("done")}>
          Completed <span>{countDone}</span>
        </button>
      </div>
      <div className="container-display-todo-item-mb">
        {filterTaskState.map((task, index) => {
          if (index + 1 <= isLength)
            return <DisplayItemToDo key={task.task_id} task={task} />;
        })}

        {!isLoadingTask && filterTaskState.length === 0 && <NotHaveTask />}

        {isLoadingTask && (
          <>
            <div className="container-loading-todo-item"></div>
            <div className="container-loading-todo-item"></div>
            <div className="container-loading-todo-item"></div>
          </>
        )}
      </div>
      <div
        role="button"
        className="container-add-task"
        onClick={handleOpenPopup}
        style={{ display: isSelectState === "todo" ? "initial" : "none" }}
      >
        + Add Task
      </div>
      {filterTaskState.length > isLength && (
        <button
          className="btn-view-more-item-task-state"
          onClick={() => setIsLength(isLength + 4)}
        >
          view more
        </button>
      )}

      {filterTaskState.length <= isLength && filterTaskState.length > 4 && (
        <button
          className="btn-view-less-item-task-state"
          onClick={() => setIsLength(4)}
        >
          view less
        </button>
      )}
    </div>
  );
}
