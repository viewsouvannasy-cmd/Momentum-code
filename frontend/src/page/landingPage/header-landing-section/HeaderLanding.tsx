import { Link } from "react-router";

import { FullLogo } from "../../../components/logo/FullLogo";
import "./HeaderLanding.css";

type prop = {
  isScroll: number;
};

export function HeaderLanding({ isScroll }: prop) {
  return (
    <div className={`container-header-landing ${isScroll > 0 && "add"}`}>
      <div className="header-left-section">
        <FullLogo />
      </div>
      <div className="header-middle-section">
        <a href="#home-section">Home</a>
        <a href="#about-section">About</a>
        <a href="#featrue-section">Featrue</a>
        <a href="#contact-section">Contact</a>
      </div>
      <div className="header-right-section">
        <Link className="link-log-in-page" to="/login">
          Log in
        </Link>
        <Link className="link-sign-up-page" to="sign">
          Sign up
        </Link>
      </div>
    </div>
  );
}
