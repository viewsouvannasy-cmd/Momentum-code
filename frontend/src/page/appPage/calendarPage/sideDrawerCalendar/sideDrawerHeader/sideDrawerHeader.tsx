import { CloseXButton } from "../../../../../components/close-x-button/CloseXButton";
import useSideDrawerCalendar from "../../context/useOpenSideDrawerCalendar";
import useSelectTask from "../../context/useSelectTask";
import "./sideDrawerHeader.css";

export function SideDrawerHeader() {
  const { closeSideDrawer } = useSideDrawerCalendar();

  const { taskSelected } = useSelectTask();

  return (
    <div className="container-set-date-for-task-header">
      <div>
        <p>{!taskSelected ? "Pick a task" : "When do you do it?"}</p>
        <span>
          {!taskSelected
            ? "Choose from your To Do list to schedule it"
            : "choose date & time"}
        </span>
      </div>
      <button type="button" onClick={closeSideDrawer}>
        <CloseXButton />
      </button>
    </div>
  );
}
