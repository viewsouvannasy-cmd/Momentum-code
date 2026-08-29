import axios from "axios";
import { getHostServer } from "../../utils/getENV";

export const checkUser = async () => {
  try {
    const serverHost = getHostServer();

    const response = await axios.get(`${serverHost}/api/auth/check-user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
};
