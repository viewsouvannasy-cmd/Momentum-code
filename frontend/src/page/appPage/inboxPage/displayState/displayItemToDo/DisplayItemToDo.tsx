import "./DisplayItemToDo.css";

interface DisplayItemToDoProp {
  state: "todo" | "doing" | "done";
}

export function DisplayItemToDo({ state }: DisplayItemToDoProp) {
  return (
    <div className={`item-to-do-list ${state}`}>
      <div></div>
      <div>
        <span>
          {state === "todo" && "To Do"}
          {state === "doing" && "Doing"}
          {state === "done" && "Done"}
        </span>
        <p>i will create a super cool project to get interview</p>
        <div className="container-display-item-group-list">
          <div className="item-group-list-in-card">Learning</div>
          <div className="item-group-list-in-card">Learning</div>
          <div className="item-group-list-in-card">Learning</div>
          <div className="item-group-list-in-card">Learning</div>
        </div>
      </div>
      {state === "done" ? (
        <></>
      ) : (
        <button>
          <img src="/icon/add.png" />
        </button>
      )}
    </div>
  );
}
