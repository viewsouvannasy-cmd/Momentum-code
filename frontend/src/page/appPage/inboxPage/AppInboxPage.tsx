import { useState, useEffect } from "react";
import { PopUpCreateGroupList } from "../../../components/popup/popupGroupList/popup-create-group-list/PopUpCreateGroupList.tsx";
import { PopupAddTask } from "../../../components/popup/popupTask/popup-add-test/PopupAddTask.tsx";
import { InboxHeader } from "./inboxHeader/InboxHeader.tsx";
import { GroupListSection } from "./groupListSection/GroupListSection.tsx";
import { StateSection } from "./stateSection/StateSection.tsx";
import { useMediaQuery } from "../../../hook/useMediaQuery.ts";
import useGropList from "../../../api/group-lists/useGroupList.ts";
import useTask from "../../../api/task/useTask.ts";
import useUser from "../../../api/user-data/useUser.ts";

interface AppInboxProp {
  isOpenNavBar: string;
}

export function AppInboxPage({ isOpenNavBar }: AppInboxProp) {
  // this is use to controll popup
  const [isOpenPopup, setIsOpenPopup] = useState<string | null>(null);
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

  const { getTask } = useTask();
  const { getGroup } = useGropList();
  const { getUserInfo } = useUser();

  useEffect(() => {
    getGroup();
    getTask();
    getUserInfo();
  }, [getGroup, getTask, getUserInfo]);

  const wideScreen = useMediaQuery("(min-width: 821px)");
  const maxWideScreen = useMediaQuery("(max-width: 821px)");

  return (
    <>
      <InboxHeader />

      {isOpenNavBar === "close" && wideScreen && (
        <GroupListSection
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
        />
      )}

      {maxWideScreen && (
        <GroupListSection
          setIsAnimation={setIsAnimation}
          setIsOpenPopup={setIsOpenPopup}
        />
      )}

      <StateSection
        setIsAnimation={setIsAnimation}
        setIsOpenPopup={setIsOpenPopup}
      />

      {isOpenPopup === "create" && (
        <PopUpCreateGroupList
          isAnimation={isAnimation}
          setIsAnimation={setIsAnimation}
          isOpenPopup={isOpenPopup}
          setIsOpenPopup={setIsOpenPopup}
        />
      )}

      {isOpenPopup === "add-task" && (
        <PopupAddTask
          isAnimation={isAnimation}
          setIsAnimation={setIsAnimation}
          isOpenPopup={isOpenPopup}
          setIsOpenPopup={setIsOpenPopup}
        />
      )}
    </>
  );
}
