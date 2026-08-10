import { ButtonArrow } from "../../../../../../components/button-icon/ButtonArrow";
import { ButtonXDelete } from "../../../../../../components/button-icon/ButtonXDelete";
import useTask from "../../../../../../api/task/useTask";

import "./DisplayItemToDo.css";

interface TaskType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
}

interface DisplayItemToDoProp {
  task: TaskType;
}

export function DisplayItemToDo({ task }: DisplayItemToDoProp) {
  const { moveTo, deleteTask } = useTask();

  function handleMoveState(toState: string) {
    moveTo(String(task.group_id), String(task.task_id), toState);
  }

  function handleDeleteTesk() {
    deleteTask(String(task.group_id), String(task.task_id));
  }

  return (
    <div className="item-to-do-list-main">
      <div className={`item-to-do-list ${task.task_status}`}>
        <div></div>
        <div>
          <span>
            {task.task_status === "todo" && "To Do"}
            {task.task_status === "doing" && "Doing"}
            {task.task_status === "done" && "Done"}
          </span>
          <p>{task.task_name}</p>
          <div className="container-display-item-group-list">
            <div
              className="item-group-list-in-card"
              style={{ backgroundColor: task.group_color }}
            >
              {task.group_name}
            </div>
          </div>
          <div className="container-control-state-todo-list">
            <button
              className="move-back-btn"
              onClick={() =>
                handleMoveState(task.task_status === "doing" ? "todo" : "doing")
              }
              style={{
                display: task.task_status === "todo" ? "none" : "flex",
              }}
            >
              <ButtonArrow />
            </button>
            <button
              className={`move-forward-btn ${task.task_status}`}
              onClick={() =>
                handleMoveState(task.task_status === "todo" ? "doing" : "done")
              }
              style={{
                display: task.task_status === "done" ? "none" : "flex",
              }}
            >
              <ButtonArrow />
            </button>
            <button className="delete-todo-btn" onClick={handleDeleteTesk}>
              <ButtonXDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
