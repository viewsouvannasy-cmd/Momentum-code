import useGropList from "../../../../api/group-lists/useGroupList.ts";
import { useNavigate } from "react-router";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import useGetData from "../../../../api/todo-data/useGetData.ts";
import "./PopupDeleteGroupList.css";

interface PopupDeleteGroupListprop {
  groupId: number | undefined;
  group_name: string | undefined;
  isOpenPopup: string | null;
  isAnimation: string;
  setIsOpenPopup: (param: string | null) => void;
  setIsAnimation: (param: string) => void;
}

export function PopupDeleteGroupList({
  groupId,
  group_name,
  isOpenPopup,
  isAnimation,
  setIsOpenPopup,
  setIsAnimation,
}: PopupDeleteGroupListprop) {
  const { isLoadingPost, deleteGroup } = useGropList();
  const { getDataTodo } = useGetData();

  const navigate = useNavigate();

  function handleClosePopup() {
    setIsAnimation("close");
    setTimeout(() => {
      setIsOpenPopup(null);
    }, 200);
  }

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
        display: isOpenPopup ? "flex" : "none",
      }}
    >
      <div className={`container-delete-group-list-popup ${isAnimation}`}>
        <div>
          <p>Are you sure to delete {group_name} group?</p>
          <span>Click confirm to delete</span>
        </div>
        <div>
          <button onClick={handleClosePopup}>Cancel</button>
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
