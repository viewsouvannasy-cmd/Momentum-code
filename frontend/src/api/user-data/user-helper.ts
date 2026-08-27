import axios from "axios";
import { fetchRefreshToken } from "../auth.ts";
import { checkAccessToken } from "../../store/token/accessToken.ts";

// type
import type { UserType, ResponseStatus } from "../../types/user-type.ts";

const getUserInfo = async (): Promise<{ results: [UserType] }> => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.get<{ results: [UserType] }>(
      "http://localhost:4000/api/user/info",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

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
      throw error;
    }
    throw error;
  }
};

const uploadProfile = async (filePhoto: File) => {
  try {
    const accessToken = await checkAccessToken();

    const formData = new FormData();
    formData.append("filePhoto", filePhoto);

    await axios.post(
      "http://localhost:4000/api/user/upload-profile",
      formData,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  } catch (error) {
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
      throw error;
    }
    throw error;
  }
};

const changeUserName = async (new_name: string): Promise<ResponseStatus> => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.post<ResponseStatus>(
      "http://localhost:4000/api/user/change-name",
      { new_name: new_name },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 && !error.response.data.success) {
        return error.response.data;
      }

      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return changeUserName(new_name);
      }
      console.log(error);
      window.open("/error");
      throw error;
    }
    throw error;
  }
};

const changePassword = async (
  old_password: string,
  new_password: string,
): Promise<ResponseStatus> => {
  try {
    const accessToken = await checkAccessToken();
    const response = await axios.post<ResponseStatus>(
      "http://localhost:4000/api/user/change-password",
      { old_password: old_password, new_password: new_password },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 && !error.response.data.success) {
        return error.response?.data;
      }

      if (
        error.response?.status === 401 &&
        !error.response.data.success_verify_token
      ) {
        await fetchRefreshToken();
        return changePassword(old_password, new_password);
      }
      console.log(error);
      window.open("/error");
      throw error;
    }

    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await axios.get("http://localhost:4000/api/auth/logout", {
      withCredentials: true,
    });
  } catch (error: unknown) {
    console.log(error);
    window.open("/error");
    throw error;
  }
};

export { getUserInfo, uploadProfile, changeUserName, changePassword };
