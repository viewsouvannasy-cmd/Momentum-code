import { DisplayState } from "./displayState/DisplayState";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useTask from "../../../../api/task/useTask.ts";
import "./StateSection.css";

interface StateSectionProp {
  setIsAnimation: (param: string) => void;
  setIsOpenPopup: (param: string) => void;
}

export function StateSection({
  setIsAnimation,
  setIsOpenPopup,
}: StateSectionProp) {
  const { groupListData } = useGropList();

  const { taskData } = useTask();

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
    <div className="container-to-do-list-state">
      <div>
        <h3>My Momentum</h3>
        <div>
          <button onClick={handleOpenPopup}>+ Add task</button>
        </div>
      </div>
      <div>
        <DisplayState
          state="todo"
          taskData={taskData}
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
        />
        <DisplayState
          state="doing"
          taskData={taskData}
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
        />
        <DisplayState
          state="done"
          taskData={taskData}
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
        />
      </div>
    </div>
  );
}
