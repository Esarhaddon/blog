import { signal } from "aspen";

// https://tailwindcss.com/docs/responsive-design
const mobileQuery = matchMedia("(width <= 40rem)");

export const $isMobile = signal(mobileQuery.matches);

mobileQuery.addEventListener("change", () => {
  $isMobile.val = mobileQuery.matches;
});
