// library
import { useEffect } from "react";

// components
import { ShowTaskDate } from "../../../components/showTaskDate/ShowTaskDate";

// api
import useTaskDate from "../../../api/task-date/useTaskDate";

// helper function
import { getToday } from "../calendarPage/util/getDate";

export function TodayListPage() {
  const { taskDataFilterDate, getFilterByDate } = useTaskDate();

  useEffect(() => {
    document.title = "Today";
    getFilterByDate(getToday());
  }, [getFilterByDate]);

  return (
    <ShowTaskDate
      page="today-list"
      data={taskDataFilterDate}
      date={getToday()}
    />
  );
}
