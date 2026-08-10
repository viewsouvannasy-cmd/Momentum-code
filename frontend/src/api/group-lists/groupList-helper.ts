import axios from "axios";
import { checkAccessToken } from "../../store/token/accessToken.ts";

const getGroupList = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.get("http://localhost:4000/api/group/get", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const createGroupList = async (group_name: string, group_color: string) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.post(
      "http://localhost:4000/api/group/create",
      {
        group_name: group_name,
        group_color: group_color,
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

const renameGroupList = async (group_new_name: string, group_id: string) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.put(
      `http://localhost:4000/api/group/rename/${group_id}`,
      {
        group_new_name: group_new_name,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const changeColorGroupList = async (
  group_new_color: string,
  group_id: string,
) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.put(
      `http://localhost:4000/api/group/change-color/${group_id}`,
      {
        group_new_color: group_new_color,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

const deleteGroupList = async (group_id: string) => {
  try {
    const accessToken = await checkAccessToken();
    await axios.delete(`http://localhost:4000/api/group/delete/${group_id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
export {
  getGroupList,
  createGroupList,
  renameGroupList,
  changeColorGroupList,
  deleteGroupList,
};
