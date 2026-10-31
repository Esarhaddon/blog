import { signal, html } from "aspen";

export * as Navigation from "../components/navigation.js";

export function Page() {
  return html`
    <Navigation />
    <h1>What's up with Jack?</h1>
  `;
}
