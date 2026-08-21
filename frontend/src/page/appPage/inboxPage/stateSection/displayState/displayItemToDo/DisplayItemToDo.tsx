import { useState } from "react";
import { useNavigate } from "react-router";
import { ButtonXDelete } from "../../../../../../components/button-icon/ButtonXDelete";
import { ButtonThreeDot } from "../../../../../../components/button-icon/ButtonThreeDot";
import { LoadButton } from "../../../../../../components/load-button/LoadButton";
import useTask from "../../../../../../api/task/useTask";
import useTaskDate from "../../../../../../api/task-date/useTaskDate";
import useSideDrawerCalendar from "../../../../calendarPage/context/useOpenSideDrawerCalendar";
import useSelectTask from "../../../../calendarPage/context/useSelectTask";

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

  const navigate = useNavigate();

  const [isFocus, setIsFocus] = useState(false);

  const [isLoadingPostDelete, setIsLoadingPostDelete] = useState(false);
  const [isLoadingPostMoveBack, setIsLoadingPostMoveBack] = useState(false);
  const [isLoadingPostSubmit, setIsLoadingPostSubmit] = useState(false);

  const { openSideDrawer } = useSideDrawerCalendar();
  const { selectTask } = useSelectTask();

  const { deleteAllTaskDate, deleteRemainderStatus } = useTaskDate();

  function handleMoveState(toState: string) {
    moveTo(task.group_id, task.task_id, toState);
    setIsFocus(false);
  }

  function handleLetDoTask() {
    navigate("/app/calendar");
    openSideDrawer();
    selectTask(task);
  }

  // delete task and also delete all task date
  const handleDeleteTesk = async () => {
    setIsLoadingPostDelete(true);
    await deleteAllTaskDate(task.group_id, task.task_id);
    await deleteTask(task.group_id, task.task_id);
    setIsFocus(false);
    setIsLoadingPostDelete(false);
  };

  const handleMoveBackToToDo = async () => {
    setIsLoadingPostMoveBack(true);
    await deleteAllTaskDate(task.group_id, task.task_id);
    await moveTo(task.group_id, task.task_id, "todo");
    setIsFocus(false);
    setIsLoadingPostMoveBack(false);
  };

  const handleSubmitTask = async () => {
    setIsLoadingPostSubmit(true);
    await deleteRemainderStatus(task.group_id, task.task_id, "wait");
    await moveTo(task.group_id, task.task_id, "done");
    setIsLoadingPostSubmit(false);
  };

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
              className="move-forward-btn"
              onClick={
                task.task_status === "todo"
                  ? () => handleLetDoTask()
                  : () => handleSubmitTask()
              }
            >
              {task.task_status === "todo" && "do"}
              {task.task_status === "doing" && !isLoadingPostSubmit && "submit"}
              {task.task_status === "doing" && isLoadingPostSubmit && (
                <LoadButton />
              )}
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
                onClick={() => handleMoveBackToToDo()}
              >
                {!isLoadingPostMoveBack && <img src="/icon/arrow-white.png" />}
                {isLoadingPostMoveBack && <LoadButton />}
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
              {!isLoadingPostDelete && <ButtonXDelete />}
              {isLoadingPostDelete && <LoadButton />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
