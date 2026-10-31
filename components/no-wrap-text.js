import { html } from "aspen";

export function NoWrapTextIcon(
  { color = "gray", size = 20 } /*: { color?: string; size: number } */,
) {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height=${size + "px"}
      width=${size + "px"}
      fill=${color}
    >
      <path
        d="M14.7 20.7L11 17L14.7 13.3L16.1 14.75L14.85 16H17.25C17.7367 16 18.15 15.83 18.49 15.49C18.83 15.15 19 14.7367 19 14.25C19 13.7633 18.83 13.35 18.49 13.01C18.15 12.67 17.7367 12.5 17.25 12.5H4V10.5H17.25C18.2967 10.5 19.1833 10.8633 19.91 11.59C20.6367 12.3167 21 13.2033 21 14.25C21 15.2967 20.6367 16.1833 19.91 16.91C19.1833 17.6367 18.2967 18 17.25 18H14.85L16.1 19.25L14.7 20.7ZM4 18V16H9V18H4ZM4 7V5H20V7H4Z"
      />
      <path d="M22.0855 2.64645L3.64645 21.0855" stroke=${color} />
    </svg>
  `;
}
