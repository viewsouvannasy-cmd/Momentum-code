import { BtnOpenNavBarMB } from "../../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import useUser from "../../../../api/user-data/useUser";
import "./InboxHeader.css";

interface InboxHeaderProp {
  setIsBackgroundOverlyMB: (param: string) => void;
  setIsOpenNavBarMB: (param: string) => void;
}

export function InboxHeader({
  setIsBackgroundOverlyMB,
  setIsOpenNavBarMB,
}: InboxHeaderProp) {
  const { userData } = useUser();

  return (
    <div className="container-inbox-section-header">
      <BtnOpenNavBarMB
        setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
        setIsOpenNavBarMB={setIsOpenNavBarMB}
      />
      <div>
        <h1>Inbox, {userData[0]?.user_name}</h1>
        <span>what do you want to update today</span>
      </div>
    </div>
  );
}
