// @flow

import { html } from "aspen";

import { $isMobile } from "../design-tokens.js";

const NAV_ITEMS = [
  { href: "/", text: "About" },
  { href: "/writing", text: "Writing" },
  { href: "/aspen", text: "Aspen" },
];

export function Navigation() {
  return html`
    <div
      style=${`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 28px;
        margin-top: ${$isMobile.val ? "12px" : "1.5rem"};
      `}
    >
      ${NAV_ITEMS.map(
        (item) => html(item.href)`
          <Link href=${item.href}>
            ${item.text}
          </Link>
        `,
      )}
    </div>
  `;
}

export function Link(
  { children, href } /*: { children: string, href: string } */,
) {
  const isActive =
    href === "/"
      ? location.pathname === href
      : location.pathname.startsWith(href);

  return html`
    <a
      style=${`
        text-decoration: none;
        font-family: Inter;
        color: ${isActive ? "#484848" : "#36c"};
      `}
      href=${href}
    >
      ${children}
    </a>
  `;
}
