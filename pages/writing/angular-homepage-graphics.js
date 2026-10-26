import { html } from "aspen";

export * as InteractiveExample from "../../components/interactive-example.js";
export * as Navigation from "../../components/navigation.js";

import { trimIndent } from "../../components/interactive-example.js";
import { $isMobile } from "../../design-tokens.js";

const maskImage = `data:image/svg+xml,<svg width='125' height='125' viewBox='0 0 125 125' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='72.3569' y='40.5359' width='6' height='47.7738' rx='3' transform='rotate(31.3275 72.3569 40.5359)' fill='black'/></svg>`;

export function Page() {
  return html`
    <Navigation />
    <h1>
      Understanding the cool background graphics on the Angular docs homepage
    </h1>
    <p>
      I’ve never actually built anything with Angular, but the other day I was
      checking out the <a href="https://angular.dev/">homepage</a> for the
      Angular docs and noticed some cool graphics that show up behind the page
      content.
    </p>
    <p>
      <strong>
        TL;DR: the graphics are built with CSS
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient"
        >
          conic
        </a>
        and
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient"
        >
          radial gradients
        </a>
        and a repeating
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image"
        >
          mask image
        </a>
        set to an SVG
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data"
          >data URL
        </a>
        .
      </strong>
    </p>
    <p>They look something like this:</p>
    <InteractiveExample
      snippets=${[
        {
          language: "css",
          show: true,
          value: `
            :root {
              --graphic-width: 100%;
            }
            
            /*
            NOTE: keep reading for the CSS
            that makes this work
            */
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
              mask-image: url("${maskImage}");
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
          show: false,
          value: `
            <div class="container">
              <div class="resizable secret-sauce"></div>
            </div>
            <input type="range" value="100" min="0" max="100" />
          `,
        },
        {
          language: "js",
          show: false,
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
    <p>
      Notice that when you resize the graphic, either with the range input or by
      setting the <code>--graphic-width</code> CSS variable directly, the number
      of visible tick marks changes, causing the pattern as a whole to grow or
      shrink, but each individual tick mark stays the same size. That’s not
      something you can do with a regular image.
    </p>
  `;
}
