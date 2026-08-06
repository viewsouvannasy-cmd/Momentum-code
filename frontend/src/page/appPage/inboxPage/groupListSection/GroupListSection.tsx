import "./GroupListSection.css";

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

interface GroupListSectionProp {
  setIsAnimation: (param: string) => void;
  setIsOpenPopup: (param: boolean) => void;
  isLoading: boolean;
  data: GroupList[] | [];
}

export function GroupListSection({
  setIsAnimation,
  setIsOpenPopup,
  isLoading,
  data,
}: GroupListSectionProp) {
  function handleOpenPopup() {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    setIsOpenPopup(true);
  }

  return (
    <div className="container-group-inbox-page">
      <div>
        <h3>Group List</h3>
        <button onClick={handleOpenPopup}>+ Create</button>
      </div>
      <div
        className={`container-group-list-item-inbox-page ${isLoading && "loading"}`}
      >
        {isLoading && (
          <>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}
        {!isLoading && data.length === 0 && <p>No Have GroupList.</p>}
        {!isLoading &&
          data?.length > 0 &&
          data?.map((group) => {
            return (
              <div
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
