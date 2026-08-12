import { useState } from "react";
import { useParams } from "react-router";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import { GroupListPage } from "./gropListPage/GroupListPage.tsx";

import "./AppPage.css";

export function AppPage() {
  const { section, groupId } = useParams();

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

        {groupId && (
          <GroupListPage
            setIsBackgroundOverlyMB={setIsBackgroundOverlyMB}
            setIsOpenNavBarMB={setIsOpenNavBarMB}
          />
        )}
      </div>
    </>
  );
}
