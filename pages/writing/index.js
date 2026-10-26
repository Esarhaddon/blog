import { html } from "aspen";

export * as Navigation from "../../components/navigation.js";

export function Page() {
  return html`
    <Navigation />
    <a href="/writing/angular-homepage-graphics">
      Understanding the cool background graphics on the Angular docs homepage
    </a>
  `;
}
