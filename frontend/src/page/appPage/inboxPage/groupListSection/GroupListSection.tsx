import useGropList from "../../../../api/group-lists/useGroupList.ts";
import { useNavigate } from "react-router";
import usePopup from "../../../../context/usePopup.ts";
import "./GroupListSection.css";

export function GroupListSection() {
  const navigate = useNavigate();
  const { groupListData, isLoadingGroup } = useGropList();

  const { openPopup } = usePopup();

  function handleToGroupListPage(group_id: number) {
    navigate(`/app/group/${group_id}`);
  }

  return (
    <div className="container-group-inbox-page">
      <div>
        <h3>Group List</h3>
        <button onClick={() => openPopup("create")}>+ Create</button>
      </div>
      <div
        className={`container-group-list-item-inbox-page ${isLoadingGroup && "loading"}`}
      >
        {isLoadingGroup && (
          <>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}
        {!isLoadingGroup && groupListData.length === 0 && (
          <p>No Have GroupList.</p>
        )}
        {!isLoadingGroup &&
          groupListData?.length > 0 &&
          groupListData?.map((group) => {
            return (
              <div
                role="button"
                onClick={() => handleToGroupListPage(group.group_id)}
                key={group.group_id}
                style={{ backgroundColor: group.group_color }}
              >
                {group.group_name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
