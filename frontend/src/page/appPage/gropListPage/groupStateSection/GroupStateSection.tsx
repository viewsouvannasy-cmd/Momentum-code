import { DisplayState } from "../../inboxPage/stateSection/displayState/DisplayState";
import { StateSectionMb } from "../../../../components/state-section-mb/StateSectionMb";
import useTask from "../../../../api/task/useTask";
import usePopup from "../../../../context/usePopup";
import "./GroupStateSection.css";

interface GroupStateSectionProp {
  groupId: string | undefined;
}

export function GroupStateSection({ groupId }: GroupStateSectionProp) {
  const { taskData } = useTask();

  const { openPopup } = usePopup();

  const filterTask = taskData.filter(
    (task) => task.group_id === Number(groupId),
  );

  function handleAddTask() {
    if (filterTask.length === 0) {
      openPopup("create");
      return;
    }
    openPopup("add-task");
  }

  return (
    <>
      <div className="container-group-list-state-section">
        <div>
          <div>
            <p>My Momentum</p>
            <span>In learing group</span>
          </div>
          <div>
            <button onClick={() => handleAddTask()}>+ Add New</button>
          </div>
        </div>
        <div>
          <DisplayState state="todo" taskData={filterTask} />
          <DisplayState state="doing" taskData={filterTask} />
          <DisplayState state="done" taskData={filterTask} />
        </div>
      </div>

      <StateSectionMb taskData={filterTask} />
    </>
  );
}
