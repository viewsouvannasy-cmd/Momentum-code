import useMainTime from "../../page/appPage/calendarPage/context/useMainTime";
import { setTimeAllDate } from "../../page/appPage/calendarPage/util/calculateTime";
import "./DropDownSelectDate.css";

interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

interface DropDownSelectDateProp {
  itemDate?: SelectDateType;
  time: string;
  edit: "main" | "specific";
  addTo: "start_time" | "end_time" | "start_time_main" | "end_time_main";
  isArraySelectDate: SelectDateType[];
  setIsArraySelectDate: (param: SelectDateType[]) => void;
}

export function DropDownSelectDate({
  itemDate,
  time,
  edit,
  addTo,
  isArraySelectDate,
  setIsArraySelectDate,
}: DropDownSelectDateProp) {
  const { start_time_main, end_time_main, changeMainTime } = useMainTime();

  function setMainTime(value: string, which: "m" | "h") {
    const index = which === "h" ? 0 : 1;
    let newStart = start_time_main;
    let newEnd = end_time_main;

    if (addTo === "start_time_main") {
      const newTime = start_time_main.split(":");
      newTime[index] = value;
      newStart = newTime.join(":");
      changeMainTime(newStart, "start_time_main");
    } else {
      const newTime = end_time_main.split(":");
      newTime[index] = value;
      newEnd = newTime.join(":");
      changeMainTime(newEnd, "end_time_main");
    }
    const newSet = setTimeAllDate(isArraySelectDate, newStart, newEnd);
    setIsArraySelectDate(newSet);
  }

  function setForSpecificDate(value: string, which: "h" | "m") {
    if (!itemDate || addTo === "end_time_main" || addTo === "start_time_main") {
      return;
    }

    const index = which === "h" ? 0 : 1;
    const newSet = isArraySelectDate.map((i) => {
      if (i.date === itemDate.date) {
        const updateTime = i[addTo].split(":");
        updateTime[index] = value;
        const newTime = updateTime.join(":");
        if (addTo === "start_time") {
          return {
            date: i.date,
            start_time: newTime,
            end_time: i.end_time,
            isEdit: i.isEdit,
          };
        }
        return {
          date: i.date,
          start_time: i.start_time,
          end_time: newTime,
          isEdit: i.isEdit,
        };
      }

      return i;
    });

    setIsArraySelectDate(newSet);
  }

  return (
    <div className="container-drop-down-select-date">
      <div>
        <p>HOUR</p>
        <div className={`container-select-hour`}>
          {new Array(24).fill(null).map((item, index) => {
            const h = index < 10 ? `0${index}` : String(index);
            const checkSelect = time.split(":")[0] === h;
            return (
              <button
                key={h}
                onClick={
                  edit === "main"
                    ? () => setMainTime(h, "h")
                    : () => setForSpecificDate(h, "h")
                }
                className={`button-select-hour ${checkSelect && "selected"}`}
                type="button"
              >
                {h}
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p>MIN</p>
        <div className="container-select-min">
          {new Array(12).fill(null).map((item, index) => {
            const m = index * 5 < 10 ? `0${index * 5}` : String(index * 5);
            const checkSelect = time.split(":")[1] === m;
            return (
              <button
                key={m}
                onClick={
                  edit === "main"
                    ? () => setMainTime(m, "m")
                    : () => setForSpecificDate(m, "m")
                }
                className={`button-select-minutes ${checkSelect && "selected"}`}
                type="button"
              >
                {m}
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
