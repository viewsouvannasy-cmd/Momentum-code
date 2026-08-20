import { useEffect } from "react";
import { PopUpCreateGroupList } from "../../../components/popup/popupGroupList/popup-create-group-list/PopUpCreateGroupList.tsx";
import { PopupAddTask } from "../../../components/popup/popupTask/popup-add-test/PopupAddTask.tsx";
import { InboxHeader } from "./inboxHeader/InboxHeader.tsx";
import { GroupListSection } from "./groupListSection/GroupListSection.tsx";
import { StateSection } from "./stateSection/StateSection.tsx";
import { useMediaQuery } from "../../../hook/useMediaQuery.ts";
import useGropList from "../../../api/group-lists/useGroupList.ts";
import useTask from "../../../api/task/useTask.ts";
import useUser from "../../../api/user-data/useUser.ts";
import usePopup from "../../../context/usePopup.ts";

interface AppInboxProp {
  isOpenNavBar: string;
}

export function AppInboxPage({ isOpenNavBar }: AppInboxProp) {
  const { isOpenPopup } = usePopup();

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

  const { getTask } = useTask();
  const { getGroup } = useGropList();
  const { getUserInfo } = useUser();

  useEffect(() => {
    document.title = "Inbox";
    getGroup();
    getTask();
    getUserInfo();
  }, [getGroup, getTask, getUserInfo]);

  const wideScreen = useMediaQuery("(min-width: 821px)");
  const maxWideScreen = useMediaQuery("(max-width: 821px)");

  return (
    <>
      <InboxHeader />

      {isOpenNavBar === "close" && wideScreen && <GroupListSection />}

      {maxWideScreen && <GroupListSection />}

      <StateSection />

      {isOpenPopup === "create" && <PopUpCreateGroupList />}

      {isOpenPopup === "add-task" && <PopupAddTask />}
    </>
  );
}
