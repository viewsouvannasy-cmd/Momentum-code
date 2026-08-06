import { Link, useParams } from "react-router";
import { useState } from "react";
import { addAndRemoveTransition } from "../../utils/addAndRemoveTransition.ts";
import { PopUpCreateGroupList } from "../popup-create-group-list/PopUpCreateGroupList.tsx";
import { FullLogo } from "../logo/FullLogo";
import useGropList from "../../api/group-lists/useGroupList.ts";
import "./NavBarApp.css";

interface NavBarProp {
  isOpenNavBar: string;
  setIsOpenNavBar: (param: string) => void;
  user_name: string;
  user_email: string;
  isOpenNavBarMB: string;
  setIsOpenNavBarMB: (param: string) => void;
  isBackgroundOverlyMB: string;
  setIsBackgroundOverlyMB: (param: string) => void;
}

export function NavBarApp({
  isOpenNavBar,
  setIsOpenNavBar,
  user_name,
  user_email,
  isOpenNavBarMB,
  setIsOpenNavBarMB,
  isBackgroundOverlyMB,
  setIsBackgroundOverlyMB,
}: NavBarProp) {
  const { section } = useParams();

  const { data, isLoading } = useGropList();

  // this is use to controll popup
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAnimation, setIsAnimation] = useState("close");

  function handleToggleNavBar() {
    addAndRemoveTransition();
    const next = isOpenNavBar === "open" ? "close" : "open";
    setIsOpenNavBar(next);
    localStorage.setItem("navbar", next);
  }

  function handleOpenPopup() {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    setIsOpenPopup(true);
  }

  function handleCloseNavBarMB() {
    setIsOpenNavBarMB("close");
    setTimeout(() => {
      setIsBackgroundOverlyMB("close");
    }, 200);
  }

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
            <Link
              className={`today-lists-link ${section === "today-lists" ? "active" : ""}`}
              to="/app/today-lists"
            >
              <img src="/icon/today-list.png" />
              <span>Today lists</span>
            </Link>
            <Link
              className={`calendar-link ${section === "calendar" ? "active" : ""}`}
              to="/app/calendar"
            >
              <img src="/icon/calendar.png" />
              <span>Calendar</span>
            </Link>
            <Link
              className={`inbox-link ${section === "inbox" ? "active" : ""}`}
              to="/app/inbox"
            >
              <img src="/icon/inbox.png" />
              <span>Inbox</span>
            </Link>
          </div>
          <div className="container-nav-bar-group-list">
            <div>
              <p>GROUP LIST</p>
              <button onClick={handleOpenPopup}>
                <img src="/icon/add.png" />
              </button>
            </div>
            <div className="container-group-list-item">
              {isLoading &&
                new Array(3).fill("a").map((name, index) => {
                  return (
                    <div
                      key={index}
                      id={name}
                      className="group-list-item loading"
                    ></div>
                  );
                })}
              {!isLoading && data?.length === 0 && <p>No Have Group List.</p>}
              {!isLoading &&
                data?.length > 0 &&
                data?.map((group) => {
                  return (
                    <div
                      className="group-list-item"
                      key={group.group_id}
                      style={{ backgroundColor: group.group_color }}
                    >
                      <p>{group.group_name}</p>
                      <button>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="5" r="2" fill="currentColor" />
                          <circle cx="12" cy="12" r="2" fill="currentColor" />
                          <circle cx="12" cy="19" r="2" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={`container-user-name-and-email`} role="button">
          <img src="/profile.jpg" />
          <div>
            <p>{user_name}</p>
            <span>{user_email}</span>
          </div>
        </div>
      </nav>

      <div
        className={`container-background-overlay-mb ${isBackgroundOverlyMB}`}
        style={{ display: isBackgroundOverlyMB === "close" ? "none" : "unset" }}
      >
        <nav className={`container-nav-bar-main-mb ${isOpenNavBarMB}`}>
          <div>
            <div className="container-nav-bar-logo">
              <FullLogo />
              <button onClick={handleCloseNavBarMB}>
                <img src="/icon/sidebar.png" />
              </button>
            </div>
            <div className="container-select-section">
              <Link
                className={`today-lists-link ${section === "today-lists" ? "active" : ""}`}
                to="/app/today-lists"
              >
                <img src="/icon/today-list.png" />
                <span>Today lists</span>
              </Link>
              <Link
                className={`calendar-link ${section === "calendar" ? "active" : ""}`}
                to="/app/calendar"
              >
                <img src="/icon/calendar.png" />
                <span>Calendar</span>
              </Link>
              <Link
                className={`inbox-link ${section === "inbox" ? "active" : ""}`}
                to="/app/inbox"
              >
                <img src="/icon/inbox.png" />
                <span>Inbox</span>
              </Link>
            </div>
            <div className="container-nav-bar-group-list-mb">
              <div>
                <p>GROUP LIST</p>
                <button onClick={handleOpenPopup}>
                  <img src="/icon/add.png" />
                </button>
              </div>
              <div className="container-group-list-item">
                {isLoading &&
                  new Array(3).fill("a").map((name, index) => {
                    return (
                      <div
                        key={index}
                        id={name}
                        className="group-list-item loading"
                      ></div>
                    );
                  })}
                {!isLoading && data?.length === 0 && <p>No Have Group List.</p>}
                {!isLoading &&
                  data?.length > 0 &&
                  data?.map((group) => {
                    return (
                      <div
                        className="group-list-item"
                        key={group.group_id}
                        style={{ backgroundColor: group.group_color }}
                      >
                        <p>{group.group_name}</p>
                        <button>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="5" r="2" fill="currentColor" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                            <circle cx="12" cy="19" r="2" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={`container-user-name-and-email`} role="button">
            <img src="/profile.jpg" />
            <div>
              <p>{user_name}</p>
              <span>{user_email}</span>
            </div>
          </div>
        </nav>
      </div>

      <PopUpCreateGroupList
        isOpenNavBar={isOpenNavBar}
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
      />
    </>
  );
}
