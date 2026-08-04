import { useState, useEffect } from "react";
import { DisplayState } from "./displayState/DisplayState";
import { PopUpCreateGroupList } from "../../../components/popup-create-group-list/PopUpCreateGroupList.tsx";
import "./AppInboxPage.css";

interface AppInboxProp {
  isOpenNavBar: string;
}

export function AppInboxPage({ isOpenNavBar }: AppInboxProp) {
  // this is use to controll popup
  const [isOpenPopup, setIsOpenPopup] = useState(false);
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

  function handleOpenPopup() {
    document.body.style.overflow = "hidden";
    setIsAnimation("open");
    setIsOpenPopup(true);
  }

  return (
    <>
      <div className={`container-inbox-section-main ${isOpenNavBar}`}>
        <div className="container-inbox-section-header">
          <div>
            <h1>Inbox, view</h1>
            <span>what do you want to update today</span>
          </div>
          <div>
            <button>Undo</button>
            <button>+ Add task</button>
          </div>
        </div>
        {isOpenNavBar === "close" && (
          <div className="container-group-inbox-page">
            <div>
              <h3>Group List</h3>
              <button onClick={handleOpenPopup}>+ Create</button>
            </div>
            <div>
              <div>Learing</div>
              <div>Learing</div>
              <div>Learing</div>
              <div>Learing</div>
              <div>Learing</div>
              <div>Learing</div>
            </div>
          </div>
        )}

        <div className="container-to-do-list-state">
          <DisplayState state="todo" />
          <DisplayState state="doing" />
          <DisplayState state="done" />
        </div>
      </div>

      <PopUpCreateGroupList
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
      />
    </>
  );
}
