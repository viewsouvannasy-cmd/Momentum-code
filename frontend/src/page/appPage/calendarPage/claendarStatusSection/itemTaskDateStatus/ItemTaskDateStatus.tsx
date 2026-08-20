import { ZoomIcon } from "../../../../../components/icon-svg/zoom-icon";
import "./ItemTaskDateStatus.css";

interface ItemTaskDateStatusProp {
  status: "wait" | "today" | "miss" | "do";
}

export function ItemTaskDateStatus({ status }: ItemTaskDateStatusProp) {
  return (
    <div className="item-task-date-status">
      <div>
        <p>Learn react native to create mobile application</p>
        <div>
          <div>Learning</div>
          <span>12:20 &#183; 13:30</span>
        </div>
      </div>
      <div>
        <button>
          <ZoomIcon />
        </button>
      </div>
    </div>
  );
}
