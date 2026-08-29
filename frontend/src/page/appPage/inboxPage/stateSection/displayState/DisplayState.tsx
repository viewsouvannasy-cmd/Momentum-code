// library
import { useState } from "react";

// main components
import { DisplayItemToDo } from "./displayItemToDo/DisplayItemToDo";

// components
import { NotHaveTask } from "../../../../../components/not-have-task/NotHaveTask.tsx";

// helper function
import { getLoadingStateEl } from "../../../../../utils/loadingEl.ts";

// api
import useTask from "../../../../../api/task/useTask";
import useGropList from "../../../../../api/group-lists/useGroupList.ts";

// context api
import usePopup from "../../../../../context/usePopup.ts";

// type
import type { TaskType } from "../../../../../types/task-type.ts";

// css
import "./DisplayState.css";

interface DisplaystateProp {
  taskData: TaskType[] | [];
  state: "todo" | "doing" | "done";
}

export function DisplayState({ taskData, state }: DisplaystateProp) {
  // this state use for loading
  const loadingEl = new Array(getLoadingStateEl(state)).fill("");

  const filterState = taskData.filter((task) => task.task_status === state);
  if (state === "todo") {
    filterState.reverse();
  }

  const [isLength, setIsLength] = useState<number>(4);

  const { isLoadingTask } = useTask();
  const { groupListData } = useGropList();

  const { openPopup } = usePopup();

  function handleOpenPopup() {
    if (groupListData.length === 0) {
      openPopup("create");
      return;
    }
    openPopup("add-task");
  }

  return (
    <div className="container-todo-state">
      <div className="container-state-section-header">
        <div>
          <h4>
            {state === "todo" && "To Do"}
            {state === "doing" && "In Process"}
            {state === "done" && "Completed"}
          </h4>
          <span>
            {filterState.length} {filterState.length > 1 ? "items" : "item"}
          </span>
        </div>
      </div>
      <div className="container-todo-state-item-section">
        {!isLoadingTask &&
          filterState.map((task, index) => {
            if (index + 1 <= isLength) {
              return <DisplayItemToDo key={task.task_id} task={task} />;
            }
          })}

        {isLoadingTask &&
          loadingEl.map((item, index) => {
            return (
              <div key={index} className="container-loadnig-task">
                {item}
              </div>
            );
          })}

        {!isLoadingTask && filterState.length === 0 && <NotHaveTask />}
      </div>

      <div
        role="button"
        className="container-add-task"
        onClick={handleOpenPopup}
        style={{ display: state === "todo" ? "initial" : "none" }}
      >
        + Add Task
      </div>
      {filterState.length > isLength && (
        <button
          className="btn-view-more-item-task-state"
          onClick={() => setIsLength(isLength + 4)}
        >
          view more
        </button>
      )}

      {filterState.length <= isLength && filterState.length > 4 && (
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
