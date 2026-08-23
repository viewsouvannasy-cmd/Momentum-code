//library
import { useState } from "react";
import dayjs from "dayjs";

// api
import useTaskDate from "../../../../api/task-date/useTaskDate";

// context api
import usePopup from "../../../../context/usePopup";
import useSelectTaskDateEdit from "../../../../page/appPage/calendarPage/context/useSelectTaskDateEdit";

// components
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import { ClockIcon } from "../../../icon-svg/clock-icon";
import { LoadButton } from "../../../load-button/LoadButton";

// helper function
import { calculateSpendingTime } from "../../../../page/appPage/calendarPage/util/calculateTime";

// css
import "./PopupChangeTime.css";

export function PopupChangeTime() {
  const { isOpenPopup, isAnimation, closePopup } = usePopup();

  const { isLoadingPost, editTimeTaskDate } = useTaskDate();

  const { taskDateSelectEdit, handleSelectTaskDateEdit } =
    useSelectTaskDateEdit();

  const [isOpenDropDown, setIsOpenDropDown] = useState<"start" | "end" | null>(
    null,
  );

  const start = taskDateSelectEdit?.start_time.split(":").slice(0, 2).join(":");
  const end = taskDateSelectEdit?.end_time.split(":").slice(0, 2).join(":");
  const [inputTime, setInputTime] = useState({
    start_time: start ? start : "09:00",
    end_time: end ? end : "13:00",
  });

  function handleInputTime(
    value: string,
    edit: "start" | "end",
    which: "h" | "m",
  ) {
    const prev = { ...inputTime };
    const index = which === "h" ? 0 : 1;

    if (edit === "start") {
      const newTime = prev.start_time.split(":");
      newTime[index] = value;
      prev.start_time = newTime.join(":");
      setInputTime(prev);
      return;
    }

    const newTime = prev.end_time.split(":");
    newTime[index] = value;
    prev.end_time = newTime.join(":");
    setInputTime(prev);
  }

  const handleEditTimeTaskDate = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (taskDateSelectEdit) {
      await editTimeTaskDate(
        taskDateSelectEdit?.group_id,
        taskDateSelectEdit?.task_id,
        taskDateSelectEdit?.date_id,
        inputTime.start_time,
        inputTime.end_time,
      );
      closePopup();
      handleSelectTaskDateEdit(null);
    }
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "change-time" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleEditTimeTaskDate}
        className={`container-popup-change-time-task-date ${isAnimation}`}
      >
        <div>
          <div>
            <h2>Change new Time</h2>
            <button type="button" onClick={closePopup}>
              <CloseXButton />
            </button>
          </div>
          <span>
            For {taskDateSelectEdit?.task_name} on{" "}
            {dayjs(taskDateSelectEdit?.task_date).format("YYYY-MM-DD")}
          </span>
        </div>
        <div>
          <div>
            <label>Start Time</label>
            <div
              role="button"
              onClick={() =>
                setIsOpenDropDown(
                  !isOpenDropDown || isOpenDropDown === "end" ? "start" : null,
                )
              }
            >
              {inputTime.start_time}
              <ClockIcon />
              {isOpenDropDown === "start" && (
                <div className="drop-down-input-time-popup">
                  <div>
                    <p>HOUR</p>
                    <div>
                      {new Array(24).fill(null).map((_, index) => {
                        const formatIndex =
                          index < 10 ? `0${index}` : `${index}`;
                        return (
                          <button
                            key={formatIndex}
                            type="button"
                            onClick={() =>
                              handleInputTime(formatIndex, "start", "h")
                            }
                            className={`${
                              formatIndex === inputTime.start_time.split(":")[0]
                                ? "btn-select-time-drop-down-selected"
                                : "btn-select-time-drop-down"
                            }`}
                          >
                            {formatIndex}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p>MIN</p>
                    <div>
                      {new Array(12).fill(null).map((_, index) => {
                        const formatIndex =
                          index * 5 < 10 ? `0${index * 5}` : `${index * 5}`;
                        return (
                          <button
                            key={formatIndex}
                            onClick={() =>
                              handleInputTime(formatIndex, "start", "m")
                            }
                            type="button"
                            className={`${
                              formatIndex === inputTime.start_time.split(":")[1]
                                ? "btn-select-time-drop-down-selected"
                                : "btn-select-time-drop-down"
                            }`}
                          >
                            {formatIndex}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <span>To</span>
          <div>
            <label>end Time</label>
            <div
              role="button"
              onClick={() =>
                setIsOpenDropDown(
                  !isOpenDropDown || isOpenDropDown === "start" ? "end" : null,
                )
              }
            >
              {inputTime.end_time}
              <ClockIcon />
              {isOpenDropDown === "end" && (
                <div className="drop-down-input-time-popup">
                  <div>
                    <p>HOUR</p>
                    <div>
                      {new Array(24).fill(null).map((_, index) => {
                        const formatIndex =
                          index < 10 ? `0${index}` : `${index}`;
                        return (
                          <button
                            key={formatIndex}
                            onClick={() =>
                              handleInputTime(formatIndex, "end", "h")
                            }
                            type="button"
                            className={`${
                              formatIndex === inputTime.end_time.split(":")[0]
                                ? "btn-select-time-drop-down-selected"
                                : "btn-select-time-drop-down"
                            }`}
                          >
                            {formatIndex}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p>MIN</p>
                    <div>
                      {new Array(12).fill(null).map((_, index) => {
                        const formatIndex =
                          index * 5 < 10 ? `0${index * 5}` : `${index * 5}`;
                        return (
                          <button
                            key={formatIndex}
                            onClick={() =>
                              handleInputTime(formatIndex, "end", "m")
                            }
                            type="button"
                            className={`${
                              formatIndex === inputTime.end_time.split(":")[1]
                                ? "btn-select-time-drop-down-selected"
                                : "btn-select-time-drop-down"
                            }`}
                          >
                            {formatIndex}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            {calculateSpendingTime(inputTime.start_time, inputTime.end_time)}
          </div>
        </div>
        <button
          type="submit"
          className={
            !isLoadingPost
              ? "btn-submit-edit-time-task-date"
              : "btn-submit-edit-time-task-date-load"
          }
          disabled={isLoadingPost}
        >
          {isLoadingPost && <LoadButton />}
          {!isLoadingPost && "Save"}
        </button>
      </form>
    </div>
  );
}
