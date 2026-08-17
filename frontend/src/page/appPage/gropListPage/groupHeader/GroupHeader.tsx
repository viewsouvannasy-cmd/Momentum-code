import { BtnOpenNavBarMB } from "../../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import "./GroupHeader.css";

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

interface GroupHeaderProp {
  currentGroupList: GroupList | undefined;
  setIsOpenPopup: (param: string | null) => void;
  setIsAnimation: (param: string) => void;
}

export function GroupHeader({
  currentGroupList,
  setIsOpenPopup,
  setIsAnimation,
}: GroupHeaderProp) {
  function handleOpenPopup(popupName: string) {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    setIsOpenPopup(popupName);
  }

  return (
    <div className="container-group-list-header-page">
      <div>
        <BtnOpenNavBarMB />
        <p>In {currentGroupList?.group_name} Group List</p>
      </div>
      <div>
        <h1>{currentGroupList?.group_name}</h1>
        <div className="container-color-and-name-group-list">
          <div>
            <div className="box-name-group-list">
              <p>Name</p>
              <div role="button" onClick={() => handleOpenPopup("rename")}>
                {currentGroupList?.group_name}
              </div>
            </div>
            <div className="box-color-group-list">
              <p>Color</p>
              <div
                role="button"
                onClick={() => handleOpenPopup("change-color")}
              >
                <div
                  style={{ backgroundColor: currentGroupList?.group_color }}
                ></div>
              </div>
            </div>
          </div>
          <button onClick={() => handleOpenPopup("delete")}>Delete List</button>
        </div>
      </div>
    </div>
  );
}
