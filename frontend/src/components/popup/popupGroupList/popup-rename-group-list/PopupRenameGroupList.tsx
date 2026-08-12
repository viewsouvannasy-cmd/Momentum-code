import { useState } from "react";
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useGetData from "../../../../api/todo-data/useGetData.ts";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import "./PopupRenameGroupList.css";

interface PopupRenameGroupListProp {
  groupId: number | undefined;
  isOpenPopup: string | null;
  isAnimation: string;
  setIsOpenPopup: (param: string | null) => void;
  setIsAnimation: (param: string) => void;
}

export function PopupRenameGroupList({
  groupId,
  isOpenPopup,
  isAnimation,
  setIsOpenPopup,
  setIsAnimation,
}: PopupRenameGroupListProp) {
  const { renameGroup, isLoadingPost } = useGropList();

  const { getDataTodo } = useGetData();

  const [inputName, setInputName] = useState("");

  function handleClosePopupRename() {
    setIsAnimation("close");
    setTimeout(() => {
      setIsOpenPopup(null);
    }, 200);
  }

  const handleRenameGroupList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupId) {
      await renameGroup(inputName, groupId);
      await getDataTodo();
      handleClosePopupRename();
      setInputName("");
    }
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleRenameGroupList}
        className={`container-popup-rename-group-list ${isAnimation}`}
      >
        <div>
          <h2>Get a new name</h2>
          <button type="button" onClick={handleClosePopupRename}>
            <CloseXButton />
          </button>
        </div>
        <div>
          <label>Rename</label>
          <input
            type="text"
            minLength={1}
            maxLength={100}
            placeholder="My new group list is...."
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            required
          />
        </div>
        <button
          className={
            isLoadingPost
              ? "rename-group-list-btn-load"
              : "rename-group-list-btn"
          }
          disabled={isLoadingPost}
          type="submit"
        >
          {isLoadingPost ? <LoadButton /> : "Save"}
        </button>
      </form>
    </div>
  );
}
