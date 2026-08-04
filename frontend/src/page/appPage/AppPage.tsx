import { useParams } from "react-router";
import { useState } from "react";
import { NavBarApp } from "../../components/nav-bar-app/NavBarApp";
import { AppInboxPage } from "./inboxPage/AppInboxPage";

export function AppPage() {
  const { section } = useParams();
  const [isOpenNavBar, setIsOpenNavBar] = useState<string>(() => {
    return localStorage.getItem("navbar") || "open";
  });

  return (
    <>
      <NavBarApp
        isOpenNavBar={isOpenNavBar}
        setIsOpenNavBar={setIsOpenNavBar}
      />

      {section === "inbox" && <AppInboxPage isOpenNavBar={isOpenNavBar} />}
    </>
  );
}
