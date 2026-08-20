import { BtnOpenNavBarMB } from "../../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import usePopup from "../../../../context/usePopup";
import "./GroupHeader.css";

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

interface GroupHeaderProp {
  currentGroupList: GroupList | undefined;
}

export function GroupHeader({ currentGroupList }: GroupHeaderProp) {
  const { openPopup } = usePopup();

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
              <div role="button" onClick={() => openPopup("rename")}>
                {currentGroupList?.group_name}
              </div>
            </div>
            <div className="box-color-group-list">
              <p>Color</p>
              <div role="button" onClick={() => openPopup("change-color")}>
                <div
                  style={{ backgroundColor: currentGroupList?.group_color }}
                ></div>
              </div>
            </div>
          </div>
          <button onClick={() => openPopup("delete")}>Delete List</button>
        </div>
      </div>
    </div>
  );
}
