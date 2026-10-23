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
            :root {
              --graphic-width: 100%;
            }
          
            .resizable {
              width: var(--graphic-width);
              aspect-ratio: 1;
            }
          `,
        },
        {
          language: "css",
          show: false,
          value: `
            .container {
              transform: translateY(calc(50vh - 50% - 16px));
              margin-inline: auto;
              max-width: min(100vw, 100vh - 32px);
              aspect-ratio: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .secret-sauce {
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
            
            input {
              position: fixed;
              bottom: 0px;
              left: 0px;
              right: 0px;
            }
          `,
        },
        {
          language: "html",
          show: true,
          value: `
            <div class="container">
              <div class="resizable secret-sauce"></div>
            </div>
            <input type="range" value="100" min="0" max="100" />
          `,
        },
        {
          language: "js",
          show: true,
          value: `
            const [input] = document.getElementsByTagName("input");
            const [container] = document.getElementsByClassName("container");      
      
            input.addEventListener("input", (e) => {
              container.style.setProperty("--graphic-width", e.target.value + "%");
            })
          `,
        },
      ]}
    />
  `;
}
