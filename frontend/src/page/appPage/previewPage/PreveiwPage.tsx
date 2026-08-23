// library
import { useEffect } from "react";

// api
import useTaskDate from "../../../api/task-date/useTaskDate";

// components
import { ShowTaskDate } from "../../../components/showTaskDate/ShowTaskDate";

export function PreviewPage({ date }: { date: string }) {
  const { taskDataFilterDate, getFilterByDate } = useTaskDate();

  useEffect(() => {
    document.title = `Preview - ${date}`;
    getFilterByDate(date);
  }, [getFilterByDate, date]);

  return <ShowTaskDate page="preview" data={taskDataFilterDate} date={date} />;
}
