import { create } from "zustand";
import { getUserInfo, uploadProfile } from "./user-helper.ts";

interface UserType {
  user_name: string;
  user_email: string;
  created_at: string;
}

interface UseUserProp {
  userData: [UserType] | [];
  isLoadingUser: boolean;
  isLoadingPost: boolean;
  error: unknown;

  getUserInfo: () => void;
  uploadProfile: (param: File) => void;
}

const useUser = create<UseUserProp>((set) => ({
  userData: [],
  isLoadingUser: true,
  isLoadingPost: false,
  error: null,

  getUserInfo: async () => {
    try {
      const response = await getUserInfo();
      set({ userData: response.results, isLoadingUser: false });
    } catch (error) {
      set({ isLoadingUser: false, error: error });
    }
  },

  uploadProfile: async (filePhoto) => {
    try {
      set({ isLoadingPost: true });
      await uploadProfile(filePhoto);
      set({ isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useUser;
