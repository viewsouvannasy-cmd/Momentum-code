import { useState } from "react";
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useGetData from "../../../../api/todo-data/useGetData.ts";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import usePopup from "../../../../context/usePopup.ts";
import "./PopupRenameGroupList.css";

interface PopupRenameGroupListProp {
  groupId: number | undefined;
}

export function PopupRenameGroupList({ groupId }: PopupRenameGroupListProp) {
  const { renameGroup, isLoadingPost } = useGropList();

  const { getDataTodo } = useGetData();

  const [inputName, setInputName] = useState("");

  const { isAnimation, isOpenPopup, closePopup } = usePopup();

  const handleRenameGroupList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupId) {
      await renameGroup(inputName, groupId);
      await getDataTodo();
      closePopup();
      setInputName("");
    }
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "rename" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleRenameGroupList}
        className={`container-popup-rename-group-list ${isAnimation}`}
      >
        <div>
          <h2>Get a new name</h2>
          <button type="button" onClick={closePopup}>
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
