import { DisplayState } from "../../inboxPage/stateSection/displayState/DisplayState";
import useTask from "../../../../api/task/useTask";
import "./GroupStateSection.css";

interface GroupStateSectionProp {
  groupId: string | undefined;
  setIsOpenPopup: (param: string) => void;
  setIsAnimation: (param: string) => void;
}

export function GroupStateSection({
  groupId,
  setIsAnimation,
  setIsOpenPopup,
}: GroupStateSectionProp) {
  const { taskData } = useTask();

  const filterTask = taskData.filter(
    (task) => task.group_id === Number(groupId),
  );
  return (
    <div className="container-group-list-state-section">
      <div>
        <div>
          <p>My Momentum</p>
          <span>In learing group</span>
        </div>
        <div>
          <button>+ Add New</button>
        </div>
      </div>
      <div>
        <DisplayState
          state="todo"
          taskData={filterTask}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
        <DisplayState
          state="doing"
          taskData={filterTask}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
        <DisplayState
          state="done"
          taskData={filterTask}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
      </div>
    </div>
  );
}
