import { useState } from "react";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useTask from "../../../../api/task/useTask.ts";
import usePopup from "../../../../context/usePopup.ts";

import "./PopupAddTask.css";

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

export function PopupAddTask() {
  // this state data
  const { groupListData } = useGropList();
  const { taskData, addTask, isLoadingPost } = useTask();

  // this state use to controll error
  const [isNotSelectGroup, setIsNotSelectGroup] = useState(false);

  const [inputNameTask, setInputNameTask] = useState("");

  const { closePopup, isOpenPopup, isAnimation } = usePopup();

  const [isOpenSelectGroup, setIsOpenSelectGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState<GroupList | null>(null);

  function handleClosePopup() {
    closePopup();
    setInputNameTask("");
  }

  function handleSelectGroupList(
    group_id: number,
    group_name: string,
    group_color: string,
  ) {
    setSelectGroup({
      group_id,
      group_name,
      group_color,
    });
    setIsOpenSelectGroup(false);
    setIsNotSelectGroup(false);
  }

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectGroup) {
      setIsNotSelectGroup(true);
      return;
    }
    await addTask(selectGroup?.group_id, inputNameTask);
    handleClosePopup();
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "add-task" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleAddTask}
        className={`container-popup-add-task ${isAnimation}`}
      >
        <div>
          <h2>Add new task to do</h2>
          <button type="button" onClick={handleClosePopup}>
            <CloseXButton />
          </button>
        </div>
        <div>
          <label>To Do</label>
          <input
            type="text"
            minLength={5}
            maxLength={300}
            placeholder="My new tast to do is...."
            onChange={(e) => setInputNameTask(e.target.value)}
            value={inputNameTask}
            required
          />
        </div>
        <div>
          <div>
            <label>Select Group</label>
            <span>{groupListData.length} Group</span>
          </div>
          {!selectGroup ? (
            <div
              role="button"
              className={`container-display-box-group-list ${isNotSelectGroup && "error"}`}
              onClick={() => setIsOpenSelectGroup(true)}
            >
              {groupListData.map((group) => {
                return (
                  <div
                    key={group.group_id}
                    style={{ backgroundColor: group.group_color }}
                  ></div>
                );
              })}
            </div>
          ) : (
            <div
              className="selected-group-list"
              role="button"
              onClick={() => setIsOpenSelectGroup(true)}
            >
              <div style={{ backgroundColor: selectGroup.group_color }}>
                {selectGroup.group_name}
              </div>
            </div>
          )}
          {/* this message error when user not select group list */}
          <p
            className="error-message-not-select-gropu-list"
            style={{ display: isNotSelectGroup ? "initial" : "none" }}
          >
            Please select on group list
          </p>

          {/* this container will appear when user click on select container */}
          <div
            className="container-display-select-group-list"
            style={{
              height: groupListData.length < 5 ? "unset" : "230px",
              display: isOpenSelectGroup ? "initial" : "none",
            }}
          >
            <div>
              {groupListData.map((group) => {
                const countTask = taskData.filter(
                  (g) => g.group_id === group.group_id,
                ).length;
                return (
                  <div
                    key={group.group_id}
                    role="button"
                    onClick={() =>
                      handleSelectGroupList(
                        group.group_id,
                        group.group_name,
                        group.group_color,
                      )
                    }
                    className="item-group-list-select"
                  >
                    <div style={{ backgroundColor: group.group_color }}>
                      {group.group_name}
                    </div>
                    <span>{countTask} task</span>
                  </div>
                );
              })}
            </div>
            {groupListData.length > 5 && (
              <div className="shadow-bottom-select-group-list"></div>
            )}
          </div>
          {/* --------------- */}
        </div>
        <button
          type="submit"
          className={isLoadingPost ? "add-task-btn-load" : "add-task-btn"}
          disabled={isLoadingPost}
        >
          {isLoadingPost ? <LoadButton /> : "+ Add"}
        </button>
      </form>
    </div>
  );
}
