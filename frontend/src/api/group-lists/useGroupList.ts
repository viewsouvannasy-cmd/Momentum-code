import { getGroupList, createGroupList } from "./groupList-helper.ts";
import { create } from "zustand";

interface UseGroupList {
  data: GroupList[] | [];
  isLoading: boolean;
  isLoadingPost: boolean;
  error: unknown;
  getGroup: () => void;
  createGroup: (name: string, color: string) => void;
}

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

const useGropList = create<UseGroupList>((set) => ({
  data: [],
  isLoading: true,
  isLoadingPost: false,
  error: null,

  // get group list
  getGroup: async () => {
    try {
      const response = await getGroupList();
      set({ data: response.results, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false, error: error });
    }
  },

  // create group list
  createGroup: async (group_name, group_color) => {
    try {
      set({ isLoadingPost: true });
      await createGroupList(group_name, group_color);
      const response = await getGroupList();
      set({ data: response.results, isLoadingPost: false });
    } catch (error: unknown) {
      set({ isLoading: false, error: error });
    }
  },
}));

export default useGropList;
