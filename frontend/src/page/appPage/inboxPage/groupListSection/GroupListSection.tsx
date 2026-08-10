import useGropList from "../../../../api/group-lists/useGroupList.ts";
import { useNavigate } from "react-router";
import "./GroupListSection.css";

interface GroupListSectionProp {
  setIsAnimation: (param: string) => void;
  setIsOpenPopup: (param: string) => void;
}

export function GroupListSection({
  setIsAnimation,
  setIsOpenPopup,
}: GroupListSectionProp) {
  const navigate = useNavigate();
  const { groupListData, isLoadingGroup } = useGropList();

  function handleOpenPopup() {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    setIsOpenPopup("create");
  }

  function handleToGroupListPage(
    group_id: number,
    group_name: string,
    group_color: string,
  ) {
    navigate(`/app/group/${group_id}`, {
      state: {
        group_id,
        group_name,
        group_color,
      },
    });
  }

  return (
    <div className="container-group-inbox-page">
      <div>
        <h3>Group List</h3>
        <button onClick={handleOpenPopup}>+ Create</button>
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
                onClick={() =>
                  handleToGroupListPage(
                    group.group_id,
                    group.group_name,
                    group.group_color,
                  )
                }
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
