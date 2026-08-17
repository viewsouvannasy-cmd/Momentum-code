import { useParams, useNavigate } from "react-router";

import { useState, useEffect } from "react";
import { GroupHeader } from "./groupHeader/GroupHeader";
import { GroupStateSection } from "./groupStateSection/GroupStateSection";
import { PopupRenameGroupList } from "../../../components/popup/popupGroupList/popup-rename-group-list/PopupRenameGroupList";
import { PopupChangeColorGroup } from "../../../components/popup/popupGroupList/popup-change-color-group-list/PopupChangeColorGroup";
import { PopupDeleteGroupList } from "../../../components/popup/popupGroupList/popup-delete-group-list/PopupDeleteGroupList";
import useGropList from "../../../api/group-lists/useGroupList.ts";
import useTask from "../../../api/task/useTask.ts";

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

export function GroupListPage() {
  const navigate = useNavigate();

  const { groupId } = useParams();

  const { getTask } = useTask();
  const { getGroup, groupListData } = useGropList();

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

  useEffect(() => {
    getGroup();
    getTask();
  }, [getGroup, getTask]);

  const currentGroupList: GroupList | undefined = groupListData.find(
    (group) => group.group_id === Number(groupId),
  );

  if (!currentGroupList) {
    navigate("/error");
  }

  useEffect(() => {
    if (currentGroupList?.group_id) {
      document.title = currentGroupList?.group_name;
    }
  });

  return (
    <>
      <GroupHeader
        currentGroupList={currentGroupList}
        setIsOpenPopup={setIsOpenPopup}
        setIsAnimation={setIsAnimation}
      />

      <GroupStateSection
        groupId={groupId}
        setIsOpenPopup={setIsOpenPopup}
        setIsAnimation={setIsAnimation}
      />

      {isOpenPopup === "rename" && (
        <PopupRenameGroupList
          groupId={Number(groupId)}
          isOpenPopup={isOpenPopup}
          isAnimation={isAnimation}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
      )}
      {isOpenPopup === "change-color" && (
        <PopupChangeColorGroup
          groupId={Number(groupId)}
          group_name={currentGroupList?.group_name}
          group_color={currentGroupList?.group_color}
          isOpenPopup={isOpenPopup}
          isAnimation={isAnimation}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
      )}
      {isOpenPopup === "delete" && (
        <PopupDeleteGroupList
          groupId={Number(groupId)}
          group_name={currentGroupList?.group_name}
          isOpenPopup={isOpenPopup}
          isAnimation={isAnimation}
          setIsOpenPopup={setIsOpenPopup}
          setIsAnimation={setIsAnimation}
        />
      )}
    </>
  );
}
