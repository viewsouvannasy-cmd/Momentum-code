import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { checkUser } from "../../../store/auth/checkUse.ts";
import { FullLogo } from "../../../components/logo/FullLogo";
import { LoadButton } from "../../../components/load-button/LoadButton";
import "./HeaderLanding.css";

type prop = {
  isScroll: number;
};

type fetchResult = {
  success: boolean;
  results: { user_name: string; user_email: string }[];
  msg?: string;
};

export function HeaderLanding({ isScroll }: prop) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchCheckUser = async () => {
    setIsLoading(true);
    const checkResult = await checkUser();
    handleToPage(checkResult);
  };

  function handleToPage(data: fetchResult) {
    if (data.success) {
      window.open("app/inbox", "_blank", "noopener,noreferrer");
      setIsLoading(false);
      return;
    }
    navigate("/login");
    setIsLoading(false);
  }

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
        <button className="link-log-in-page" onClick={handleFetchCheckUser}>
          {!isLoading ? "Log in" : <LoadButton />}
        </button>

        <Link className="link-sign-up-page" to="sign">
          Sign up
        </Link>
      </div>
    </div>
  );
}
