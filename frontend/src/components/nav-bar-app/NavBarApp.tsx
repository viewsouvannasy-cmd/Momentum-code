import { Link, useParams } from "react-router";
import { addAndRemoveTransition } from "../../utils/addAndRemoveTransition.ts";
import { FullLogo } from "../logo/FullLogo";
import "./NavBarApp.css";

interface NavBarProp {
  isOpenNavBar: string;
  setIsOpenNavBar: (param: string) => void;
}

export function NavBarApp({ isOpenNavBar, setIsOpenNavBar }: NavBarProp) {
  const { section } = useParams();

  function handleToggleNavBar() {
    addAndRemoveTransition();
    const next = isOpenNavBar === "open" ? "close" : "open";
    setIsOpenNavBar(next);
    localStorage.setItem("navbar", next);
  }

  return (
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
            <button>
              <img src="/icon/add.png" />
            </button>
          </div>
          <div className="container-group-list-item">
            <div className="group-list-item">Learning</div>
            <div className="group-list-item">Learning</div>
          </div>
        </div>
      </div>
      <div>
        <img src="/profile.jpg" />
        <div>
          <p>view</p>
          <span>viewsouvannasy@gmail.com</span>
        </div>
      </div>
    </nav>
  );
}
