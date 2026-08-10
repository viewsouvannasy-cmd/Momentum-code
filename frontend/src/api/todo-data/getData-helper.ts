import { checkAccessToken } from "../../store/token/accessToken";
import axios from "axios";

const getData = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.get("http://localhost:4000/api/todo/get", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export { getData };
