import { create } from "zustand";
import { getUserInfo } from "./user.ts";

interface UserType {
  user_name: string;
  user_email: string;
  created_at: string;
}

interface UseUserProp {
  userData: [UserType] | [];
  isLoadingUser: boolean;
  error: unknown;

  getUserInfo: () => void;
}

const useUser = create<UseUserProp>((set) => ({
  userData: [],
  isLoadingUser: true,
  error: null,

  getUserInfo: async () => {
    try {
      const response = await getUserInfo();
      set({ userData: response.results, isLoadingUser: false });
    } catch (error) {
      set({ isLoadingUser: false, error: error });
    }
  },
}));

export default useUser;
