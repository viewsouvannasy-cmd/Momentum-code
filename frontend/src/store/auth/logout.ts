import axios from "axios";

export const handleLogout = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/auth/logout", {
      withCredentials: true,
    });
    console.log(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }
};
