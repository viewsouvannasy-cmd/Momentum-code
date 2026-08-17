import "./SideDrawerFooter.css";
import useSelectTask from "../../context/useSelectTask";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface SideDrawerFooterProp {
  isArraySelectDate: SelectDateType[];
}

export function SideDrawerFooter({ isArraySelectDate }: SideDrawerFooterProp) {
  const { taskSelected } = useSelectTask();

  return (
    <div className="container-side-drawer-footer">
      <button type="button">Cancel</button>
      <button
        type="submit"
        className={
          !taskSelected ? "schedule-date-btn-not-allow" : "schedule-date-btn"
        }
        disabled={!taskSelected ? true : false}
      >
        {isArraySelectDate.length > 1
          ? `Schedule ${isArraySelectDate.length} on dates`
          : "Schedule it"}
      </button>
    </div>
  );
}
