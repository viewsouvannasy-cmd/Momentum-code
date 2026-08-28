import { saveAccessToken, claearAccessToken } from "../store/token/accessToken";
import { getHostServer } from "../utils/getENV";
import axios from "axios";

const fetchRefreshToken = async (): Promise<string> => {
  try {
    const serverHost = getHostServer();
    const response = await axios.get(`${serverHost}/api/refresh-token`, {
      withCredentials: true,
    });
    saveAccessToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      claearAccessToken();
      console.log(error);
      window.location.href = "/";
      throw error;
    }
    throw error;
  }
};

const fetchForgotPassword = async (inputEmail: string) => {
  try {
    const serverHost = getHostServer();
    const response = await axios.post(
      `${serverHost}/api/auth/forgot-password`,
      {
        user_email: inputEmail,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
};

const fetchResetPassword = async (new_password: string, token: string) => {
  try {
    const serverHost = getHostServer();
    const response = await axios.post(
      `${serverHost}/api/auth/reset-password/${token}`,
      { new_password: new_password },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
};

export { fetchRefreshToken, fetchForgotPassword, fetchResetPassword };
