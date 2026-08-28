import { fetchRefreshToken } from "../auth.ts";
import axios from "axios";
import { checkAccessToken } from "../../store/token/accessToken.ts";
import { getHostServer } from "../../utils/getENV.ts";

const getTaskData = async () => {
  try {
    const serverHost = getHostServer();

    const accessToken = await checkAccessToken();
    const response = await axios.get(`${serverHost}/api/task/get`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return getTaskData();
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const addNewTask = async (group_id: number, task_name: string) => {
  try {
    const serverHost = getHostServer();

    const accessToken = await checkAccessToken();
    await axios.post(
      `${serverHost}/api/task/add`,
      {
        group_id: group_id,
        task_name: task_name,
        task_status: "todo",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return addNewTask(group_id, task_name);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const moveToState = async (
  group_id: number,
  task_id: number,
  toState: string,
) => {
  try {
    const serverHost = getHostServer();

    const accessToken = await checkAccessToken();
    await axios.put(
      `${serverHost}/api/task/move`,
      {
        group_id: group_id,
        task_id: task_id,
        toState: toState,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return moveToState(group_id, task_id, toState);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

const deleteTask = async (group_id: number, task_id: number) => {
  try {
    const serverHost = getHostServer();

    const accessToken = await checkAccessToken();
    await axios.delete(`${serverHost}/api/task/delete/${group_id}/${task_id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return deleteTask(group_id, task_id);
      }
      console.log(error);
      window.open("/error");
    }
  }
};

export { getTaskData, addNewTask, moveToState, deleteTask };
