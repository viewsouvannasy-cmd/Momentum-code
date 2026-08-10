import "./BtnOpenNavBarMB.css";

interface BtnOpenNavBarMBProp {
  setIsBackgroundOverlyMB: (param: string) => void;
  setIsOpenNavBarMB: (param: string) => void;
}

export function BtnOpenNavBarMB({
  setIsBackgroundOverlyMB,
  setIsOpenNavBarMB,
}: BtnOpenNavBarMBProp) {
  function handleOpenNavBarMB() {
    setIsBackgroundOverlyMB("open");
    setIsOpenNavBarMB("open");
  }

  return (
    <button className="btn-open-nav-bar-mp" onClick={handleOpenNavBarMB}>
      <img src="/icon/sidebar.png" />
    </button>
  );
}
