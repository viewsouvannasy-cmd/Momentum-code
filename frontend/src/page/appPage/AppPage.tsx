import { useState } from "react";
import { useParams } from "react-router";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import { GroupListPage } from "./gropListPage/GroupListPage.tsx";
import useGropList from "../../api/group-lists/useGroupList.ts";

import "./AppPage.css";

export function AppPage() {
  const { section, groupId } = useParams();

  const { groupListData } = useGropList();

  const [isOpenNavBar, setIsOpenNavBar] = useState<string>(() => {
    return localStorage.getItem("navbar") || "open";
  });

  const [isOpenNavBarMB, setIsOpenNavBarMB] = useState("close");
  const [isBackgroundOverlyMB, setIsBackgroundOverlyMB] = useState("close");

  return (
    <>
      <NavBarApp
        isOpenNavBar={isOpenNavBar}
        setIsOpenNavBar={setIsOpenNavBar}
        isOpenNavBarMB={isOpenNavBarMB}
        setIsOpenNavBarMB={setIsOpenNavBarMB}
        isBackgroundOverlyMB={isBackgroundOverlyMB}
        setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
      />

      <div className={`container-section-main ${isOpenNavBar}`}>
        {section === "inbox" && (
          <AppInboxPage
            isOpenNavBar={isOpenNavBar}
            setIsOpenNavBarMB={setIsOpenNavBarMB}
            setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
          />
        )}

        {groupListData.filter((item) => item.group_id === Number(groupId))
          .length > 0 && (
          <GroupListPage
            setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
            setIsOpenNavBarMB={setIsOpenNavBarMB}
          />
        )}
      </div>
    </>
  );
}
