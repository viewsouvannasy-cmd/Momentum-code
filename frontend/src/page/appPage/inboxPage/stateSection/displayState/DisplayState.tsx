import { DisplayItemToDo } from "./displayItemToDo/DisplayItemToDo";
import { getLoadingStateEl } from "../../../../../utils/loadingEl.ts";
import { NotHaveTask } from "../../../../../components/not-have-task/NotHaveTask.tsx";
import useTask from "../../../../../api/task/useTask";
import useGropList from "../../../../../api/group-lists/useGroupList.ts";

import "./DisplayState.css";

interface TaskType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
}

interface DisplaystateProp {
  taskData: TaskType[] | [];
  state: "todo" | "doing" | "done";
  setIsAnimation: (param: string) => void;
  setIsOpenPopup: (param: string) => void;
}

export function DisplayState({
  taskData,
  state,
  setIsAnimation,
  setIsOpenPopup,
}: DisplaystateProp) {
  // this state use for loading
  const loadingEl = new Array(getLoadingStateEl(state)).fill("");

  const filterState = taskData.filter((task) => task.task_status === state);

  const { isLoadingTask } = useTask();
  const { groupListData } = useGropList();

  function handleOpenPopup() {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    if (groupListData.length === 0) {
      setIsOpenPopup("create");
      return;
    }
    setIsOpenPopup("add-task");
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
          filterState.map((task) => {
            return <DisplayItemToDo key={task.task_id} task={task} />;
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
    </div>
  );
}
