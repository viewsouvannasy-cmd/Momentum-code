export function getLoadingStateEl(state: "todo" | "doing" | "done") {
  if (state === "todo") {
    return 2;
  }
  if (state === "doing") {
    return 3;
  }
  if (state === "done") {
    return 1;
  }
}
