import { useState } from "react";
import { ButtonArrow } from "../../../../../../components/button-icon/ButtonArrow";
import { ButtonXDelete } from "../../../../../../components/button-icon/ButtonXDelete";
import { ButtonThreeDot } from "../../../../../../components/button-icon/ButtonThreeDot";
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

  const [isFocus, setIsFocus] = useState(false);

  function handleMoveState(toState: string) {
    moveTo(String(task.group_id), String(task.task_id), toState);
    setIsFocus(false);
  }

  function handleDeleteTesk() {
    deleteTask(String(task.group_id), String(task.task_id));
    setIsFocus(false);
  }

  return (
    <div className={`item-to-do-list ${task.task_status}`}>
      <div className={`item-task-header ${task.task_status}`}>
        <div>
          <div></div>
          <span>
            {task.task_status === "todo" && "TO DO"}
            {task.task_status === "doing" && "DOING"}
            {task.task_status === "done" && "DONE"}
          </span>
        </div>
        <div
          className="item-group-list-in-card"
          style={{ backgroundColor: task.group_color }}
        >
          {task.group_name}
        </div>
      </div>

      <p>{task.task_name}</p>
      {task.task_status === "done" && (
        <div className="container-complete-message">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Completed</span>
        </div>
      )}

      <div className="contanier-group-item-and-btn-controll">
        <div className="container-display-item-group-list"></div>
        <div className="container-control-state-todo-list">
          {task.task_status !== "done" && (
            <button
              className={`move-forward-btn`}
              onClick={() =>
                handleMoveState(task.task_status === "todo" ? "doing" : "done")
              }
            >
              <ButtonArrow />
            </button>
          )}
          <button
            className="btn-open-option-task-item"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          >
            <ButtonThreeDot />
          </button>
          <div
            className="container-option-task-item"
            style={{ display: isFocus ? "initial" : "none" }}
          >
            {task.task_status === "doing" && (
              <button
                className="move-back-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleMoveState("todo")}
              >
                <img src="/icon/arrow-white.png" />
                Move back to To Do
              </button>
            )}

            {task.task_status === "done" && (
              <button
                className="reopen-task-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleMoveState("doing")}
              >
                <img src="/icon/redo.png" />
                Redo Task
              </button>
            )}
            <button
              className="delete-task-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleDeleteTesk}
            >
              <ButtonXDelete />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
