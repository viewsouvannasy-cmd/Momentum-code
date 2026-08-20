import axios from "axios";
import { fetchRefreshToken } from "../auth";
import { getAccessToken } from "../../store/token/accessToken";

interface DateType {
  date: string;
  start_time: string;
  end_time: string;
}

const getFilterMonthYear = async (month: string, year: string) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(
      `http://localhost:4000/api/task-date/get?month=${month}&&year=${year}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return getFilterMonthYear(month, year);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const addDate = async (
  group_id: number,
  task_id: number,
  arrDate: DateType[],
) => {
  try {
    const accessToken = getAccessToken();
    await axios.post(
      `http://localhost:4000/api/task-date/add/${group_id}/${task_id}`,
      { dates: arrDate },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return addDate(group_id, task_id, arrDate);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const deleteTaskDate = async (
  group_id: number,
  task_id: number,
  date_id: number,
) => {
  try {
    const accessToken = getAccessToken();
    await axios.delete(
      `http://localhost:4000/api/task-date/delete/${group_id}/${task_id}/${date_id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return deleteTaskDate(group_id, task_id, date_id);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const deleteAllTaskDate = async (group_id: number, task_id: number) => {
  try {
    const accessToken = getAccessToken();
    await axios.delete(
      `http://localhost:4000/api/task-date/delete-all/${group_id}/${task_id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return deleteAllTaskDate(group_id, task_id);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

export { getFilterMonthYear, addDate, deleteTaskDate, deleteAllTaskDate };
