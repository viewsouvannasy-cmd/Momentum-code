import { BtnOpenNavBarMB } from "../../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import useUser from "../../../../api/user-data/useUser";
import "./InboxHeader.css";

export function InboxHeader() {
  const { userData } = useUser();

  return (
    <div className="container-inbox-section-header">
      <BtnOpenNavBarMB />
      <div>
        <h1>Inbox, {userData[0]?.user_name}</h1>
        <span>what do you want to update today</span>
      </div>
    </div>
  );
}
