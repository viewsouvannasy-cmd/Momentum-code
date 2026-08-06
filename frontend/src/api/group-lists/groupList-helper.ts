import axios from "axios";
import { checkAccessToken } from "../../store/token/accessToken.ts";

const getGroupList = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.get(
      "http://localhost:4000/api/todo/get-group-list",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
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
      "http://localhost:4000/api/todo/create-group-list",
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

export { getGroupList, createGroupList };
