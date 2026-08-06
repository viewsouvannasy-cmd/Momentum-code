import "./InboxHeader.css";

interface InboxHeaderProp {
  setIsBackgroundOverlyMB: (param: string) => void;
  setIsOpenNavBarMB: (param: string) => void;
}

export function InboxHeader({
  setIsBackgroundOverlyMB,
  setIsOpenNavBarMB,
}: InboxHeaderProp) {
  function handleOpenNavBarMB() {
    setIsBackgroundOverlyMB("open");
    setIsOpenNavBarMB("open");
  }

  return (
    <div className="container-inbox-section-header">
      <button onClick={handleOpenNavBarMB}>
        <img src="/icon/sidebar.png" />
      </button>
      <div>
        <h1>Inbox, view</h1>
        <span>what do you want to update today</span>
      </div>
    </div>
  );
}
