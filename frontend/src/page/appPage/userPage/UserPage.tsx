// components
import { BtnOpenNavBarMB } from "../../../components/button-open-navber-mp/BtnOpenNavBarMB";

// css
import "./UserPage.css";

export function UserPage() {
  return (
    <div className="container-user-page-main">
      <div className="container-user-page">
        <div>
          <BtnOpenNavBarMB />
          <span>My Profile</span>
        </div>
        <div className="container-card-user-info">
          <div>
            <div role="button">
              <img src="/profile.jpg" />
            </div>
            <div>
              <h2>BoB</h2>
              <span>email</span>
            </div>
          </div>
          <div>
            <div>
              <label>Name</label>
              <div>bob</div>
            </div>
            <div>
              <label>Email</label>
              <div>view@</div>
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>•••••••••</div>
          </div>
        </div>
        <button>Log Out</button>
      </div>
    </div>
  );
}
