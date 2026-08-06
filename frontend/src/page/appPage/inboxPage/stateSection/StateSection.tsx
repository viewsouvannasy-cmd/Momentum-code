import { DisplayState } from "../groupListSection/displayState/DisplayState";
import "./StateSection.css";

export function StateSection() {
  return (
    <div className="container-to-do-list-state">
      <div>
        <h3>My Momentum</h3>
        <div>
          <button>Undo</button>
          <button>+ Add task</button>
        </div>
      </div>
      <div>
        <DisplayState state="todo" />
        <DisplayState state="doing" />
        <DisplayState state="done" />
      </div>
    </div>
  );
}
