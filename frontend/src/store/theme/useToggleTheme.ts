import { create } from "zustand";
import { toggleThemeColor, getTheme } from "./toggleColor.ts";

type ThemeState = {
  themeColor: string;
  toggle: () => void;
};

// this context api is use to toggle theme color between dark and light
const useToggleTheme = create<ThemeState>((set) => ({
  themeColor: getTheme(),
  toggle: () =>
    set(() => ({
      themeColor: toggleThemeColor(),
    })),
}));

export default useToggleTheme;
