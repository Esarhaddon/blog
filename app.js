import { html, signal, task } from "aspen";

export * as InteractiveExample from "./components/interactive-example.js";

export function App() {
  return html`
    <InteractiveExample
      snippets=${[
        {
          language: "css",
          show: true,
          value: `
            .full-size-square {
              transform: translateY(calc(50vh - 50%));
              margin-inline: auto;
              max-height: 100vh;
              max-width: 100vw;
              aspect-ratio: 1;
            }

            .gradient {
              background: radial-gradient(
                closest-side, 
                transparent, 
                transparent 25%, 
                green 50%, 
                transparent
              );
              mask-size: 20px;
              mask-image: url("data:image/svg+xml,<svg width='125' height='125' viewBox='0 0 125 125' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='72.3569' y='40.5359' width='6' height='47.7738' rx='3' transform='rotate(31.3275 72.3569 40.5359)' fill='black'/></svg>");
            }
          `,
        },
        {
          language: "html",
          show: true,
          value: `
            <div class="full-size-square gradient"></div>
          `,
        },
        {
          language: "js",
          show: true,
          value: `
            console.log("hello world");
          `,
        },
      ]}
    />
  `;
}
