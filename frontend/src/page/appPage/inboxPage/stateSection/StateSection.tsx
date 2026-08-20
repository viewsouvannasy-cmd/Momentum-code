import { DisplayState } from "./displayState/DisplayState";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useTask from "../../../../api/task/useTask.ts";
import { StateSectionMb } from "../../../../components/state-section-mb/StateSectionMb.tsx";
import usePopup from "../../../../context/usePopup.ts";
import "./StateSection.css";

export function StateSection() {
  const { groupListData } = useGropList();

  const { taskData } = useTask();

  const { openPopup } = usePopup();

  function handleOpenPopup() {
    if (groupListData.length === 0) {
      openPopup("create");
      return;
    }
    openPopup("add-task");
  }

  return (
    <>
      <div className="container-to-do-list-state">
        <div>
          <h3>My Momentum</h3>
          <div>
            <button onClick={handleOpenPopup}>+ Add task</button>
          </div>
        </div>
        <div>
          <DisplayState state="todo" taskData={taskData} />
          <DisplayState state="doing" taskData={taskData} />
          <DisplayState state="done" taskData={taskData} />
        </div>
      </div>

      {/* this component use for mobile screen */}
      <StateSectionMb taskData={taskData} />
    </>
  );
}
