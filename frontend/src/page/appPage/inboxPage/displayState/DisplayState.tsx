import { DisplayItemToDo } from "./displayItemToDo/DisplayItemToDo";
import "./DisplayState.css";

interface DisplaystateProp {
  state: "todo" | "doing" | "done";
}

export function DisplayState({ state }: DisplaystateProp) {
  return (
    <div className={`container-todo-state todo`}>
      <div>
        <div>
          <h3>
            {state === "todo" && "To Do"}
            {state === "doing" && "In Process"}
            {state === "done" && "Completed"}
          </h3>
          <span>1 items</span>
        </div>
      </div>
      <div>
        <DisplayItemToDo state={state} />
      </div>
    </div>
  );
}
