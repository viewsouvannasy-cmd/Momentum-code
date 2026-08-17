import { FullLogo } from "../../../../components/logo/FullLogo";
import { BtnOpenNavBarMB } from "../../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import useGropList from "../../../../api/group-lists/useGroupList";
import "./CalendarHeader.css";

export function CalendarHeader() {
  const { groupListData } = useGropList();

  const row1 = groupListData.slice(0, 2);
  const row2 = groupListData.slice(2, 5);
  const row3 = groupListData.slice(5, 7);

  return (
    <div className="container-calendar-header-section-page">
      <div>
        <BtnOpenNavBarMB />
        <div>
          <h1>Calender</h1>
          <span>Let plan date and time for your task</span>
        </div>
      </div>
      <div>
        <div className="row1">
          {row1.map((group) => {
            return (
              <div
                key={group.group_id}
                style={{ backgroundColor: group.group_color }}
              ></div>
            );
          })}
        </div>
        <div className="row2">
          {row2.map((group) => {
            return (
              <div
                key={group.group_id}
                style={{ backgroundColor: group.group_color }}
              ></div>
            );
          })}
        </div>
        <div className="row3">
          {row3.map((group) => {
            return (
              <div
                key={group.group_id}
                style={{ backgroundColor: group.group_color }}
              ></div>
            );
          })}
        </div>
        <FullLogo />
      </div>
    </div>
  );
}
