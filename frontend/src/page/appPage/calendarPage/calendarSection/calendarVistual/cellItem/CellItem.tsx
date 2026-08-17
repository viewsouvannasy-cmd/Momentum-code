import { findTodayDate } from "../../../util/checkDate";
import { getClassNameCellCalendarMain } from "../../../util/checkDate";
import { checkIsPastDate } from "../../../util/checkDate";
import useSelectDateCell from "../../../context/useSelectDateOnCalendar";
import useSideDrawerCalendar from "../../../context/useOpenSideDrawerCalendar";
import "./CellItem.css";

interface CellItemProp {
  cellId: string;
  date: number;
}

export function CellItem({ cellId, date }: CellItemProp) {
  const { selectDateCell } = useSelectDateCell();
  const { openSideDrawer } = useSideDrawerCalendar();

  function hadnleSelectCellDate(cellId: string) {
    if (checkIsPastDate(cellId)) {
      return;
    }

    selectDateCell(cellId);
    openSideDrawer();
  }

  const isToday = findTodayDate(cellId);
  return (
    <div
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
        <div>
          <div></div>
          <div>
            <p>will create a cool project</p>
            <span>12:00 - 13:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
