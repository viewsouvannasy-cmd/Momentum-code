import useGropList from "../../../../api/group-lists/useGroupList.ts";
import { useNavigate } from "react-router";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import useGetData from "../../../../api/todo-data/useGetData.ts";
import usePopup from "../../../../context/usePopup.ts";

import "./PopupDeleteGroupList.css";

interface PopupDeleteGroupListprop {
  groupId: number | undefined;
  group_name: string | undefined;
}

export function PopupDeleteGroupList({
  groupId,
  group_name,
}: PopupDeleteGroupListprop) {
  const { isLoadingPost, deleteGroup } = useGropList();
  const { getDataTodo } = useGetData();

  const navigate = useNavigate();

  const { isAnimation, isOpenPopup, closePopup } = usePopup();

  const handleDeleteGroupList = async () => {
    if (groupId) {
      await deleteGroup(groupId);
      await getDataTodo();
      navigate("/app/inbox");
    }
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "delete" ? "flex" : "none",
      }}
    >
      <div className={`container-delete-group-list-popup ${isAnimation}`}>
        <div>
          <p>Are you sure to delete {group_name} group?</p>
          <span>Click confirm to delete</span>
        </div>
        <div>
          <button onClick={closePopup}>Cancel</button>
          <button
            onClick={handleDeleteGroupList}
            className={
              isLoadingPost
                ? "btn-delete-group-list-load"
                : "btn-delete-group-list"
            }
            disabled={isLoadingPost}
          >
            {isLoadingPost ? <LoadButton /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
