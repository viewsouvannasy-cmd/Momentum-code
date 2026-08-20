import useSelectTask from "../../context/useSelectTask";
import useSideDrawerCalendar from "../../context/useOpenSideDrawerCalendar";
import { LoadButton } from "../../../../../components/load-button/LoadButton";
import "./SideDrawerFooter.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface SideDrawerFooterProp {
  isArraySelectDate: SelectDateType[];
  isLoadingPost: boolean;
}

export function SideDrawerFooter({
  isArraySelectDate,
  isLoadingPost,
}: SideDrawerFooterProp) {
  const { taskSelected } = useSelectTask();

  const { closeSideDrawer } = useSideDrawerCalendar();

  return (
    <div className="container-side-drawer-footer">
      <button type="button" onClick={closeSideDrawer}>
        Cancel
      </button>
      {!isLoadingPost && (
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
      )}
      {isLoadingPost && (
        <button className="loading-add-date-btn" disabled={true}>
          <LoadButton />
        </button>
      )}
    </div>
  );
}
