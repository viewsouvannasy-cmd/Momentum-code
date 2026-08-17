import { ButtonArrow } from "../../../../../components/button-icon/ButtonArrow";
import { checkDateLowThenUserDate } from "../../util/checkDate.ts";
import useUser from "../../../../../api/user-data/useUser.ts";
import useSideDrawerCalendar from "../../context/useOpenSideDrawerCalendar.ts";
import useSelectDateCell from "../../context/useSelectDateOnCalendar.ts";
import dayjs from "dayjs";

import "./CalendarSelectPage.css";

interface CalendarSelectPageProp {
  isDate: Date;
  setIsDate: (param: Date) => void;
}

export function CalendarSelectPage({
  isDate,
  setIsDate,
}: CalendarSelectPageProp) {
  const { selectDateCell } = useSelectDateCell();

  // this context api is use to toggle side drawer
  const { openSideDrawer } = useSideDrawerCalendar();

  const { userData } = useUser();

  const formatDate = dayjs(isDate).format("YYYY, MMMM");

  function handleToNextPage() {
    const next = new Date(isDate);
    next.setMonth(next.getMonth() + 1);
    setIsDate(next);
  }

  function handleBackToPage() {
    if (!checkDateLowThenUserDate(isDate.getTime(), userData[0]?.created_at)) {
      return;
    }
    const next = new Date(isDate);
    next.setMonth(next.getMonth() - 1);
    setIsDate(next);
  }

  function handleOpenSideDrawer() {
    const today = dayjs(new Date()).format("YYYY-MM-D");

    selectDateCell(today);
    openSideDrawer();
  }

  return (
    <div className="container-calendar-select-page">
      <div>
        <button onClick={handleBackToPage}>
          <ButtonArrow />
        </button>
        <span>{formatDate}</span>
        <button onClick={handleToNextPage}>
          <ButtonArrow />
        </button>
      </div>
      <button onClick={() => handleOpenSideDrawer()}>+ Let Plan</button>
    </div>
  );
}
