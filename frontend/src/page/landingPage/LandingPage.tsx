import { useState, useEffect } from "react";
import { HeaderLanding } from "./header-landing-section/HeaderLanding";
import { TitleLanding } from "./title-landing-section/TitleLanding";
import "./LandingPage.css";

export function LandingPage() {
  const [isScroll, setIsScroll] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container-landing-main">
      <HeaderLanding isScroll={isScroll} />
      <TitleLanding />
    </div>
  );
}
