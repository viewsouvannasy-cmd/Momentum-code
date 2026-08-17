import { useState } from "react";
import { useParams } from "react-router";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import { GroupListPage } from "./gropListPage/GroupListPage.tsx";
import { CalendarPage } from "./calendarPage/CalendarPage.tsx";
import "./AppPage.css";

export function AppPage() {
  const { section, groupId } = useParams();

  const [isOpenNavBar, setIsOpenNavBar] = useState<string>(() => {
    return localStorage.getItem("navbar") || "open";
  });

  return (
    <>
      <NavBarApp
        isOpenNavBar={isOpenNavBar}
        setIsOpenNavBar={setIsOpenNavBar}
      />

      <div className={`container-section-main ${isOpenNavBar}`}>
        {section === "inbox" && <AppInboxPage isOpenNavBar={isOpenNavBar} />}
        {section === "calendar" && <CalendarPage />}

        {groupId && <GroupListPage />}
      </div>
    </>
  );
}
