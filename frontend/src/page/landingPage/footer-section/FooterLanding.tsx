import { Link } from "react-router";

import useToggleTheme from "../../../store/theme/useToggleTheme.ts";
import "./FooterLanding.css";

export function FooterLanding() {
  const { themeColor, toggle } = useToggleTheme();

  return (
    <div className="cnotainer-footer-section-main" id="contact-section">
      <div className="container-footer-section">
        <div className="box-footer-left">
          <h2>Your first Momentum is one tap away</h2>
          <div>
            <a href="#home-section">
              <img src={`/logo/logo-momentum-${themeColor}.png`} />
              Momentum
            </a>
            <a
              href="https://github.com/viewsouvannasy-cmd/Momentum-code"
              target="_blank"
            >
              <img src={`/icon/github-${themeColor}.png`} />
              GitHub
            </a>
            <a>
              <img src={`/icon/email-${themeColor}.png`} />
              viewsouvannasy@email.com
            </a>
            <button onClick={() => toggle()}>
              <img
                src={`/icon/${themeColor === "black" ? "light-mode" : "dark-mode"}.png`}
              />
              Light mode
            </button>
          </div>
        </div>
        <div className="box-footer-right">
          <div>
            <div>
              <h2>02</h2>
              <span>Days</span>
            </div>
            <div>
              <h2>20</h2>
              <span>Hours</span>
            </div>
            <div>
              <h2>02</h2>
              <span>Minutes</span>
            </div>
            <div>
              <h2>02</h2>
              <span>Seonds</span>
            </div>
          </div>

          <Link className="link-sign-up" to="/sign">
            Get Start
          </Link>
        </div>
      </div>
    </div>
  );
}
