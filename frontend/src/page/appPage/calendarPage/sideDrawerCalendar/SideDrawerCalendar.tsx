import { useState } from "react";
import { SideDrawerHeader } from "./sideDrawerHeader/sideDrawerHeader";
import { SideDrawerAddTaskSection } from "./sideDrawerAddTaskSection/SideDrawerAddTaskSection";
import { SideDrawerSelectDate } from "./sideDrawerSelectDate/SideDrawerSelectDate";
import { SideDrawerSetTime } from "./sideDrawerSetTime/SideDrawerSetTime";
import { SideDrawerFooter } from "./sideDrawerFooter/SideDrawerFooter";
import useSideDrawerCalendar from "../context/useOpenSideDrawerCalendar";
import useMainTime from "../context/useMainTime";
import useSelectDateCell from "../context/useSelectDateOnCalendar";

import "./SideDrawerCalendar.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

export function SideDrawerCalendar() {
  const { isOpenSideDrawer, isAnimationSideDrawer } = useSideDrawerCalendar();

  const { cellSelected } = useSelectDateCell();

  // this a main time start end every date will set
  // this first by default
  const { start_time_main, end_time_main } = useMainTime();

  const [prevCellSelected, setPrevCellSelected] = useState(cellSelected);
  const [isArraySelectDate, setIsArraySelectDate] = useState<SelectDateType[]>([
    {
      date: cellSelected,
      start_time: start_time_main,
      end_time: end_time_main,
      isEdit: false,
    },
  ]);
  if (cellSelected !== prevCellSelected) {
    setPrevCellSelected(cellSelected);
    setIsArraySelectDate([
      {
        date: cellSelected,
        start_time: start_time_main,
        end_time: end_time_main,
        isEdit: false,
      },
    ]);
  }

  return (
    <div
      className={`container-background-overlay-side-drawer ${isAnimationSideDrawer}`}
      style={{
        display: isOpenSideDrawer ? "flex" : "none",
      }}
    >
      <form
        className={`container-set-date-for-task-main ${isAnimationSideDrawer}`}
      >
        <SideDrawerHeader />

        <div>
          <SideDrawerAddTaskSection />

          <SideDrawerSelectDate
            isArraySelectDate={isArraySelectDate}
            setIsArraySelectDate={setIsArraySelectDate}
          />

          <SideDrawerSetTime
            isArraySelectDate={isArraySelectDate}
            setIsArraySelectDate={setIsArraySelectDate}
          />
        </div>

        <SideDrawerFooter isArraySelectDate={isArraySelectDate} />
      </form>
    </div>
  );
}
