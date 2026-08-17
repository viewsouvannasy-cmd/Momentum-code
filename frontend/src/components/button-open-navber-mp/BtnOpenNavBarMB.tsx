import "./BtnOpenNavBarMB.css";
import useSideBarMb from "../../context/useSideBarMb";

export function BtnOpenNavBarMB() {
  const { openSideBarMb } = useSideBarMb();

  return (
    <button className="btn-open-nav-bar-mp" onClick={openSideBarMb}>
      <img src="/icon/sidebar.png" />
    </button>
  );
}
