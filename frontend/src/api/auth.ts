import { saveAccessToken, claearAccessToken } from "../store/token/accessToken";
import axios from "axios";

const fetchRefreshToken = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/refresh-token",
      { withCredentials: true },
    );
    saveAccessToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      claearAccessToken();
      console.log(error);
      window.location.href = "/";
      throw error;
    }
  }
};

export { fetchRefreshToken };
