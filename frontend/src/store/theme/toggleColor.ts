import { addAndRemoveTransition } from "../../utils/addAndRemoveTransition.ts";

// these function this helper useToggleTheme

// get color color from localstorage
function getTheme(): string {
  return localStorage.getItem("datatheme") || "black";
}

// save color to localStorage
function saveTheme(theme: string) {
  localStorage.setItem("datatheme", theme);
}

// set html root and save color
function appltTheme(theme: string) {
  saveTheme(theme);
  if (getTheme() === "white") {
    document.documentElement.setAttribute("data-theme", "white");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

// toggle
function toggleThemeColor() {
  addAndRemoveTransition();
  const currentTheme = getTheme();
  const next = currentTheme === "black" ? "white" : "black";
  appltTheme(next);
  return next;
}

// set current theme when user open web
function showTheme() {
  if (getTheme() === "white") {
    document.documentElement.setAttribute("data-theme", "white");
  }
}

export { toggleThemeColor, getTheme, showTheme };
