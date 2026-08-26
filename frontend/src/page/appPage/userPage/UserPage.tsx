// api
import useUser from "../../../api/user-data/useUser";

// context api
import usePopup from "../../../context/usePopup";

// components
import { BtnOpenNavBarMB } from "../../../components/button-open-navber-mp/BtnOpenNavBarMB";
import { PopupChangeProfile } from "../../../components/popup/popupUser/popup-change-profile/PopupChangeProfile";
import { PopupChangeUserName } from "../../../components/popup/popupUser/pop-chnage-name-user/PopupChangeUserName";
import { PopupChangePasswoed } from "../../../components/popup/popupUser/popup-change-password/PopupChangePassword";

// css
import "./UserPage.css";

export function UserPage() {
  const { openPopup } = usePopup();

  const { userData } = useUser();

  return (
    <>
      <div className="container-user-page-main">
        <div className="container-user-page">
          <div>
            <BtnOpenNavBarMB />
            <span>My Profile</span>
          </div>
          <div className="container-card-user-info">
            <div>
              <div role="button" onClick={() => openPopup("change-profile")}>
                <img src={userData[0]?.user_profile ?? "/profile.jpg"} />
              </div>
              <div>
                <h2>{userData[0]?.user_name}</h2>
                <span>{userData[0]?.user_email}</span>
              </div>
            </div>
            <div>
              <label>Name</label>
              <div role="button" onClick={() => openPopup("change-user-name")}>
                {userData[0]?.user_name}
              </div>
            </div>
            <div>
              <label>Password</label>
              <div role="button" onClick={() => openPopup("change-password")}>
                •••••••••
              </div>
            </div>
          </div>
          <button>Log Out</button>
        </div>
      </div>

      <PopupChangeProfile />
      <PopupChangeUserName />
      <PopupChangePasswoed />
    </>
  );
}
