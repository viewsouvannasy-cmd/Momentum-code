import { create } from "zustand";
import {
  getUserInfo,
  uploadProfile,
  changeUserName,
  changePassword,
  handleLogout,
} from "./user-helper.ts";

// type
import type { UserType, ResponseStatus } from "../../types/user-type.ts";

interface UseUserProp {
  userData: [UserType] | [];

  isLoadingUser: boolean;
  isLoadingPost: boolean;
  error: unknown;

  getUserInfo: () => void;
  uploadProfile: (param: File) => void;
  changeUserName: (param: string) => Promise<ResponseStatus | undefined>;
  changePassword: (
    old_password: string,
    new_password: string,
  ) => Promise<ResponseStatus | undefined>;
  handleLogout: () => void;
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

  changeUserName: async (new_name) => {
    try {
      set({ isLoadingPost: true });
      const response = await changeUserName(new_name);
      if (!response.success) {
        set({ isLoadingPost: false });
        return response;
      }

      set({ isLoadingPost: false });
      return response;
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  changePassword: async (old_password, new_password) => {
    try {
      set({ isLoadingPost: true });
      const response = await changePassword(old_password, new_password);
      if (response.success) {
        set({ isLoadingPost: false });
        return response;
      }

      set({ isLoadingPost: false });
      return response;
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },

  handleLogout: async () => {
    try {
      set({ isLoadingPost: true });
      await handleLogout();
      set({ isLoadingPost: false });
    } catch (error) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useUser;
