import useTask from "../../../../../api/task/useTask";
import useSelectTask from "../../context/useSelectTask";

import "./SideDrawerAddTaskSection.css";

interface SeletcTaskType {
  task_id: number;
  task_name: string;
  group_name: string;
  group_color: string;
}

export function SideDrawerAddTaskSection() {
  const { taskData } = useTask();

  const { taskSelected, selectTask } = useSelectTask();

  const filterTask = taskData.filter((task) => task.task_status !== "done");

  function hadnleSelectTask(taskValue: SeletcTaskType) {
    selectTask({
      task_id: taskValue.task_id,
      task_name: taskValue.task_name,
      group_name: taskValue.group_name,
      group_color: taskValue.group_color,
    });
  }

  return (
    <div className="container-select-task-to-add-date">
      <p>To Do tasks</p>
      <div>
        <input type="text" placeholder="Filter task..." />
      </div>
      <div className={`container-select-task ${taskSelected && "selected"}`}>
        {!taskSelected &&
          filterTask.map((task) => {
            return (
              <div
                key={task.task_id}
                className="task-item-not-select"
                role="button"
                onClick={() =>
                  hadnleSelectTask({
                    task_id: task.task_id,
                    task_name: task.task_name,
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
      </div>
    </div>
  );
}
