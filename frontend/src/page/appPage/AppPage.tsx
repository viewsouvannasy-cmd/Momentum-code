import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";
import { GroupListPage } from "./gropListPage/GroupListPage.tsx";
import useGropList from "../../api/group-lists/useGroupList.ts";
import useTask from "../../api/task/useTask.ts";
import useUser from "../../api/user-data/useUser.ts";

import "./AppPage.css";

export function AppPage() {
  const { section, groupId } = useParams();

  const { getTask } = useTask();
  const { groupListData, getGroup } = useGropList();
  const { userData, getUserInfo } = useUser();

  const [isOpenNavBar, setIsOpenNavBar] = useState<string>(() => {
    return localStorage.getItem("navbar") || "open";
  });

  const [isOpenNavBarMB, setIsOpenNavBarMB] = useState("close");
  const [isBackgroundOverlyMB, setIsBackgroundOverlyMB] = useState("close");

  useEffect(() => {
    getGroup();
    getTask();
    getUserInfo();
  }, [getGroup, getTask, getUserInfo]);
  console.log(userData);

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
