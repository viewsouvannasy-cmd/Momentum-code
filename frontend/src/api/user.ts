import axios from "axios";
import { checkAccessToken } from "../store/token/accessToken.ts";

const getUserInfo = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios("http://localhost:4000/api/user/info", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export { getUserInfo };
