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
