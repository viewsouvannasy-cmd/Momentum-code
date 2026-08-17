import axios from "axios";
import { fetchRefreshToken } from "../auth.ts";
import { checkAccessToken } from "../../store/token/accessToken.ts";

const getUserInfo = async () => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios("http://localhost:4000/api/user/info", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return getUserInfo();
      }
      console.log(error);
      window.open("/error");
    }
  }
};

export { getUserInfo };
