import { useState, useEffect } from "react";
import useGropList from "../../../api/group-lists/useGroupList.ts";
import { PopUpCreateGroupList } from "../../../components/popup-create-group-list/PopUpCreateGroupList.tsx";
import { InboxHeader } from "./inboxHeader/InboxHeader.tsx";
import { GroupListSection } from "./groupListSection/GroupListSection.tsx";
import { StateSection } from "./stateSection/StateSection.tsx";

interface AppInboxProp {
  isOpenNavBar: string;
  setIsOpenNavBarMB: (param: string) => void;
  setIsBackgroundOverlyMB: (param: string) => void;
}

export function AppInboxPage({
  isOpenNavBar,
  setIsOpenNavBarMB,
  setIsBackgroundOverlyMB,
}: AppInboxProp) {
  const { data, isLoading } = useGropList();

  // this is use to controll popup
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAnimation, setIsAnimation] = useState("close");

  useEffect(() => {
    if (isOpenPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpenPopup]);

  return (
    <>
      <InboxHeader
        setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
        setIsOpenNavBarMB={setIsOpenNavBarMB}
      />

      {isOpenNavBar === "close" && (
        <GroupListSection
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
          isLoading={isLoading}
          data={data}
        />
      )}

      <StateSection />

      <PopUpCreateGroupList
        isOpenNavBar={isOpenNavBar}
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
      />
    </>
  );
}
