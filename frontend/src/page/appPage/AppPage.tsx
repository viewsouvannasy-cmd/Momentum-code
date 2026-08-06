import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import useGropList from "../../api/group-lists/useGroupList.ts";

import "./AppPage.css";

export function AppPage() {
  const location = useLocation();
  const { section } = useParams();

  const { getGroup } = useGropList();

  const { user_name, user_email } = location.state;

  const [isOpenNavBar, setIsOpenNavBar] = useState<string>(() => {
    return localStorage.getItem("navbar") || "open";
  });

  const [isOpenNavBarMB, setIsOpenNavBarMB] = useState("close");
  const [isBackgroundOverlyMB, setIsBackgroundOverlyMB] = useState("close");

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  return (
    <>
      <NavBarApp
        isOpenNavBar={isOpenNavBar}
        setIsOpenNavBar={setIsOpenNavBar}
        user_name={user_name}
        user_email={user_email}
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
      </div>
    </>
  );
}
