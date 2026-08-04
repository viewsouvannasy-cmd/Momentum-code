// add and remove transition
export function addAndRemoveTransition() {
  const listEl = document.querySelectorAll<HTMLElement>("*");

  listEl.forEach((el) => {
    el.style.transition = "all 0.3s ease";
  });

  setTimeout(() => {
    listEl.forEach((el) => {
      el.style.transition = "";
    });
  }, 500);
}
