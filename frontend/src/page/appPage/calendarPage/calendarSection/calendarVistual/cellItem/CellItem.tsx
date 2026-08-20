import { findTodayDate } from "../../../util/checkDate";
import { getClassNameCellCalendarMain } from "../../../util/checkDate";
import { checkIsPastDate } from "../../../util/checkDate";
import { ItemTaskDate } from "./itemTaskDate/ItemTaskDate";
import useSelectDateCell from "../../../context/useSelectDateOnCalendar";
import useSideDrawerCalendar from "../../../context/useOpenSideDrawerCalendar";
import useTaskDate from "../../../../../../api/task-date/useTaskDate";
import dayjs from "dayjs";
import "./CellItem.css";

interface CellItemProp {
  cellId: string;
  date: number;
}

export function CellItem({ cellId, date }: CellItemProp) {
  const { selectDateCell } = useSelectDateCell();
  const { openSideDrawer } = useSideDrawerCalendar();

  const { taskDateData } = useTaskDate();

  function hadnleSelectCellDate(cellId: string) {
    if (checkIsPastDate(cellId)) {
      return;
    }

    selectDateCell(cellId);
    openSideDrawer();
  }

  const isToday = findTodayDate(cellId);
  // filter date that equal to cell id
  const filterData = taskDateData.filter(
    (item) => dayjs(item.task_date).format("YYYY-MM-D") === cellId,
  );
  return (
    <div
      role="button"
      onClick={() => hadnleSelectCellDate(cellId)}
      className={getClassNameCellCalendarMain(cellId)}
    >
      <div>
        <p className={`number-cell ${isToday ? "today" : ""}`}>{date}</p>

        <button type="button">
          <img src="/icon/add.png" />
        </button>
      </div>

      <div className="container-item-task-calendar">
        {filterData.map((item) => {
          return <ItemTaskDate key={item.date_id} item={item} />;
        })}
      </div>
    </div>
  );
}
