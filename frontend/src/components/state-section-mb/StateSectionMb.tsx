import { useState } from "react";
import { NotHaveTask } from "../not-have-task/NotHaveTask";
import { DisplayItemToDo } from "../../page/appPage/inboxPage/stateSection/displayState/displayItemToDo/DisplayItemToDo";
import useTask from "../../api/task/useTask";
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

  function handleSelectState(state: "todo" | "doing" | "done") {
    setIsSelectState(state);
  }

  const filterTaskState = taskData.filter(
    (task) => task.task_status === isSelectState,
  );

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
      <h3>My Momuntum</h3>
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
        {filterTaskState.map((task) => {
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
    </div>
  );
}
