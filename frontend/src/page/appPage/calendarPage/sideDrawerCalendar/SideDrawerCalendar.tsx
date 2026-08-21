import { useState } from "react";
import { SideDrawerHeader } from "./sideDrawerHeader/sideDrawerHeader";
import { SideDrawerAddTaskSection } from "./sideDrawerAddTaskSection/SideDrawerAddTaskSection";
import { SideDrawerSelectDate } from "./sideDrawerSelectDate/SideDrawerSelectDate";
import { SideDrawerSetTime } from "./sideDrawerSetTime/SideDrawerSetTime";
import { SideDrawerFooter } from "./sideDrawerFooter/SideDrawerFooter";
import useSideDrawerCalendar from "../context/useOpenSideDrawerCalendar";
import useMainTime from "../context/useMainTime";
import useSelectDateCell from "../context/useSelectDateOnCalendar";
import useSelectTask from "../context/useSelectTask";
import useTaskDate from "../../../../api/task-date/useTaskDate";
import useTask from "../../../../api/task/useTask";

import "./SideDrawerCalendar.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

export function SideDrawerCalendar() {
  const { isOpenSideDrawer, isAnimationSideDrawer, closeSideDrawer } =
    useSideDrawerCalendar();

  // this is use to date on mini vistual calendar in side drawer
  const { cellSelected } = useSelectDateCell();

  // store task that user wanna add date to
  const { taskSelected, selectTask } = useSelectTask();

  const { addDate } = useTaskDate();

  const { moveTo } = useTask();

  const [isLoadingPost, setIsLoadingPost] = useState(false);

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
  // this is use to adjust date on mini calendar
  // to equal date that user pick on cell calendar
  // if don't this code date that user pick will not equal mini calendar
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

  const handleAddDate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingPost(true);

    // clear isEdit out
    const arrDate = isArraySelectDate.map((item) => {
      return {
        date: item.date,
        start_time: item.start_time,
        end_time: item.end_time,
      };
    });
    if (taskSelected) {
      // change task status to doing if it have status todo
      if (taskSelected.task_status === "todo") {
        await moveTo(taskSelected.group_id, taskSelected.task_id, "doing");
      }

      await addDate(taskSelected.group_id, taskSelected.task_id, arrDate);
      closeSideDrawer();
      setIsArraySelectDate([
        {
          date: cellSelected,
          start_time: start_time_main,
          end_time: end_time_main,
          isEdit: false,
        },
      ]);
      selectTask(null);
      setIsLoadingPost(false);
    }
  };

  return (
    <div
      className={`container-background-overlay-side-drawer ${isAnimationSideDrawer}`}
      style={{
        display: isOpenSideDrawer ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleAddDate}
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

        <SideDrawerFooter
          isArraySelectDate={isArraySelectDate}
          isLoadingPost={isLoadingPost}
        />
      </form>
    </div>
  );
}
