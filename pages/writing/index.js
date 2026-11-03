import { html } from "aspen";
import { $isMobile } from "../../design-tokens.js";

export * as Navigation from "../../components/navigation.js";

const POSTS = [
  {
    href: "/writing/angular-homepage-graphics",
    title: "Understanding the background graphics on the Angular docs homepage",
    date: "October 29, 2026",
  },
  {
    href: "/",
    title: "Hello world",
    date: "October 29, 2026",
  },
];

export function Page() {
  return html`
    <Navigation />
    <div
      style="
        max-width: 800px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      "
    >
      ${POSTS.map(
        (post) => html(post.href)`
          <Post href=${post.href} title=${post.title} date=${post.date} />
        `,
      )}
    </div>
  `;
}

export function Post({ title, href, date }) {
  return html`
    <a
      href=${href}
      style=${`
        color: black;
        text-decoration: none;
        justify-content: space-between;
        align-items: baseline;
      `}
    >
      <h2
        style="
          margin-bottom: 12px;
          font-size: 1.8rem;
        "
      >
        ${title}
      </h2>
      <span
        style="
          font-family: Inter;
          font-size: .865rem;
          color: gray;
          flex-shrink: 0;
        "
      >
        ${date}
      </span>
    </a>
  `;
}
