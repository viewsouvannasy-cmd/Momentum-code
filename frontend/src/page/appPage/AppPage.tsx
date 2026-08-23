// library
import { useState } from "react";
import { useParams } from "react-router";

// components
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import { GroupListPage } from "./gropListPage/GroupListPage.tsx";
import { CalendarPage } from "./calendarPage/CalendarPage.tsx";
import { TodayListPage } from "./todayListPage/TodayListPage.tsx";
import { PreviewPage } from "./previewPage/PreveiwPage.tsx";

// css
import "./AppPage.css";

export function AppPage() {
  const { section, groupId, date } = useParams();

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
        {section === "today-lists" && <TodayListPage />}

        {date && <PreviewPage date={date} />}
        {groupId && <GroupListPage />}
      </div>
    </>
  );
}
