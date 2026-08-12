import axios from "axios";

export const checkUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/auth/check-user",
      { withCredentials: true },
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
};
