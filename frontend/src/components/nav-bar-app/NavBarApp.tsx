import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { addAndRemoveTransition } from "../../utils/addAndRemoveTransition.ts";
import { PopUpCreateGroupList } from "../popup/popupGroupList/popup-create-group-list/PopUpCreateGroupList.tsx";
import { FullLogo } from "../logo/FullLogo";
import useGropList from "../../api/group-lists/useGroupList.ts";
import useUser from "../../api/user-data/useUser.ts";
import useSideBarMb from "../../context/useSideBarMb.ts";
import usePopup from "../../context/usePopup.ts";
import "./NavBarApp.css";

interface NavBarProp {
  isOpenNavBar: string;
  setIsOpenNavBar: (param: string) => void;
}

export function NavBarApp({ isOpenNavBar, setIsOpenNavBar }: NavBarProp) {
  const navigate = useNavigate();
  const { section } = useParams();

  const { isOpenSideBarMb, isBackgroundOverlayMb, closeSideBarMb } =
    useSideBarMb();

  const { userData, getUserInfo } = useUser();
  const { groupListData, isLoadingGroup, getGroup } = useGropList();

  const { openPopup } = usePopup();

  function handleToggleNavBar() {
    addAndRemoveTransition();
    const next = isOpenNavBar === "open" ? "close" : "open";
    setIsOpenNavBar(next);
    localStorage.setItem("navbar", next);
  }

  function handleChangeSectionPage(sectionName: string, navType: string) {
    navigate(`/app/${sectionName}`);
    if (navType === "mb") {
      closeSideBarMb();
    }
  }

  function handleToGroupListPage(
    id: number,
    name: string,
    color: string,
    navType: string,
  ) {
    navigate(`/app/group/${id}`, {
      state: {
        group_id: id,
        group_name: name,
        group_color: color,
      },
    });
    if (navType === "mb") {
      closeSideBarMb();
    }
  }

  useEffect(() => {
    getGroup();
    getUserInfo();
  }, [getGroup, getUserInfo]);

  return (
    <>
      <nav className={`container-nav-bar-main ${isOpenNavBar}`}>
        <div>
          <div className="container-nav-bar-logo">
            <FullLogo />
            <button onClick={handleToggleNavBar}>
              <img src="/icon/sidebar.png" />
            </button>
          </div>
          <div className="container-select-section">
            <button
              onClick={() => handleChangeSectionPage("today-lists", "dt")}
              className={`today-lists-link ${section === "today-lists" ? "active" : ""}`}
            >
              <img src="/icon/today-list.png" />
              <span>Today lists</span>
            </button>
            <button
              onClick={() => handleChangeSectionPage("calendar", "dt")}
              className={`calendar-link ${section === "calendar" ? "active" : ""}`}
            >
              <img src="/icon/calendar.png" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => handleChangeSectionPage("inbox", "dt")}
              className={`inbox-link ${section === "inbox" ? "active" : ""}`}
            >
              <img src="/icon/inbox.png" />
              <span>Inbox</span>
            </button>
          </div>
          <div className="container-nav-bar-group-list">
            <div>
              <p>GROUP LIST</p>
              <button onClick={() => openPopup("create")}>
                <img src="/icon/add.png" />
              </button>
            </div>
            <div className="container-group-list-item">
              {isLoadingGroup &&
                new Array(3).fill("a").map((name, index) => {
                  return (
                    <div
                      key={index}
                      id={name}
                      className="group-list-item loading"
                    ></div>
                  );
                })}
              {!isLoadingGroup && groupListData?.length === 0 && (
                <p>No Have Group List.</p>
              )}
              {!isLoadingGroup &&
                groupListData?.length > 0 &&
                groupListData?.map((group) => {
                  return (
                    <div
                      className="group-list-item"
                      role="button"
                      onClick={() =>
                        handleToGroupListPage(
                          group.group_id,
                          group.group_name,
                          group.group_color,
                          "dt",
                        )
                      }
                      key={group.group_id}
                      style={{ backgroundColor: group.group_color }}
                    >
                      {group.group_name}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={`container-user-name-and-email`} role="button">
          <img src="/profile.jpg" />
          <div>
            <p>{userData[0]?.user_name}</p>
            <span>{userData[0]?.user_email}</span>
          </div>
        </div>
      </nav>

      <div
        className={`container-background-overlay-mb ${isBackgroundOverlayMb}`}
      >
        <nav className={`container-nav-bar-main-mb ${isOpenSideBarMb}`}>
          <div>
            <div className="container-nav-bar-logo">
              <FullLogo />
              <button onClick={closeSideBarMb}>
                <img src="/icon/sidebar.png" />
              </button>
            </div>
            <div className="container-select-section">
              <button
                onClick={() => handleChangeSectionPage("today-lists", "mb")}
                className={`today-lists-link ${section === "today-lists" ? "active" : ""}`}
              >
                <img src="/icon/today-list.png" />
                <span>Today lists</span>
              </button>
              <button
                onClick={() => handleChangeSectionPage("calendar", "mb")}
                className={`calendar-link ${section === "calendar" ? "active" : ""}`}
              >
                <img src="/icon/calendar.png" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => handleChangeSectionPage("inbox", "mb")}
                className={`inbox-link ${section === "inbox" ? "active" : ""}`}
              >
                <img src="/icon/inbox.png" />
                <span>Inbox</span>
              </button>
            </div>
            <div className="container-nav-bar-group-list-mb">
              <div>
                <p>GROUP LIST</p>
                <button onClick={() => openPopup("create")}>
                  <img src="/icon/add.png" />
                </button>
              </div>
              <div className="container-group-list-item">
                {isLoadingGroup &&
                  new Array(3).fill("a").map((name, index) => {
                    return (
                      <div
                        key={index}
                        id={name}
                        className="group-list-item loading"
                      ></div>
                    );
                  })}
                {!isLoadingGroup && groupListData?.length === 0 && (
                  <p>No Have Group List.</p>
                )}
                {!isLoadingGroup &&
                  groupListData?.length > 0 &&
                  groupListData?.map((group) => {
                    return (
                      <div
                        role="button"
                        onClick={() =>
                          handleToGroupListPage(
                            group.group_id,
                            group.group_name,
                            group.group_color,
                            "mb",
                          )
                        }
                        className="group-list-item"
                        key={group.group_id}
                        style={{ backgroundColor: group.group_color }}
                      >
                        {group.group_name}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={`container-user-name-and-email`} role="button">
            <img src="/profile.jpg" />
            <div>
              <p>{userData[0]?.user_name}</p>
              <span>{userData[0]?.user_email}</span>
            </div>
          </div>
        </nav>
      </div>

      <PopUpCreateGroupList />
    </>
  );
}
