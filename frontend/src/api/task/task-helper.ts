import axios from "axios";
import { checkAccessToken } from "../../store/token/accessToken.ts";

const getTaskData = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.get("http://localhost:4000/api/task/get", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const addNewTask = async (group_id: string, taks_name: string) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.post(
      "http://localhost:4000/api/task/add",
      {
        group_id: group_id,
        task_name: taks_name,
        task_status: "todo",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const moveToState = async (
  group_id: string,
  task_id: string,
  toState: string,
) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.put(
      "http://localhost:4000/api/task/move",
      {
        group_id: group_id,
        task_id: task_id,
        toState: toState,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const deleteTask = async (group_id: string, task_id: string) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.delete(
      `http://localhost:4000/api/task/delete/${group_id}/${task_id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export { getTaskData, addNewTask, moveToState, deleteTask };
