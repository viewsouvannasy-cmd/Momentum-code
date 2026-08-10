import {
  getGroupList,
  createGroupList,
  renameGroupList,
  changeColorGroupList,
  deleteGroupList,
} from "./groupList-helper.ts";
import { create } from "zustand";

interface UseGroupList {
  groupListData: GroupList[] | [];
  isLoadingGroup: boolean;
  isLoadingPost: boolean;
  error: unknown;
  getGroup: () => void;
  createGroup: (name: string, color: string) => void;
  renameGroup: (newName: string, id: string) => void;
  changeColorGroup: (newColor: string, id: string) => void;
  deleteGroup: (id: string) => void;
}

interface GroupList {
  group_id: number;
  group_name: string;
  group_color: string;
}

const useGropList = create<UseGroupList>((set) => ({
  groupListData: [],
  isLoadingGroup: true,
  isLoadingPost: false,
  error: null,

  // get group list
  getGroup: async () => {
    try {
      const response = await getGroupList();
      set({ groupListData: response.results, isLoadingGroup: false });
    } catch (error: unknown) {
      set({ isLoadingGroup: false, error: error });
    }
  },

  // create group list
  createGroup: async (group_name, group_color) => {
    try {
      set({ isLoadingPost: true });
      await createGroupList(group_name, group_color);
      const response = await getGroupList();
      set({ groupListData: response.results, isLoadingPost: false });
    } catch (error: unknown) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // rename group list
  renameGroup: async (group_new_name, group_id) => {
    try {
      set({ isLoadingPost: true });
      await renameGroupList(group_new_name, group_id);
      const response = await getGroupList();
      set({ groupListData: response.results, isLoadingPost: false });
    } catch (error: unknown) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // change color group list
  changeColorGroup: async (group_new_color, group_id) => {
    try {
      set({ isLoadingPost: true });
      await changeColorGroupList(group_new_color, group_id);
      const response = await getGroupList();
      set({ groupListData: response.results, isLoadingPost: false });
    } catch (error: unknown) {
      set({ isLoadingPost: false, error: error });
    }
  },

  // delete group list
  deleteGroup: async (group_id) => {
    try {
      set({ isLoadingPost: true });
      await deleteGroupList(group_id);
      const response = await getGroupList();
      set({ groupListData: response.results, isLoadingPost: false });
    } catch (error: unknown) {
      set({ isLoadingPost: false, error: error });
    }
  },
}));

export default useGropList;
