import { useState } from "react";
import useTask from "../../../../../api/task/useTask";
import useSelectTask from "../../context/useSelectTask";

import "./SideDrawerAddTaskSection.css";

interface SeletcTaskType {
  task_id: number;
  task_name: string;
  task_status: string;
  group_id: number;
  group_name: string;
  group_color: string;
}

export function SideDrawerAddTaskSection() {
  const { taskData } = useTask();

  const [inputQuery, setInputQuery] = useState("");

  const { taskSelected, selectTask } = useSelectTask();

  function hadnleSelectTask(taskValue: SeletcTaskType) {
    selectTask({
      task_id: taskValue.task_id,
      task_name: taskValue.task_name,
      task_status: taskValue.task_status,
      group_id: taskValue.group_id,
      group_name: taskValue.group_name,
      group_color: taskValue.group_color,
    });
  }

  const searchResult = taskData
    .filter((task) => task.task_status !== "done")
    .filter((task) =>
      task.task_name
        .trim()
        .toLowerCase()
        .includes(inputQuery.trim().toLowerCase()),
    )
    .map((task) => ({
      task_id: task.task_id,
      task_name: task.task_name,
      task_status: task.task_status,
      group_id: task.group_id,
      group_name: task.group_name,
      group_color: task.group_color,
    }));

  return (
    <div className="container-select-task-to-add-date">
      <p>To Do tasks</p>
      <div>
        {!taskSelected && (
          <input
            type="text"
            placeholder="Filter task..."
            onChange={(e) => setInputQuery(e.target.value)}
            value={inputQuery}
          />
        )}
      </div>
      <div
        className={`container-select-task ${taskSelected ? "selected" : ""}${searchResult.length === 0 ? "not-matchs" : ""}`}
      >
        {!taskSelected &&
          searchResult?.map((task) => {
            return (
              <div
                key={task.task_id}
                className="task-item-not-select"
                role="button"
                onClick={() =>
                  hadnleSelectTask({
                    task_id: task.task_id,
                    task_name: task.task_name,
                    task_status: task.task_status,
                    group_id: task.group_id,
                    group_name: task.group_name,
                    group_color: task.group_color,
                  })
                }
              >
                <div style={{ backgroundColor: task.group_color }}>
                  {task.group_name}
                </div>
                <p>{task.task_name}</p>
              </div>
            );
          })}
        {taskSelected && (
          <div
            className="item-task-selected"
            role="button"
            onClick={() => selectTask(null)}
          >
            <div style={{ backgroundColor: taskSelected.group_color }}>
              {taskSelected.group_name}
            </div>
            <p>{taskSelected.task_name}</p>
          </div>
        )}
        {searchResult.length === 0 && <p>No tasks matchs "{inputQuery}"</p>}
      </div>
    </div>
  );
}
